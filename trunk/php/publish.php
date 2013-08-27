<?PHP

$expectParams = array("cellName", "province", "city", "distict", "street",
    "lng", "lat", "rentType", "floor", "rooms", "halls", "toilets", "area", 
    "price", "payment", "houseType", "decoration", "direction","with", 
    "owner", "phone", "email", "verifyCode", "level"
);
$response = array();

foreach($expectParams as $param){
    if(!isset($_POST[$param])){
        $response['responsecode'] = -1;
        $response['message'] = "Hadn't send parameter $param";
        echo json_encode($response);
        responseurn;
    }
    $$param = $_POST[$param];
}
$imgSrc = "test";

$con = mysql_connect("localhost", "root", "111111")
    or die("Could not connect:" . mysql_error());
mysql_select_db("happy_rent", $con);
mysql_query("set names utf8");
// 这里用事务比较好

$insertBriefInfo = "INSERT INTO brief_info(lng, lat, imgSrc, area, price, rooms, halls, level) ".
    "VALUES($lng, $lat, '$imgSrc', $area, $price, $rooms, $halls, $level)";
$resOfInsertBriefInfo = mysql_query($insertBriefInfo);
$id = mysql_insert_id();
$insertDetailInfo = "INSERT INTO detail_info(id, toilets, province, city, district, ".
    "rent_type, cell_name, devices, floor, payment, owner_name, owner_phone, owner_email) ".
    "VALUES($id, $toilets, '$province', '$city', '$district', $rentType, '$cellName', $devices, ".
    "$floor, $payment, '$owner', '$phone', '$email')";
$resOfInsertDetailInfo = mysql_query($insertDetailInfo);

if(mysql_error()){
    mysql_query("delet from brief_info where id = $id");
    $response["response"] = 2;
    $response["message"] = "Error occured when insert seconed record";
} else {
    $response["response"] = 0;
    $response["message"] = "OK";
}

/*
$result = mysql_query("SELECT * FROM detail_info where id = $id");
while($row = mysql_fetch_array($result)){
    echo $row['province'];
}
 */

mysql_close($con);
echo json_encode($response);
?>
