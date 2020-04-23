<?php 
include("connect.php");
include("class.php");
$secret="zoSCpass";
//ฟังชั้นเช็ค - 
function CheckValue($text)
{
	if(preg_match("/-/",$text))
    {
	 	return true;
	}
	else
	{
		return false;
	}	
}
//ฟังชั่นอักขละพิเศษ
function cutTextSpecial($str)
{
	$word=array("<", ">", "%","=",",");
	for($i=0;$i<count($word);$i++)
	{
		$str=str_replace($word[$i], "", $str);
	}
	return $str;
}
//แยกค่า

function asc($v1,$v2,$v3,$v4,$v5,$isVlue)
{
    //เช็คว่ามี - กลางหรือไม่ถ้า มีก็เข้าสู่การคิด
    if(CheckValue($v2))
    {
        if(SplitValue($v2)[0]>SplitValue($v2)[1])
        {
            if($isVlue<=$v1)
            {
                return 1;
            }
            else if($isVlue<=SplitValue($v2)[0] && $isVlue>=SplitValue($v2)[1])
            {
                return 2;
            }
            else if($isVlue<=SplitValue($v3)[0] && $isVlue>=SplitValue($v3)[1])
            {
                return 3;
            }
            else if($isVlue<=SplitValue($v4)[0] && $isVlue>=SplitValue($v4)[1])
            {
                return 4;
            }
            else if($isVlue>=$v5)
            {
                return 5;
            }
            else
            {
                return "Invalid value";
            }
        }
        else
        {
            if($isVlue<=$v1)
            {
                return 1;
            }
            else if($isVlue>=SplitValue($v2)[0] && $isVlue<=SplitValue($v2)[1])
            {
                return 2;
            }
            else if($isVlue>=SplitValue($v3)[0] && $isVlue<=SplitValue($v3)[1])
            {
                return 3;
            }
            else if($isVlue>=SplitValue($v4)[0] && $isVlue<=SplitValue($v4)[1])
            {
                return 4;
            }
            else if($isVlue>=$v5)
            {
                return 5;
            }
            else
            {
                return "Invalid value";
            }
        }
        
    }
    else //การคำนวนเเบบจำนวนเต็ม < ไปหา >  
    {
        if($isVlue<$v1)
        {
            return 1;
        }
        else if($isVlue>=$v1 && $isVlue<$v2)
        {
            return (($isVlue-$v1)/($v2-$v1)+1);
        }
        else if($isVlue>=$v2 && $isVlue<$v3)
        {
            return (($isVlue-$v2)/($v3-$v2)+2);
        }
        else if($isVlue>=$v3 && $isVlue<$v4)
        {
            return (($isVlue-$v3)/($v4-$v3)+3);
        }
        else if($isVlue>=$v4 && $isVlue<$v5)
        {
            return (($isVlue-$v4)/($v5-$v4)+4);
        }
        else if($isVlue>=$v5)
        {
            return 5;
        }
        else
        {
            return "Invalid value";
        }
    }
}
function desc($v1,$v2,$v3,$v4,$v5,$isVlue)
{
    //เช็คว่ามี - กลางหรือไม่ถ้า มีก็เข้าสู่การคิด
    if(CheckValue($v2))
    {
        if(SplitValue($v2)[0]>SplitValue($v2)[1])
        {
            if($isVlue>=$v1)
            {
                return 1;
            }
            else if($isVlue<=SplitValue($v2)[0] && $isVlue>=SplitValue($v2)[1])
            {
                return 2;
            }
            else if($isVlue<=SplitValue($v3)[0] && $isVlue>=SplitValue($v3)[1])
            {
                return 3;
            }
            else if($isVlue<=SplitValue($v4)[0] && $isVlue>=SplitValue($v4)[1])  
            {
                return 4;
            }
            else if($isVlue<=$v5)
            {
                return 5;
            }
            else
            {
                return "Invalid value";
            }
        }
        else
        {
            if($isVlue>=$v1)
            {
                return 1;
            }
            else if($isVlue>=SplitValue($v2)[0] && $isVlue<=SplitValue($v2)[1])
            {
                return 2;
            }
            else if($isVlue>=SplitValue($v3)[0] && $isVlue<=SplitValue($v3)[1])
            {
                return 3;
            }
            else if($isVlue>=SplitValue($v4)[0] && $isVlue<=SplitValue($v4)[1])
            {
                return 4;
            }
            else if($isVlue<=$v5)
            {
                return 5;
            }
            else
            {
                return "Invalid value 1";
            }
        }
        
    }
    else //การคำนวนเเบบจำนวนเต็ม > ไปหา <
    {
        if($isVlue>=$v1)
        {
            return 1;
        }
        else if($isVlue<$v1 && $isVlue>=$v2)
        {
            return (($isVlue-$v1)/($v2-$v1)+1);
        }
        else if($isVlue<$v2 && $isVlue>=$v3)
        {
            return (($isVlue-$v2)/($v3-$v2)+2);
        }
        else if($isVlue<$v3 && $isVlue>=$v4)
        {
            return (($isVlue-$v3)/($v4-$v3)+3);
        }
        else if($isVlue<$v4 && $isVlue>=$v5)
        {
            return (($isVlue-$v4)/($v5-$v4)+4);
        }
        else if($isVlue<=$v5)
        {
            return 5;
        }
        else
        {
            return "Invalid value 2";
        }
    }
}
if($_GET['Mode']=="getScore"){
    echo "1=>".$rv1=0.5;
    echo "<br>";
    echo "2=>".$rv2="1.3-0.7";
    echo "<br>";
    echo "3=>".$rv3="2.0-1.4";
    echo "<br>";
    echo "4=>".$rv4="2.7-2.1";
    echo "<br>";
    echo "5=>".$rv5="2.8";
    echo "<br>";echo "<br>";
    echo "ค่า=>".$rval=$_GET['vlue'];
    echo "<br>";echo "<br>";
if($rv1<$rv5)
{
    echo $score=asc(cutTextSpecial($rv1),cutTextSpecial($rv2),
        cutTextSpecial($rv3),cutTextSpecial($rv4),cutTextSpecial($rv5),$rval);
    echo "<br>";
    echo "น้อยไปหามาก";
}
else
{
    echo $score=desc(cutTextSpecial($rv1),cutTextSpecial($rv2),
        cutTextSpecial($rv3),cutTextSpecial($rv4),cutTextSpecial($rv5),$rval);
    echo "<br>";
    echo "มากไปหาน้อย";
}
//    $json_data[] = array(
//            "score" => number_format($score,2),
//            "scoreAll" => number_format($score*$_POST['Weight']/100, 2),
//            "st" => "Y"
//        );
//    $scoreWeight = number_format($score*$_POST['Weight']/100, 2);
//    $score = number_format($score,2);
//    echo json_encode($json_data);
//    
//    $table="tb_evaluation";
//    $valuei="evaluation_value='".$_POST['id']."', evaluation_total_score = '$score', evaluation_value_score = '$scoreWeight' 
//    where kpi_master_id='".$_POST['kpi_master_id']."'
//    AND evaluation_year = '".$_POST['year']."' 
//    AND evaluation_month = '".$_POST['month']."' 
//    AND evaluation_id_staff = '".$_POST['idStaff']."' "; 
//    oUpdate($table,$valuei);
}
?>

