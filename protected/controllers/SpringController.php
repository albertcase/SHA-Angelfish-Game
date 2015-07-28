<?php

class SpringController extends Controller
{
	/**
	 * This is the default 'index' action that is invoked
	 * when an action is not explicitly requested by users.
	 */
	public $layout ="//layouts/spring";

	public function actionIndex($id)
	{
		$_SESSION['same_weixin_id']=intval($id);
		exit;
		$this->render('index');
	}

	public function actionSpring()
	{
		Yii::import('ext.emoji.emoji',true);
		$name = json_decode('{"name":"Demon\ud83d\ude04"}',true);
		$newname = emoji_unified_to_html($name['name']);
		$this->render('spring',array('name'=>$newname));
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