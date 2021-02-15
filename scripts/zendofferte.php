<?php
$naam=trim($_POST['naam']);
$email=trim($_POST['email']);
$opslaan='1';
if ($naam=='Vul hier je naam in' OR $naam=='')
{
	$opslaan='0';
	$data['success']=false;
	$data['message']="Gelieve een naam in te vullen!";
}
if (($email=='Vul hier je e-mailadres in' OR $email=='') AND $opslaan=='1')
{
	$opslaan='0';
	$data['success']=false;
	$data['message']="Gelieve een emailadres in te vullen!";
}
if (preg_match("/^[A-Za-z0-9._\-]+\@[A-Za-z0-9._\-]+\.[A-Za-z]{2,4}$/", "$email") AND $opslaan=='1')
{
} else if ($opslaan=='1')
{
	$opslaan='0';
	$data['success']=false;
    $data['message']="Gelieve een correct emailadres in te vullen!";
}

//KLEURCODES/////////////////////////////////////////////////////////////////////
$var1="Nieuwsbrief Kleinvossenpark"; //Titel
$var2="#ffffff";  //kleur achtergrond
$var3="http://www.hvinvest.be/img/logo-klein.png"; //locatie logo
$var4="#b4b4b4"; // kleur van titel contactaanvraag
$var5="#666666"; //kleur algemene tekst
$var6="Kleinvossenpark"; //tekst achter op de contactpagina van ...
$var7="#F1F1F1"; //backgroundcolor tabel
$var8="#dfdfdf"; //kleur lijn tussen cellen
$var9="#dfdfdf"; //kleur links van tabel
$var10="#b4b4b4"; //kleur tekst titels tabel
$var11="#b4b4b4"; // kleur van tekst ingevuld in de tabel
$var12="Het Kleinvossenpark Team"; //naam met vriendelijke groeten
$var13="#b4b4b4";  //kleur naam vriendelijke groeten
$mailemail="tom@creaservices.be";
//////////////////////////////////////////////////////////////////////////////////
    
if($opslaan=='1')
{
	$data['success']=true;
    
    $mailonderwerp="Offerteaanvraag van ".$naam;
	$mailbericht="<html>
						<head>
  							<title>".$var1."</title>
							
						</head>
						<body leftmargin='20px' style='background-color: ".$var2.";'>
						<table width='550' border='0' cellspacing='0' cellpadding='0'>
						<tr><td >
						<img src='".$var3."' />
						</td></tr>
						</table>
						<br/>
						<table width='550' border='0' cellspacing='0' cellpadding='8'>
						<tr><td>
						<font color='".$var4."' face='Geneva, Arial, Helvetica, sans-serif' size='5'>Contactaanvraag van ".$naam.".</font>
						</td></tr>
						<tr><td><font color='".$var5."' face='Geneva, Arial, Helvetica, sans-serif' size='2'>Volgend bericht werd er achtergelaten op de contactpagina van ".$var6.".</font></td>
						<tr>
						</table>
						<table width='550' border='0' cellspacing='0' cellpadding='8'>
						<tr align='left'>
							<td nowrap='nowrap' bgcolor='".$var7."' width='180' style='border-bottom: 1px solid ".$var8."; border-top: 1px solid transparent; border-left-color: ".$var9."; border-left-style: solid; border-left-width: 4px;'><strong><font color='".$var10."' face='Geneva, Arial, Helvetica, sans-serif' size='2'>Naam:</font></strong></td>
							<td nowrap='nowrap' bgcolor='".$var7."' style='border-bottom: 1px solid ".$var8."; border-top: 1px solid transparent;'><font color='".$var11."' face='Geneva, Arial, Helvetica, sans-serif' size='2'>".$naam."</font></td>
						  </tr>
						 
						  
						  			  
						  <tr align='left'>
							<td nowrap='nowrap' bgcolor='".$var7."' width='180' style='border-bottom: 1px solid ".$var8."; border-top: 1px solid transparent; border-left-color: ".$var9."; border-left-style: solid; border-left-width: 4px;'><strong><font color='".$var10."' face='Geneva, Arial, Helvetica, sans-serif' size='2'>E-mailadres:</font></strong></td>
							<td nowrap='nowrap' bgcolor='".$var7."' style='border-bottom: 1px solid ".$var8."; border-top: 1px solid transparent;'><font color='".$var11."' face='Geneva, Arial, Helvetica, sans-serif' size='2'><a style='color:#57395a;' href=mailto:".$email.">".$email."</a></font></td>
						  </tr>
						  
						  </table>
						  <table width='550' border='0' cellspacing='0' cellpadding='8'>
						  <tr><td>
						<font color='".$var5."' face='Geneva, Arial, Helvetica, sans-serif' size='2'><br/>Wij danken u voor de aanvraag en nemen zo spoedig mogelijk contact met u op. <br/><br/> Met vriendelijke groeten </font><br/> <strong><font color='".$var13."' face='Geneva, Arial, Helvetica, sans-serif' size='3'>".$var12."</strong></font>
						<td><tr>
						</table>
						</body>
						</html>";                 
	$headers  = "MIME-Version: 1.0" . "\r\n";
	$headers .= "Content-type: text/html; charset=utf-8" . "\r\n";
	$headers .= "From: ".$email." \r\n";
	$headers .= "Cc: ".$email." \r\n";
	$headers .= "Bcc: tom@creaservices.be" . "\r\n";
	mail($mailemail, $mailonderwerp, $mailbericht, $headers);
    
    $data['message']="Uw nieuwsbriefaanvraag is verstuurd!";
}
echo json_encode($data);
?>