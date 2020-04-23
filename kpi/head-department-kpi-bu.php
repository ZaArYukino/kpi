<?php $page="list-kpi"; $ac="department-all"; session_start();?>  
<!DOCTYPE html>
<html lang="en">

<head>
    <?php include("inc-header.php")?>
    <?php 
    $month  =   $_SESSION['time']['month'];
    $year   =   $_SESSION['time']['year'];
    $code   =   $_GET['code'];
    $staff  =   cut(TokenVerify($_GET['key'], $secret));
    ?>
    <link rel="icon" href="../files/assets/images/favicon.ico" type="image/x-icon">
    <!-- Google font-->
    <link href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600" rel="stylesheet">
    <!-- Required Fremwork -->
    <link rel="stylesheet" type="text/css" href="../files/bower_components/bootstrap/css/bootstrap.min.css">
    <!-- themify-icons line icon -->
    <link rel="stylesheet" type="text/css" href="../files/assets/icon/themify-icons/themify-icons.css">
    <!-- ico font -->
    <link rel="stylesheet" type="text/css" href="../files/assets/icon/icofont/css/icofont.css">
    <!-- Font Awesome -->
    <link rel="stylesheet" type="text/css" href="../files/assets/icon/font-awesome/css/font-awesome.min.css">
    <link rel="stylesheet" type="text/css" href="../files/bower_components/datatables.net-bs4/css/dataTables.bootstrap4.min.css">
    <link rel="stylesheet" type="text/css" href="../files/assets/pages/data-table/css/buttons.dataTables.min.css">
    <link rel="stylesheet" type="text/css" href="../files/bower_components/datatables.net-responsive-bs4/css/responsive.bootstrap4.min.css">
    <link rel="stylesheet" type="text/css" href="../files/assets/pages/data-table/extensions/responsive/css/responsive.dataTables.css">
    <!-- Style.css -->
    <link rel="stylesheet" type="text/css" href="../files/assets/css/style.css">
    <link rel="stylesheet" type="text/css" href="../files/assets/css/component.css">
    <link rel="stylesheet" type="text/css" href="../files/assets/css/jquery.mCustomScrollbar.css">
    <link rel="stylesheet" href="../files/bower_components/c3/css/c3.css" type="text/css" media="all">


</head>
<style>
    .table td,
    .table th {
        padding: 5px;
        vertical-align: top;
        border-top: 1px solid #e9ecef;
    }
</style>

