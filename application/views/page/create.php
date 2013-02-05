
	<?php
		$default_view_rsvp_end = isset($defaults['set_rsvp_end']) && $defaults['set_rsvp_end'] == 'true';
		$default_view_adv_option = true;
	?>

	<div class="grid contents_wrap create_wrap<?php echo $default_view_rsvp_end ? ' visible_more_date_wrap' : '';?><?php echo $default_view_adv_option ? ' visible_adv_option_wrap' : '';?>">
		<form method="POST" onsubmit="return create_event();">
			<input type="hidden" name="set_rsvp_end" value="<?php echo isset($defaults['set_rsvp_end']) ? $defaults['set_rsvp_end'] : 'false';?>" />

			<h3 class="main_title">모임 만들기</h3>
			<section class="input_group">
				<section class="title">모임명 <span class="required">*</span></section>
				<section class="input">
					<input type="text" name="title" value="<?php echo isset($defaults['title']) ? $defaults['title'] : '';?>" />
					<?php
						if(isset($errors['title']) && !empty($errors['title'])) {
					?>
					<p class="error">* <?php echo $errors['title'];?></p>
					<?php
						}
					?>
				</section>
			</section>
			<section class="input_group date_wrap">
				<section class="title">모임날짜 <span class="required">*</span></section>
				<section class="input">			
					<?php $default_date = isset($defaults['rsvp_start_date']) ? $defaults['rsvp_start_date'] : date('Y-m-d', mktime());?>

					<input type="text" name="rsvp_start_date" class="date" value="<?php echo $default_date;?>" data-value="<?php echo $default_date;?>" required="required" />
					<input type="text" name="rsvp_start_time" class="time" value="<?php echo isset($defaults['rsvp_start_time']) ? $defaults['rsvp_start_time'] : '';?>" placeholder="시간 지정" />

					<?php
						if(isset($errors['rsvp_start_date']) && !empty($errors['rsvp_start_date'])) {
					?>
					<p class="error">* <?php echo $errors['rsvp_start_date'];?></p>
					<?php
						}
					?>

					<div class="sub_input">
						<a id="more_date_button" href="#" onclick="toggle_date_option(); return false;"><?php echo $default_view_rsvp_end ? '날짜 옵션 감추기' : '날짜 옵션 더보기';?></a>
					</div>
				</section>
			</section>
			<section class="input_group more_date_wrap_option">
				<section class="title">종료 <span class="required">*</span></section>
				<section class="input">
					<?php $default_date = isset($defaults['rsvp_end_date']) ? $defaults['rsvp_end_date'] : date('Y-m-d', mktime() + ( 60*60*24 ));?>

					<input type="text" name="rsvp_end_date" class="date" value="<?php echo $default_date;?>" data-value="<?php echo $default_date;?>" />
					<input type="text" name="rsvp_end_time" class="time" value="<?php echo isset($defaults['rsvp_end_time']) ? $defaults['rsvp_end_time'] : '';?>" placeholder="시간 지정" />

					<?php
						if(isset($errors['rsvp_end_date']) && !empty($errors['rsvp_end_date'])) {
					?>
					<p class="error">* <?php echo $errors['rsvp_end_date'];?></p>
					<?php
						}
					?>
				</section>
			</section>
			<section class="input_group">
				<section class="title">정원 <span class="required">*</span></section>
				<section class="input">
					<input type="text" name="rsvp_max" class="person" value="<?php echo isset($defaults['rsvp_max']) ? $defaults['rsvp_max'] : '';?>" /> <label>명</label>
					<?php
						if(isset($errors['rsvp_max']) && !empty($errors['rsvp_max'])) {
					?>
					<p class="error">* <?php echo $errors['rsvp_max'];?></p>
					<?php
						}
					?>
				</section>
			</section>
			<section class="input_group">
				<section class="title">설명</section>
				<section class="input"><textarea name="description"><?php echo isset($defaults['description']) ? $defaults['description'] : '';?></textarea></section>
			</section>
			<section class="input_group">
				<section class="title">옵션</section>
				<section class="input">
					<?php
						$default_opt_enable_private_join = isset($defaults['opt_enable_private_join']) && $defaults['opt_enable_private_join'] != 'on' ? false : true;
						$default_opt_add_input_contact = isset($defaults['opt_add_input_contact']) && $defaults['opt_add_input_contact'] == 'on' ? true : false;
					?>
					<ol>
						<li><input type="checkbox" id="opt_enable_private_join" name="opt_enable_private_join" <?php echo $default_opt_enable_private_join ? 'checked="checked"' : '';?> /><label for="opt_enable_private_join">비공개 참석 신청을 허용합니다.</label></li>
						<li><input type="checkbox" id="opt_add_input_contact" name="opt_add_input_contact" <?php echo $default_opt_add_input_contact ? 'checked="checked"' : '';?> /><label for="opt_add_input_contact">참석 신청시 연락처를 받습니다.</label></li>
					</ol>

					<div class="sub_input">
						<a id="adv_option_button" href="#" onclick="toggle_adv_option(); return false;"><?php echo $default_view_adv_option ? '고급 옵션 감추기' : '고급 옵션 보기';?></a>
					</div>
				</section>
			</section>
			<section class="input_group adv_wrap_option">
				<section class="title">주소</section>
				<section class="input">
					<?php echo site_url('/');?><input type="text" class="url" name="url" value="<?php echo isset($defaults['url']) ? $defaults['url'] : '';?>" />

					<?php
						if(isset($errors['url']) && !empty($errors['url'])) {
					?>
					<p class="error">* <?php echo $errors['url'];?></p>
					<?php
						}
					?>
				</section>
			</section>
			<section class="input_group">
				<section class="input">
					<button class="green"><span class="label">만들기</span></button>
					<a class="cancel" href="<?php echo site_url('/');?>" onclick="return confirm('만들기를 취소하시겠습니까?');">취소</a>
				</section>
			</section>
		</form>
	</div>

	<script type="text/javascript">
		$(function() {
			$(".date").pickadate({
				today: false,
				clear: false
			});

		    $('.time').mobiscroll().time({
		        theme: 'android-ics light',
		        display: 'modal',
		        mode: 'scroller'
		    }); 
		});

	    function toggle_date_option() 
	    {
	    	if($(".create_wrap").toggleClass('visible_more_date_wrap').hasClass('visible_more_date_wrap')) {
	    		$("#more_date_button").text('날짜 옵션 감추기');
	    		$("input[name=set_rsvp_end]").val('true');
	    	} else {
	    		$("#more_date_button").text('날짜 옵션 더보기');
	    		$("input[name=set_rsvp_end]").val('false');
	    	}
	    }

	    function toggle_adv_option()
	    {
	    	if($(".create_wrap").toggleClass('visible_adv_option_wrap').hasClass('visible_adv_option_wrap')) {
	    		$("#adv_option_button").text('고급 옵션 감추기');
	    	} else {
	    		$("#adv_option_button").text('고급 옵션 보기');
	    	}

	    }

	    function create_event()
	    {
	    	return true;
	    }
	</script>