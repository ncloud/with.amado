<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="utf-8">
    <title><?php echo $title_for_layout;?></title>

    <meta name="title" content="">
    <meta name="description" content="">
    <meta name="keywords" content="">
    <?php if(isset($og_title)) { ?><meta property="og:title" content="<?php echo $og_title;?>" /><?php } ?>
    <?php if(isset($og_description)) { ?><meta property="og:description" content="<?php echo $og_description;?>" /><?php } ?>
    <?php if(isset($og_url)) { ?><meta property="og:url" content="<?php echo $og_url;?>" /><?php } ?>
    <?php if(isset($og_site_name)) { ?><meta property="og:site_name" content="<?php echo $og_site_name;?>" /><?php } ?>
    <?php if(isset($og_image)) { ?><meta property="og:image" content="<?php echo $og_image;?>" /><?php } ?>
    
    <link rel="stylesheet" href="<?php echo site_url('/less/responsive.less');?>" type="text/less" media="screen" />
    <link rel="stylesheet" href="<?php echo site_url('/less/elusive-webfont.less');?>" type="text/less" media="screen" />
    <link rel="stylesheet" href="<?php echo site_url('/css/compress/all.' . $this->config->item('app_version') . '.css');?>" type="text/css" media="screen" />
    
    <!--[if lt IE 9 ]><link rel="stylesheet" href="<?php echo site_url('/css/lib/720_grid.css');?>" type="text/css"><![endif]-->
    <link rel="stylesheet" href="<?php echo site_url('/css/lib/720_grid.css');?>" type="text/css" media="screen and (min-width: 720px)">

    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.js"></script>
    <script type="text/javascript" src="<?php echo site_url('/js/compress/all.' . $this->config->item('app_version') . '.js');?>"></script>
    <!--[if lt IE 9]><script type="text/javascript" src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script><![endif]-->

    <script type="text/javascript">
       var service = {
                url:"<?php echo site_url(''); ?>", 
                user_id:<?php echo $current_user->id;?>,
                user_role:"<?php if($current_user->id != 0): ?>member<?php else: ?>guest<?php endif;?>",
                mobile:<?php echo $mobile_mode ? 'true' : 'false';?>
       };
           
       if(typeof($) != 'undefined' && $.browser.msie && parseInt($.browser.version) < 8) {
          if(window.location != service.url + 'unsupport_browser') {
              window.location = service.url + 'unsupport_browser';
          }
       }
    </script>

    <?php echo $styles_for_layout;?>
    <?php echo $scripts_for_layout;?>
</head>
<body class="<?php if(isset($mobile_mode) && $mobile_mode) { ?>is_mobile<?php } else {?>is_not_mobile<?php } ?> <?php echo $current_user->id ? 'is_memeber_wrap' : 'is_guest_wrap';?>">
    <div id="fb-root"></div> 
    <script type="text/javascript" src="http://connect.facebook.net/ko_KR/all.js"></script>
    <script type="text/javascript"> 
        FB.init({
             appId  : '<?php echo $this->config->item('facebook_appid');?>',
             channelUrl : '<?php echo site_url('/files/channel.php');?>', // Channel File
             status : true, // check login status
             cookie : true // enable cookies to allow the server to access the session
         });
    </script>
    <header>
        <div class="grid contents_wrap">
            <div class="row">
                <h1 class='slot-0-1-2-3'><a href="<?php echo site_url('/');?>"><?php echo $title_for_layout;?></a></h1>
                <div class="slot-4-5 user_wrap">
                    <?php if($current_user->id) {
                    ?>
                    <span class="user"><img src="<?php echo $current_user->profile;?>" alt="profile" /><span><?php echo $current_user->name;?></span></span>
                    <form style="display: inline" action="<?php echo site_url('/logout');?>" method="get">
                        <button class="red"><span class="label">로그아웃</span></button>
                    </form>
                    <?php
                    } else {
                    ?> 
                    <form style="display: inline" onsubmit="user.facebook_login(); return false;" action="<?php echo site_url('/login');?>" method="get">
                        <button class="blue"><span class="label">페이스북 로그인</span></button>
                    </form>
                    <?php
                    } ?>
                </div>
            </div>
        </div>
    </header>
    <div id="content">
        <?php echo $content_for_layout;?>
    </div>
</body>
</html>