<body onload="sumScoreAll();">
    <!-- Pre-loader start -->
    <div class="theme-loader">
        <div class="loader-track">
            <div class="loader-bar"></div>
        </div>
    </div>
    <!-- Pre-loader end -->
    <div id="pcoded" class="pcoded">
        <div class="pcoded-overlay-box"></div>
        <div class="pcoded-container navbar-wrapper">
            <?php include("inc-nav.php");?>

            <div class="pcoded-main-container">
                <div class="pcoded-wrapper">
                    <?php include("inc-menu.php");?>
                    <div class="pcoded-content">
                        <div class="pcoded-inner-content">
                            <!-- Main-body start -->
                            <div class="main-body">
                                <div class="page-wrapper">
                                    <div class="page-body">
                                        <div class="card" style="padding-bottom:30px;">
                                        <div class="card-header">
                                            <h5 class="card-header-text">Department KPIs</h5>
                                        </div>

                                        <div class="card-block">

                                            <div class="dt-responsive table-responsive">
                                                <table <?php echo $_SESSION["ModeTable"];?>>
                                                    <thead>
                                                        <tr>

                                                            <th>KPI Name</th>
                                                            <th>weight</th>
                                                            <th>Target</th>
                                                            <th>1</th>
                                                            <th>2</th>
                                                            <th>3</th>
                                                            <th>4</th>
                                                            <th>5</th>
                                                            <th>6</th>
                                                            <th>7</th>
                                                            <th>8</th>
                                                            <th>9</th>
                                                            <th>10</th>
                                                            <th>11</th>
                                                            <th>12</th>
                                                            <th>YTD</th>
                                                            <th>scor</th>
                                                            <th></th>
                                                            <th>Year</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>

                                                        <?php 

 $valuei = "SELECT * 
                                                        FROM tb_kpi_type AS l1  
                                                        WHERE l1.kpi_types = '1'
                                                        AND (SELECT COUNT(*)
FROM tb_evaluation_all AS r1
JOIN tb_kpi_master AS r2 ON r1.kpi_master_id = r2.kpi_master_id
JOIN tb_assessment_time AS r3 ON r3.assessment_time_code = r1.evaluation_code
WHERE r1.evaluation_all_staff = '$staff'
AND r1.evaluation_all_year = '$year'
AND r2.kpi_type_id = l1.kpi_type_id
AND r3.assessment_time_type = '2' ) !='0'
                                                        ";
                                                        foreach(c_scelectS($valuei) AS $key => $r){ ?>
                                                        <tr>
                                                            <td colspan="19" style="background-color: #64a6ff70;"><?php echo $r['kpi_type_name'];?></td>
                                                        </tr>
                                                        <?php 
                                                        $valuei = "SELECT * 
FROM tb_evaluation_all AS r1
JOIN tb_kpi_master AS r2 ON r1.kpi_master_id = r2.kpi_master_id
JOIN tb_assessment_time AS r3 ON r3.assessment_time_code = r1.evaluation_code
JOIN tb_evaluation AS r4 ON r4.kpi_master_id = r2.kpi_master_id AND r4.evaluation_id_staff = '$staff'
AND r4.evaluation_year = '$year'
AND r4.evaluation_month = '$month'
WHERE r1.evaluation_all_staff = '$staff'
AND r1.evaluation_all_year = '$year'
AND r2.kpi_type_id = '".$r['kpi_type_id']."'
AND r3.assessment_time_type = '2' ";
                                                        foreach(c_scelectS($valuei) AS $key => $r){
                                                        ?>
                                                        <tr>

                                                            <td><?php echo $r['kpi_master_name']?></td>
                                                            <td><?php echo $r['kpi_master_weight']?></td>
                                                            <td><?php echo $r['kpi_master_target']?></td>
                                                            <td><input type="text" class="form-control k1<?php echo $r['evaluation_all_id'];?>" style="width: 70px;" value="<?php echo $r['evaluation_all_month_1']?>" <?php if ($month!="01"){ echo "disabled"; }?> onchange="inPutDate(<?php echo $r["evaluation_type"]?>,<?php echo $r["kpi_master_id"]?>,'k1'+<?php echo $r['evaluation_all_id'];?>,this.value,<?php echo $r['evaluation_all_id'];?>)"></td>

                                                            <td><input type="text" class="form-control k2<?php echo $r['evaluation_all_id'];?>" style="width: 70px;" value="<?php echo $r['evaluation_all_month_2']?>" <?php if ($month!="02"){ echo "disabled"; }?> onchange="inPutDate(<?php echo $r["evaluation_type"]?>,<?php echo $r["kpi_master_id"]?>,'k2'+<?php echo $r['evaluation_all_id'];?>,this.value,<?php echo $r['evaluation_all_id'];?>)"></td>

                                                            <td><input type="text" class="form-control k3<?php echo $r['evaluation_all_id'];?>" style="width: 70px;" value="<?php echo $r['evaluation_all_month_3']?>" <?php if ($month!="03"){ echo "disabled"; }?> onchange="inPutDate(<?php echo $r["evaluation_type"]?>,<?php echo $r["kpi_master_id"]?>,'k3'+<?php echo $r['evaluation_all_id'];?>,this.value,<?php echo $r['evaluation_all_id'];?>)"></td>

                                                            <td><input type="text" class="form-control k4<?php echo $r['evaluation_all_id'];?>" style="width: 70px;" value="<?php echo $r['evaluation_all_month_4']?>" <?php if ($month!="04"){ echo "disabled"; }?> onchange="inPutDate(<?php echo $r["evaluation_type"]?>,<?php echo $r["kpi_master_id"]?>,'k4'+<?php echo $r['evaluation_all_id'];?>,this.value,<?php echo $r['evaluation_all_id'];?>)"></td>

                                                            <td><input type="text" class="form-control k5<?php echo $r['evaluation_all_id'];?>" style="width: 70px;" value="<?php echo $r['evaluation_all_month_5']?>" <?php if ($month!="05"){ echo "disabled"; }?> onchange="inPutDate(<?php echo $r["evaluation_type"]?>,<?php echo $r["kpi_master_id"]?>,'k5'+<?php echo $r['evaluation_all_id'];?>,this.value,<?php echo $r['evaluation_all_id'];?>)"></td>

                                                            <td><input type="text" class="form-control k6<?php echo $r['evaluation_all_id'];?>" style="width: 70px;" value="<?php echo $r['evaluation_all_month_6']?>" <?php if ($month!="06"){ echo "disabled"; }?> onchange="inPutDate(<?php echo $r["evaluation_type"]?>,<?php echo $r["kpi_master_id"]?>,'k6'+<?php echo $r['evaluation_all_id'];?>,this.value,<?php echo $r['evaluation_all_id'];?>)"></td>

                                                            <td><input type="text" class="form-control k7<?php echo $r['evaluation_all_id'];?>" style="width: 70px;" value="<?php echo $r['evaluation_all_month_7']?>" <?php if ($month!="07"){ echo "disabled"; }?> onchange="inPutDate(<?php echo $r["evaluation_type"]?>,<?php echo $r["kpi_master_id"]?>,'k7'+<?php echo $r['evaluation_all_id'];?>,this.value,<?php echo $r['evaluation_all_id'];?>)"></td>

                                                            <td><input type="text" class="form-control k8<?php echo $r['evaluation_all_id'];?>" style="width: 70px;" value="<?php echo $r['evaluation_all_month_8']?>" <?php if ($month!="08"){ echo "disabled"; }?> onchange="inPutDate(<?php echo $r["evaluation_type"]?>,<?php echo $r["kpi_master_id"]?>,'k8'+<?php echo $r['evaluation_all_id'];?>,this.value,<?php echo $r['evaluation_all_id'];?>)"></td>

                                                            <td><input type="text" class="form-control k9<?php echo $r['evaluation_all_id'];?>" style="width: 70px;" value="<?php echo $r['evaluation_all_month_9']?>" <?php if ($month!="09"){ echo "disabled"; }?> onchange="inPutDate(<?php echo $r["evaluation_type"]?>,<?php echo $r["kpi_master_id"]?>,'k9'+<?php echo $r['evaluation_all_id'];?>,this.value,<?php echo $r['evaluation_all_id'];?>)"></td>

                                                            <td><input type="text" class="form-control k10<?php echo $r['evaluation_all_id'];?>" style="width: 70px;" value="<?php echo $r['evaluation_all_month_10']?>" <?php if ($month!="10"){ echo "disabled"; }?> onchange="inPutDate(<?php echo $r["evaluation_type"]?>,<?php echo $r["kpi_master_id"]?>,'k10'+<?php echo $r['evaluation_all_id'];?>,this.value,<?php echo $r['evaluation_all_id'];?>)"></td>

                                                            <td><input type="text" class="form-control k11<?php echo $r['evaluation_all_id'];?>" style="width: 70px;" value="<?php echo $r['evaluation_all_month_11']?>" <?php if ($month!="11"){ echo "disabled"; }?> onchange="inPutDate(<?php echo $r["evaluation_type"]?>,<?php echo $r["kpi_master_id"]?>,'k11'+<?php echo $r['evaluation_all_id'];?>,this.value,<?php echo $r['evaluation_all_id'];?>)"></td>

                                                            <td><input type="text" class="form-control k12<?php echo $r['evaluation_all_id'];?>" style="width: 70px;" value="<?php echo $r['evaluation_all_month_12']?>" <?php if ($month!="12"){ echo "disabled"; }?> onchange="inPutDate(<?php echo $r["evaluation_type"]?>,<?php echo $r["kpi_master_id"]?>,'k12'+<?php echo $r['evaluation_all_id'];?>,this.value,<?php echo $r['evaluation_all_id'];?>)"></td>
                                                            <td><input type="text" class="form-control kYtd<?php echo $r['evaluation_all_id'];?>" style="width: 70px;" value="<?php echo $r['evaluation_all_YTD']?>" <?php if ($r['evaluation_type']!="3"){ echo "disabled"; }?> onchange="upDateKpiYtd('<?php echo $r['evaluation_all_id']?>',this.value,<?php echo $r['kpi_master_id']?>,<?php echo $r['evaluation_id']?>);"></td>
                                                            <td><input type="text" class="form-control ks<?php echo $r['evaluation_all_id'];?>" style="width: 70px;" name="ksv[]" value="<?php echo $r['evaluation_all_scor']?>" disabled></td>


                                                            <td><i class="icofont icofont-emo-laughing"></i></td>
                                                            <td><a href="#" onclick="villGraph(<?php echo $r['evaluation_all_id']?>);"><button class="btn btn-success btn-round btn-sm">view</button></a> </td>
                                                        </tr>
                                                        <?php }} ?>





                                                    </tbody>
                                                </table>
                                            </div>


                                        </div>
                                        <div class="row">
                                            <div class="col-lg-12">
                                                <div class="general-info">
                                                    <div class="card-header">
                                                        <div class="card-header-right" style="margin-right:25px; margin-bottom:30px;">
                                                            <h5>
                                                                <span id="ks" style="display:inline;"></span> / 5.00
                                                            </h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>



                                    </div>
                                    
                                    </div>
                                </div>
                            </div>
                            <!-- Warning Section Starts -->
                            <div class="modal fade" id="villGraph" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style="width: 90%;">
                                <div class="modal-dialog modal-lg" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header pt-2 pb-2 btnh_primary">
                                            <h5 class="modal-title" id="exampleModalLabel">ประเมิน KPI</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <div class="card-block" style="margin: 5px;" id="contents">

                                                <div class="row">
                                                    <div class="col-12">


                                                        <div class="form-group row">
                                                            <label class="col-2 col-form-label"></label>
                                                            <div class="card col-9" id="chatKpi">

                                                            </div>
                                                        </div>


                                                        <div class="form-group row">
                                                            <label class="col-2 col-form-label">Name</label>
                                                            <div class="col-10">
                                                                <input type="text" class="form-control" id="showKpiName" readonly>

                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label class="col-2 col-form-label">Weight</label>
                                                            <div class="col-10">
                                                                <input type="text" class="form-control" id="showWeight" readonly>

                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label class="col-2 col-form-label">Target</label>
                                                            <div class="col-10">
                                                                <input type="text" class="form-control" id="showTarget" readonly>

                                                            </div>
                                                        </div>
                                                        <div class="dt-responsive table-responsive">
                                                            <table id="new-cons" class="table table-striped table-bordered nowrap">
                                                                <thead>
                                                                    <tr>
                                                                        <th>Jan</th>
                                                                        <th>Feb</th>
                                                                        <th>Mar</th>
                                                                        <th>Apr</th>
                                                                        <th>May</th>
                                                                        <th>Jun</th>
                                                                        <th>Jul</th>
                                                                        <th>Aug</th>
                                                                        <th>Sep</th>
                                                                        <th>Oct</th>
                                                                        <th>Nov</th>
                                                                        <th>Dec</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td>
                                                                            <div id="k1"></div>
                                                                        </td>
                                                                        <td>
                                                                            <div id="k2"></div>
                                                                        </td>
                                                                        <td>
                                                                            <div id="k3"></div>
                                                                        </td>
                                                                        <td>
                                                                            <div id="k4"></div>
                                                                        </td>
                                                                        <td>
                                                                            <div id="k5"></div>
                                                                        </td>
                                                                        <td>
                                                                            <div id="k6"></div>
                                                                        </td>
                                                                        <td>
                                                                            <div id="k7"></div>
                                                                        </td>
                                                                        <td>
                                                                            <div id="k8"></div>
                                                                        </td>
                                                                        <td>
                                                                            <div id="k9"></div>
                                                                        </td>
                                                                        <td>
                                                                            <div id="k10"></div>
                                                                        </td>
                                                                        <td>
                                                                            <div id="k11"></div>
                                                                        </td>
                                                                        <td>
                                                                            <div id="k12"></div>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label class="col-2 col-form-label">Year to date</label>
                                                            <div class="col-4">
                                                                <input type="text" class="form-control" id="evaluation_all_YTD" readonly>

                                                            </div>
                                                            <label class="col-2 col-form-label">Score</label>
                                                            <div class="col-4">
                                                                <input type="text" class="form-control" id="" readonly>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>


                                </div>
                            </div>

                            <div class="md-overlay"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="../files/bower_components/jquery/js/jquery.min.js"></script>
    <script src="../files/bower_components/jquery-ui/js/jquery-ui.min.js"></script>
    <script src="../files/bower_components/popper.js/js/popper.min.js"></script>
    <script src="../files/bower_components/bootstrap/js/bootstrap.min.js"></script>
    <!-- jquery slimscroll js -->
    <script src="../files/bower_components/jquery-slimscroll/js/jquery.slimscroll.js"></script>
    <!-- modernizr js -->
    <script src="../files/bower_components/modernizr/js/modernizr.js"></script>
    <script src="../files/bower_components/modernizr/js/css-scrollbars.js"></script>
    <!-- sweet alert js -->
    <script src="../files/bower_components/sweetalert/js/sweetalert.min.js"></script>
    <script src="../files/assets/js/modal.js"></script>
    <!-- sweet alert modal.js intialize js -->
    <!-- modalEffects js nifty modal window effects -->
    <script src="../files/assets/js/classie.js"></script>
    <script src="../files/assets/js/modalEffects.js"></script>
    <script src="../files/assets/js/pcoded.min.js"></script>
    <script src="../files/assets/js/vertical/vertical-layout.min.js"></script>
    <script src="../files/assets/js/jquery.mCustomScrollbar.concat.min.js"></script>
    <!-- Custom js -->
    <script src="../files/assets/js/script.js"></script>
    <!-- data-table js -->
    <script src="../files/bower_components/datatables.net/js/jquery.dataTables.min.js"></script>
    <script src="../files/bower_components/datatables.net-buttons/js/dataTables.buttons.min.js"></script>
    <script src="../files/assets/pages/data-table/js/jszip.min.js"></script>
    <script src="../files/assets/pages/data-table/js/pdfmake.min.js"></script>
    <script src="../files/assets/pages/data-table/js/vfs_fonts.js"></script>
    <script src="../files/bower_components/datatables.net-buttons/js/buttons.print.min.js"></script>
    <script src="../files/bower_components/datatables.net-buttons/js/buttons.html5.min.js"></script>
    <script src="../files/bower_components/datatables.net-bs4/js/dataTables.bootstrap4.min.js"></script>
    <script src="../files/bower_components/datatables.net-responsive/js/dataTables.responsive.min.js"></script>
    <script src="../files/bower_components/datatables.net-responsive-bs4/js/responsive.bootstrap4.min.js"></script>
    <!-- Custom js -->
    <script src="../files/assets/pages/data-table/js/data-table-custom.js"></script>

    <!-- Switch component js -->
    <script src="../files/bower_components/switchery/js/switchery.min.js"></script>
    <!-- Tags js -->
    <script src="../files/bower_components/bootstrap-tagsinput/js/bootstrap-tagsinput.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/typeahead.js/0.10.4/typeahead.bundle.min.js"></script>
    <!-- Max-length js -->
    <script src="../files/bower_components/bootstrap-maxlength/js/bootstrap-maxlength.js"></script>
    <!-- Custom js -->
    <script src="../files/assets/pages/advance-elements/swithces.js"></script>
    <script type="text/javascript" src="../files/new/jquery-ui.1.12.1.min.js"></script>


    <!-- Float Chart js -->
    <script src="../files/assets/pages/chart/float/jquery.flot.js"></script>
    <script src="../files/assets/pages/chart/float/jquery.flot.categories.js"></script>
    <script src="../files/assets/pages/chart/float/jquery.flot.pie.js"></script>
    <!-- Custom js -->


    <script src="https://www.gstatic.com/charts/loader.js"></script>
    <!-- c3 chart js -->
    <script src="../files/bower_components/d3/js/d3.min.js"></script>
    <script src="../files/bower_components/c3/js/c3.js"></script>


