<?php
$src=isset($_GET['src'])?$_GET['src']:'';
$size=getimagesize($src);
echo json_encode(array('size'=>$size));
?>


