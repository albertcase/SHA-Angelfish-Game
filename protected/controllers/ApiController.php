<?php

class ApiController extends Controller
{
	/**
	 * This is the default 'index' action that is invoked
	 * when an action is not explicitly requested by users.
	 */
	public $layout='//layouts/managementnone';
	public function actionIsLogin()
	{
		if (!isset($_SESSION['weixin_info_id'])) {
			print json_encode(array('code' => 0, 'msg' => '未登录'));
			Yii::app()->end();
		}
		$sql = "SELECT * FROM `same_weixin_info` WHERE `id` = '". intval($_SESSION['weixin_info_id'])."'";
		$userInfo = Yii::app()->db->createCommand($sql)->select()->queryRow();

		$sql = "SELECT id FROM `same_game_team` WHERE `uid` = '". intval($_SESSION['weixin_info_id']).
			 "' or `fid` = '". intval($_SESSION['weixin_info_id'])."'";
		$rs = Yii::app()->db->createCommand($sql)->select()->queryScalar();
		print json_encode(array('code' => 1, 'msg' => $userInfo, 'team' => $rs));
		Yii::app()->end();
	}

	public function actionCreateTeam()
	{
		if (!isset($_SESSION['weixin_info_id'])) {
			print json_encode(array('code' => 0, 'msg' => '未登录'));
			Yii::app()->end();
		}

		$tag = false;
		$teamname = isset($_POST['teamname']) ? $_POST['teamname'] : $tag = true;
		if ($tag) {
			print json_encode(array('code' => 2, 'msg' => '参数错误'));
			Yii::app()->end();
		}
		$db = Yii::app()->db;

		$sql = "SELECT id FROM `same_game_team` WHERE `uid` = '". intval($_SESSION['weixin_info_id']).
			 "' or `fid` = '". intval($_SESSION['weixin_info_id'])."'";
		$rs = $db->createCommand($sql)->select()->queryScalar();
		if ($rs) {
			print json_encode(array('code' => 3, 'msg' => '已经有战队了'));
			Yii::app()->end();
		}

		$sql = "SELECT id FROM `same_game_team` WHERE `teamname` = '". $teamname. "'";
		$rs = $db->createCommand($sql)->select()->queryScalar();
		if ($rs) {
			print json_encode(array('code' => 4, 'msg' => '战队名已存在'));
			Yii::app()->end();
		}

		$sql = "INSERT INTO `same_game_team` SET `teamname` = '". $teamname. "', `uid` = '".
		     intval($_SESSION['weixin_info_id']) ."'";
		$db->createCommand($sql)->execute();
		$id = $db->lastInsertId;
		print json_encode(array('code' => 1, 'msg' => $id));
		Yii::app()->end();
	}

	public function actionSubScore($type)
	{
		if (!isset($_SESSION['weixin_info_id'])) {
			print json_encode(array('code' => 0, 'msg' => '未登录'));
			Yii::app()->end();
		}

		$tag = false;
		$score = isset($_POST['score']) ? intval($_POST['score']) : $tag = true;
		if ($tag) {
			print json_encode(array('code' => 2, 'msg' => '参数错误'));
			Yii::app()->end();
		}
		$db = Yii::app()->db;
		switch ($type) {
			case '1':
				$sql = "SELECT score FROM `same_weixin_info` WHERE id = '". intval($_SESSION['weixin_info_id']) ."'";
				$uscore = $db->createCommand($sql)->select()->queryScalar();
				if ($score > $uscore) {
					$sql = "UPDATE `same_weixin_info` SET score = :score where id = :id";
					$command = $db->createCommand($sql);
					$command->bindParam(':id', $_SESSION['weixin_info_id'], PDO::PARAM_INT);
					$command->bindParam(':score', $score, PDO::PARAM_STR);
					$command->execute();
				}
				break;

			case '2':
				$sql = "SELECT * FROM `same_game_team` WHERE uid = '". intval($_SESSION['weixin_info_id']) ."' or fid = '". intval($_SESSION['weixin_info_id']) ."'";
				$team = $db->createCommand($sql)->select()->queryRow();
				if (!$team) {
					print json_encode(array('code' => 3, 'msg' => '非法提交'));
					Yii::app()->end();
				}
				if ($team['uid'] == $_SESSION['weixin_info_id']) {
					$uscore = $team['uscore'];
				} else {
					$uscore = $team['fscore'];
				}

				if ($score > $uscore) {
					if ($team['uid'] == $_SESSION['weixin_info_id']) {
						$sql = "UPDATE `same_game_team` SET uscore = :score where id = :id";
					} else {
						$sql = "UPDATE `same_game_team` SET fscore = :score where id = :id";
					}
					$command = $db->createCommand($sql);
					$command->bindParam(':id', $team['id'], PDO::PARAM_INT);
					$command->bindParam(':score', $score, PDO::PARAM_STR);
					$command->execute();
				}
				break;

			default:
				print json_encode(array('code' => 3, 'msg' => '非法提交'));
				Yii::app()->end();
				break;
		}
		print json_encode(array('code' => 1, 'msg' => '提交成功'));
		Yii::app()->end();
	}

	public function actionScoreList($type)
	{
		$db = Yii::app()->db;
		switch ($type) {
			case '1':
				$sql = "SELECT * FROM `same_weixin_info` ORDER BY score DESC LIMIT 10";
				break;
			
			case '2':
				$sql = "SELECT uscore+fscore as score,teamname FROM `same_game_team` ORDER BY score DESC LIMIT 10";
				break;

			default:
				print json_encode(array('code' => 3, 'msg' => '非法提交'));
				Yii::app()->end();
				break;
		}
		$scoreList = $db->createCommand($sql)->select()->queryAll();
		print json_encode(array('code' => 1, 'msg' => $scoreList));
		Yii::app()->end();
	}
}