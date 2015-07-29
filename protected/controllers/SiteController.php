<?php

class SiteController extends Controller
{
	/**
	 * This is the default 'index' action that is invoked
	 * when an action is not explicitly requested by users.
	 */

	public function actionIndex()
	{
		$this->render('index');
	}

	public function actionGame($type)
	{
		if(!isset($_SESSION['weixin_info_id'])){
			Header('Location: /weixin/oauth?callback=/site/game/type/'.$type);
			Yii::app()->end();
		}
		$this->render('game');
	}

	public function actionResult()
	{
		$this->render('result');
	}

	public function actionShare($id)
	{
		if(!isset($_SESSION['weixin_info_id'])){
			Header('Location: /weixin/oauth?callback=/site/share/id/'.$id);
			Yii::app()->end();
		}
		$db = Yii::app()->db;

		$sql = "SELECT id FROM `same_game_team` WHERE `uid` = '". intval($_SESSION['weixin_info_id']).
			 "' or `fid` = '". intval($_SESSION['weixin_info_id'])."'";
		$rs = $db->createCommand($sql)->select()->queryScalar();
		if ($rs) {
			//print json_encode(array('code' => 3, 'msg' => '已经有战队了'));
			Header('Location: /');
			Yii::app()->end();
		}

		$sql = "SELECT * FROM `same_game_team` WHERE `id` = '". $id. "'";
		$rs = $db->createCommand($sql)->select()->queryRow();
		if ($rs['fid']) {
			//print json_encode(array('code' => 4, 'msg' => '战队已满'));
			Header('Location: /');
			Yii::app()->end();
		}

		$sql = "UPDATE `same_game_team` SET `fid` = '". intval($_SESSION['weixin_info_id']) . "' WHERE `id` = '".
		     $id ."'";
		$db->createCommand($sql)->execute();
		//print json_encode(array('code' => 1, 'msg' => '加入成功'));
		Header('Location: /site/game/type/2');
		Yii::app()->end();
	}

	public function actionSpring()
	{
		$this->render('spring');
	}

	public function actionProduct(){
		$this->render('product');
	}

	public function actionFounder(){
		$this->render('founder');
	}

	public function actionHistory(){
		$this->render('history');
	}

	public function actionStore($id)
	{
		$sql = "select * from same_store where id = ".intval($id);
		$store = Yii::app()->db->createCommand($sql)->queryRow();
		$this->render('store', array('store' => $store));
	}

	/**
	 * This is the action to handle external exceptions.
	 */
	public function actionError()
	{
	    if($error=Yii::app()->errorHandler->error)
	    {
	    	if(Yii::app()->request->isAjaxRequest)
	    		echo $error['message'];
	    	else
	        	$this->render('error', $error);
	    }
	}
}