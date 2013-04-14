<?PHP
$lat = 11.345; // $_REQUEST["lat"];
$lng = 22.345; //$_REQUEST["lng"];
$imgSrc = "test"; //$_REQUEST["imgSrc"];
$area = 50; //$_REQUEST["area"];
$price = 5000; //$_REQUEST["price"];
$rooms = 2; //$_REQUEST["rooms"];
$halls = 3; //$_REQUSET["halls"];
$level = 1;

$con = mysql_connect("localhost", "root", "111111")
    or die("Could not connect:" . mysql_error());
mysql_select_db("happy_rent", $con);
$sql = "INSERT INTO brief_info(lng, lat, imgSrc, area, price, rooms, halls, level) VALUES($lng, $lat, '$imgSrc', $area, $price, $rooms, $halls, $level)";
mysql_query($sql);

mysql_close($con);
?>
