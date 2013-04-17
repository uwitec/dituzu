<?PHP
echo "here";


$cellName = $_POST["cellName"];
$province = $_POST["province"];
$city = $_POST["city"];
$district = $_POST["district"];
$street = $_POST["street"];
$lng = $_POST["lng"];
$lat = $_POST["lat"];
$rentType = $_POST["rentType"];
$floor = $_POST["floor"];
$rooms = $_POST["rooms"];
$halls = $_POST["halls"];
$toilets = $_POST["toilets"];
$area = $_POST["area"];
$price = $_POST["price"];
$payment = $_POST["payment"];
$houseType = $_POST["houseType"];
$decoration = $_POST["decoration"];
$direction = $_POST["direction"];
$devices = $_POST["with"];
$owner = $_POST["owner"];
$phone = $_POST["phone"];
$email = $_POST["email"];
$verifyCode = $_POST["verifyCode"];
$imgSrc = "test";
$level = 5;

$ret = array();

$con = mysql_connect("localhost", "root", "111111")
    or die("Could not connect:" . mysql_error());
mysql_select_db("happy_rent", $con);
mysql_query("set names utf8");
$sql1 = "INSERT INTO brief_info(lng, lat, imgSrc, area, price, rooms, halls, level) ".
	"VALUES($lng, $lat, '$imgSrc', $area, $price, $rooms, $halls, $level)";
mysql_query($sql1);
if(mysql_error()){
	$ret["ret"] = 1;
	$ret["message"] = "Error occured when insert first record";
	mysql_close($con);
	echo json_encode($ret);
	exit(0);
}
$id = mysql_insert_id();
$sql2 = "INSERT INTO detail_info(id, toilets, province, city, district, ".
	"rent_type, cell_name, devices, floor, payment, owner_name, owner_phone, owner_email) ".
	"VALUES($id, $toilets, '$province', '$city', '$district', $rentType, '$cellName', $devices, ".
	"$floor, $payment, '$owner', '$phone', '$email')";
mysql_query($sql2);
if(mysql_error()){
	mysql_query("delet from brief_info where id = $id");
	$ret["ret"] = 2;
	$ret["message"] = "Error occured when insert seconed record";
} else {
	$ret["ret"] = 0;
	$ret["message"] = "OK";
}

$result = mysql_query("SELECT * FROM detail_info where id = $id");

while($row = mysql_fetch_array($result)){
  echo $row['province'];
 }

mysql_close($con);
echo json_encode($ret);
?>