</body>
<script>
    $('#new-cons').dataTable({
        "searching": false,
        "info": false,
        "paging": false,
        "lengthChange": false,
        "order": [],
        "columnDefs": [{
            "targets": 'no-sort',
            "orderable": false,
        }]
    });
    //แสดงกราฟ 
    function villGraph(id) {
        var chatKpi = '';
        $("#villGraph").modal("show");
        $.ajax({
            url: "../class/class.php",
            global: false,
            type: "POST",
            data: ({
                id: id,
                Mode: "getEvaluationAll"
            }),
            dataType: "JSON",
            async: false,
            success: function(jd) {
                $.each(jd, function(key, val) {

                    var m1 = val["evaluation_all_month_1"];
                    var m2 = val["evaluation_all_month_2"];
                    var m3 = val["evaluation_all_month_3"];
                    var m4 = val["evaluation_all_month_4"];
                    var m5 = val["evaluation_all_month_5"];
                    var m6 = val["evaluation_all_month_6"];
                    var m7 = val["evaluation_all_month_7"];
                    var m8 = val["evaluation_all_month_8"];
                    var m9 = val["evaluation_all_month_9"];
                    var m10 = val["evaluation_all_month_10"];
                    var m11 = val["evaluation_all_month_11"];
                    var m12 = val["evaluation_all_month_12"];

                    var mc1 = null;
                    var mc2 = null;
                    var mc3 = null;
                    var mc4 = null;
                    var mc5 = null;
                    var mc6 = null;
                    var mc7 = null;
                    var mc8 = null;
                    var mc9 = null;
                    var mc10 = null;
                    var mc11 = null;
                    var mc12 = null;


                    $("#evaluation_all_YTD").val(val["evaluation_all_YTD"]);
                    $("#showWeight").val(val["kpi_master_weight"]);
                    $("#showTarget").val(val["kpi_master_target"]);
                    $("#showKpiName").val(val["kpi_master_name"]);
                    if (m1 > 0) {
                        $("#k1").empty().append(m1);
                    } else {
                        m1 = null;
                    }
                    if (m2 > 0) {
                        $("#k2").empty().append(m2);
                    } else {
                        m2 = null;
                    }
                    if (m3 > 0) {
                        $("#k3").empty().append(m3);
                    } else {
                        m3 = null;
                    }
                    if (m4 > 0) {
                        $("#k4").empty().append(m4);
                    } else {
                        m4 = null;
                    }
                    if (m5 > 0) {
                        $("#k5").empty().append(m5);
                    } else {
                        m5 = null;
                    }
                    if (m6 > 0) {
                        $("#k6").empty().append(m6);
                    } else {
                        m6 = null;
                    }
                    if (m7 > 0) {
                        $("#k7").empty().append(m7);
                    } else {
                        m7 = null;
                    }
                    if (m8 > 0) {
                        $("#k8").empty().append(m8);
                    } else {
                        m8 = null;
                    }
                    if (m9 > 0) {
                        $("#k9").empty().append(m9);
                    } else {
                        m9 = null;
                    }
                    if (m10 > 0) {
                        $("#k10").empty().append(m10);
                    } else {
                        m10 = null;
                    }
                    if (m11 > 0) {
                        $("#k11").empty().append(m11);
                    } else {
                        m11 = null;
                    }
                    if (m12 > 0) {
                        $("#k12").empty().append(m12);
                    } else {
                        m12 = null;
                    }

                    if (val["evaluation_all_month_ytd1"] > 0) {
                        mc1 = val["evaluation_all_month_ytd1"];
                    }
                    if (val["evaluation_all_month_ytd2"] > 0) {
                        mc2 = val["evaluation_all_month_ytd2"];
                    }
                    if (val["evaluation_all_month_ytd3"] > 0) {
                        mc3 = val["evaluation_all_month_ytd3"];
                    }
                    if (val["evaluation_all_month_ytd4"] > 0) {
                        mc4 = val["evaluation_all_month_ytd4"];
                    }
                    if (val["evaluation_all_month_ytd5"] > 0) {
                        mc5 = val["evaluation_all_month_ytd5"];
                    }
                    if (val["evaluation_all_month_ytd6"] > 0) {
                        mc6 = val["evaluation_all_month_ytd6"];
                    }
                    if (val["evaluation_all_month_ytd7"] > 0) {
                        mc7 = val["evaluation_all_month_ytd7"];
                    }
                    if (val["evaluation_all_month_ytd8"] > 0) {
                        mc8 = val["evaluation_all_month_ytd8"];
                    }
                    if (val["evaluation_all_month_ytd9"] > 0) {
                        mc9 = val["evaluation_all_month_ytd9"];
                    }
                    if (val["evaluation_all_month_ytd10"] > 0) {
                        mc10 = val["evaluation_all_month_ytd10"];
                    }
                    if (val["evaluation_all_month_ytd11"] > 0) {
                        mc11 = val["evaluation_all_month_ytd11"];
                    }
                    if (val["evaluation_all_month_ytd12"] > 0) {
                        mc12 = val["evaluation_all_month_ytd12"];
                    }

                    if (val["kpi_master_in_type"] != 1) {
                        chatKpi += '<div class="card-block"><div id="chart_Combo" style="width: 100%; height: 200px;"></div></div>';
                        $("#chatKpi").empty().append(chatKpi);
                        drawVisualization(m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12, '3');
                    } else {
                        console.log("เพิ่มขึ้น");
                        chatKpi += '<div class="card-block"><div id="chart_Combo1" style="width: 100%; height: 200px;"></div></div>';
                        $("#chatKpi").empty().append(chatKpi);
                        lineChart1(val["kpi_master_target"], mc1, mc2, mc3, mc4, mc5, mc6, mc7, mc8, mc9, mc10, mc11, mc12);
                    }
                });
            }
        });



    }
    
    //การใส่ค่า และ คำนวน KPI 
    function inPutDate(type, id, csid, valueIn, evaluation_all_id) {
        $.ajax({
            url: "../class/class.php",
            global: false,
            type: "POST",
            data: ({
                id: id,
                Mode: "getKpiMasterHesd"
            }),
            dataType: "JSON",
            async: false,
            success: function(jd) {
                $.each(jd, function(key, val) {
                    console.log("inPutDate");
                    getScore(val["kpi_master_standard_1"], val["kpi_masterl_standard_2"], val["kpi_master_standard_3"], val["kpi_master_standard_4"], val["kpi_master_standard_5"], val["kpi_master_weight"], id, csid, valueIn, type, evaluation_all_id);


                });
            }
        });
    }
    function getScore(v1, v2, v3, v4, v5, Weight, kpi_master_id, csid, valueIn, typeIn, evaluation_all_id) {
        var csid = $("#csid").val()
        var month = '<?php echo $month;?>';
        var year = '<?php echo $year;?>';
        var idStaff = '<?php echo cut(TokenVerify($_GET['key'], $secret))?>';
        $.ajax({
            url: "../class/class-calculate.php",
            global: false,
            type: "POST",
            data: ({
                id: valueIn,
                Mode: "getScore",
                v1: v1,
                v2: v2,
                v3: v3,
                v4: v4,
                v5: v5,
                month: month,
                year: year,
                idStaff: idStaff,
                Weight: Weight,
                kpi_master_id: kpi_master_id,
                typeIn: typeIn,
                evaluation_all_id: evaluation_all_id
            }),
            dataType: "JSON",
            async: false,
            success: function(jd) {
                $.each(jd, function(key, val) {
                    $(".kYtd" + evaluation_all_id).val((val["valueAll"]));
                    SumsScore(val["valueAll"], v1, v2, v3, v4, v5, Weight, evaluation_all_id, typeIn);
                });
            }
        });
    }
    function SumsScore(valueIn, v1, v2, v3, v4, v5, Weight, evaluation_all_id, typeIn) {
        $.ajax({
            url: "../class/class-calculate.php",
            global: false,
            type: "POST",
            data: ({
                id: valueIn,
                Mode: "getScore",
                v1: v1,
                v2: v2,
                v3: v3,
                v4: v4,
                v5: v5,
                Weight: Weight,

            }),
            dataType: "JSON",
            async: false,
            success: function(jd) {
                $.each(jd, function(key, val) {
                    if (typeIn != 3) {
                        $(".ks" + evaluation_all_id).val(val["scoreAll"]);
                        InSrcore(evaluation_all_id, val["scoreAll"]);
                        sumScoreAll();
                    }
                });
            }
        });
    }
    function InSrcore(evaluation_all_id, Srcore) {
        $.ajax({
            url: "../class/class-calculate.php",
            global: false,
            type: "POST",
            data: ({
                evaluation_all_id: evaluation_all_id,
                Mode: "InSrcore",
                evaluation_id : evaluation_id,
                Srcore: Srcore

            }),
            dataType: "JSON",
            async: false,
            success: function(jd) {
                $.each(jd, function(key, val) {
                    console.log(val["st"]);
                });
            }
        });
    }
    
    //อับเดท YTD 
    function upDateKpiYtd(id, YTD, kpi_master_id,evaluation_id) {
        console.log(evaluation_id);
        $.ajax({
            url: "../class/class.php",
            global: false,
            type: "POST",
            data: ({
                id: id,
                YTD: YTD,
                Mode: "upDateKpiYtd"
            }),
            dataType: "JSON",
            async: false,
            success: function(jd) {
                $.each(jd, function(key, val) {

                    GetLevel(id, YTD,kpi_master_id,evaluation_id);
                });
            }
        });
    }
    
    //คำนวน Scores
    function GetLevel(id, YTD,kpi_master_id,evaluation_id) {
        console.log(evaluation_id);
        $.ajax({
            url: "../class/class.php",
            global: false,
            type: "POST",
            data: ({
                id: kpi_master_id,
                Mode: "getKpiMasterHesd"
            }),
            dataType: "JSON",
            async: false,
            success: function(jd) {
                $.each(jd, function(key, val) {
                    getScoreInscore(val["kpi_master_standard_1"], val["kpi_masterl_standard_2"], val["kpi_master_standard_3"], val["kpi_master_standard_4"], val["kpi_master_standard_5"], YTD, val["kpi_master_weight"], id,kpi_master_id,evaluation_id)
                    

                });
            }
        });
    }
    function getScoreInscore(v1, v2, v3, v4, v5, id, Weight, evaluation_all_id,kpi_master_id,evaluation_id) {
        console.log(evaluation_id);
        $.ajax({
            url: "../class/class-calculate.php",
            global: false,
            type: "POST",
            data: ({
                Mode: "getScoreInscore",
                id: id,
                v1: v1,
                v2: v2,
                v3: v3,
                v4: v4,
                v5: v5,
                Weight: Weight,
                kpi_master_id : kpi_master_id,
                idStaff : '<?php echo $staff;?>'
            }),
            dataType: "JSON",
            async: false,
            success: function(jd) {
                $.each(jd, function(key, val) {
                    $(".ks" + evaluation_all_id).val(val["scoreAll"]);
                    InSrcore(evaluation_all_id, val["scoreAll"],evaluation_id);
                    sumScoreAll();
                });
            }
        });
    }
    
    //ใส่ผลคำแนน 
    function sumScoreAll() {
        var sumValue = 0;
        $.each($('input[name="ksv[]"]'), function(i, v) {
            if (parseFloat(v.value) >= 0) sumValue += parseFloat(v.value)
        })
        $("#ks").empty().append(sumValue.toFixed(2));
        
        var sumValue = 0;
        $.each($('input[name="bsv[]"]'), function(i, v) {
            if (parseFloat(v.value) >= 0) sumValue += parseFloat(v.value)
        })
        $("#bs").empty().append(sumValue.toFixed(2));
    }




    //กราฟ 
    
    google.charts.load('current', {
        'packages': ['corechart']
    });
    google.charts.setOnLoadCallback(drawVisualization);

    function drawVisualization(m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12) {

        var st = 4;
        // Some raw data (not necessarily accurate)
        var data = google.visualization.arrayToDataTable([
            ['Month', 'Score', 'Target'],
            ['01', parseInt(m1), parseInt(st)],
            ['02', parseInt(m2), parseInt(st)],
            ['03', parseInt(m3), parseInt(st)],
            ['04', parseInt(m4), parseInt(st)],
            ['05', parseInt(m5), parseInt(st)],
            ['06', parseInt(m6), parseInt(st)],
            ['07', parseInt(m7), parseInt(st)],
            ['08', parseInt(m8), parseInt(st)],
            ['09', parseInt(m9), parseInt(st)],
            ['10', parseInt(m10), parseInt(st)],
            ['11', parseInt(m11), parseInt(st)],
            ['12', parseInt(m12), parseInt(st)]
        ]);

        var options = {
            title: 'Monthly Coffee Production by Country',
            width: 500,
            height: 200,
            vAxis: {
                title: 'Score'
            },
            hAxis: {
                title: 'Month'
            },
            seriesType: 'bars',
            series: {
                1: {
                    type: 'line'
                }
            },
            colors: ['#93BE52', '#FC6180']
        };

        var chart = new google.visualization.ComboChart(document.getElementById('chart_Combo'));
        chart.draw(data, options);
    }
    
    
    google.charts.load('current', {
        'packages': ['corechart']
    });
    google.charts.setOnLoadCallback(drawVisualization2);

    function drawVisualization2(m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12) {

        var st = 4;
        // Some raw data (not necessarily accurate)
        var data = google.visualization.arrayToDataTable([
            ['Month', 'Score', 'Target'],
            ['01', parseInt(m1), parseInt(st)],
            ['02', parseInt(m2), parseInt(st)],
            ['03', parseInt(m3), parseInt(st)],
            ['04', parseInt(m4), parseInt(st)],
            ['05', parseInt(m5), parseInt(st)],
            ['06', parseInt(m6), parseInt(st)],
            ['07', parseInt(m7), parseInt(st)],
            ['08', parseInt(m8), parseInt(st)],
            ['09', parseInt(m9), parseInt(st)],
            ['10', parseInt(m10), parseInt(st)],
            ['11', parseInt(m11), parseInt(st)],
            ['12', parseInt(m12), parseInt(st)]
        ]);

        var options = {
            title: 'Monthly Coffee Production by Country',
            width: 500,
            height: 200,
            vAxis: {
                title: 'Score'
            },
            hAxis: {
                title: 'Month'
            },
            seriesType: 'bars',
            series: {
                1: {
                    type: 'line'
                }
            },
            colors: ['#93BE52', '#FC6180']
        };

        var chart = new google.visualization.ComboChart(document.getElementById('chart'));
        chart.draw(data, options);
    }
    function lineChart1(Target, m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12) {
        var chart = c3.generate({
            bindto: '#chart_Combo1',
            size: {
                height: 240,
                width: 500
            },
            data: {
                columns: [
                    ['คะแนน', 0, m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12],
                    ['มาตรฐาน', Target, Target, Target, Target, Target, Target, Target, Target, Target, Target, Target, Target, Target, Target]
                ],

                colors: {
                    data1: '#0000ff',
                    data2: '#ff0000'
                }
            }
        });
    }


</script>

</html>