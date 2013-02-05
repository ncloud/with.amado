<div class="login_or_join_wrap">
    <div class="social_wrap">
        <h3><a href="<?php echo site_url('/');?>"><span>타이틀</span></a></h3>
            
        <a href="#" class="facebook_button have_title" onclick="user.facebook_login(); return false;"><span><?php echo $join_mode ? '페이스북으로 가입하기' : '페이스북으로 로그인하기';?></span></a>
    </div>
    <div class="user_wrap">
        <form method="POST" action="<?php echo $join_mode ? site_url('/join/do') : site_url('/login/do');?>" class="<?php echo $join_mode ? 'join_mode' : 'login_mode';?>" onsubmit="on_submit_login_mode(); return false;">
            <div class="input_wrap">
                <input type="text" class="email" placeholder="<?php echo '이메일 주소';?>" />
                <input type="password" class="password" placeholder="<?php echo '비밀번호';?>" />
                <input type="text" class="username" placeholder="<?php echo '이름';?>" />
            </div>
            <div class="submit_wrap">
                <input type="submit" class="hidden" />
                <a href="#" class="button <?php echo $join_mode ? 'join_button' : 'login_button';?>" onclick="submit_login_mode(); return false;"><span><?php echo $join_mode ? '회원가입' : '로그인';?></span></a>
            </div>
        </form>
        <div class="or"><?php echo '또는';?></div>

        <div class="content_change_wrap">
            <a href="<?php echo $join_mode ? site_url('/login') : site_url('/join');?>" onclick="toggle_login_mode(); return false;" class="button <?php echo $join_mode ? 'login_button' : 'join_button';?>"><span><?php echo $join_mode ? '로그인' : '회원가입';?></span></a>
        </div>
    </div>
    <div class="clear"></div>
</div>

<script type="text/javascript">
    function on_submit_login_mode()
    {
        var $form = $(".login_or_join_wrap .user_wrap form");
        var $button = $form.find('.button');
        var $email = $form.find('.email');
        var $password = $form.find('.password');
    
        if($email.val() == "") { $email.focus(); return false; }
        else if($password.val() == "") { $password.focus(); return false; }

        if($form.hasClass('login_mode')) { // 로그인하기
            login.muzrang($email.val(), $password.val(), function(data) {
                if(data.success) { // 로그인 성공
                    window.location = service.url;
                } else {
                    alert(data.message);
                }
            });
        } else { // 가입하기
            var $username = $form.find('.username');
            if($username.val() == "") { $username.focus(); return false; }
            
            login.muzrang_join($email.val(), $password.val(), $username.val(), function(data) {
                if(data.success) { // 회원가입 성공
                    go(service.url + '/step/first', true);
                } else {
                    alert(data.message);
                }
            });
        }        
        
        return true;
    }

    function submit_login_mode()
    {
        var $form = $(".login_or_join_wrap .user_wrap form");
        var $button = $form.find('.button');
        var $email = $form.find('.email');
        var $password = $form.find('.password');
    
        if($email.val() == "") { $email.focus(); return false; }
        else if($password.val() == "") { $password.focus(); return false; }

        if($form.hasClass('login_mode')) { // 로그인하기
            $form.submit();
        } else { // 가입하기
            var $username = $form.find('.username');
            if($username.val() == "") { $username.focus(); return false; }
            
            $form.submit();
        }
        
        return true;
    }
    
    function toggle_login_mode()
    {
        var $form = $(".login_or_join_wrap .user_wrap form");
        var $button = $form.find('.button');
        var $toggle_button = $(".login_or_join_wrap .user_wrap .content_change_wrap .button");

        if($form.hasClass('login_mode')) {
            $form.attr('action', service.url + '/join/do');
            
            $form.removeClass('login_mode').addClass('join_mode');
            $button.removeClass('login_button').addClass('join_button').find('span').text('회원가입');
            $toggle_button.removeClass('join_button').addClass('login_button').find('span').text('로그인');
        } else {
            $form.attr('action', service.url + '/login/do');
            
            $form.removeClass('join_mode').addClass('login_mode');
            $button.removeClass('join_button').addClass('login_button').find('span').text('로그인');
            $toggle_button.removeClass('join_button').addClass('login_button').find('span').text('회원가입');
        }
        
        $form.find('.email').focus();
                    
    }
    
    $(function() {
        $(".user_wrap .input_wrap .email").focus();
    });
</script>
