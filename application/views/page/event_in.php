
	<?php
		$default_view_private_name = $event->opt_enable_private_join == 'yes' && (isset($defaults['enable_private_join']) && $defaults['enable_private_join'] == 'on');
		$is_waiting = $event->rsvp_now == $event->rsvp_max;
	?> 

	<div class="grid contents_wrap create_wrap event_in_wrap<?php echo $default_view_private_name ? ' enable_private_join' : '';?>">
		<form method="POST" onsubmit="return event_in();">
			<h3 class="main_title"><a href="#"><?php echo $event->title;?></a> - <?php echo $is_waiting ? '대기하기' : '참가하기';?></h3>

			<section class="input_group user_group">
				<section class="title">이름 <span class="required">*</span></section>
				<section class="input">
					<p class="user_name">
						<?php echo $current_user->display_name;?>
					</p>
					<?php if($event->opt_enable_private_join == 'yes') { ?>
					<div class="right">
						<input type="checkbox" id="enable_private_join" name="enable_private_join"<?php echo $default_view_private_name ? ' checked="checked"' : ''; ?> /><label for="enable_private_join">익명 사용</label>
					</div>
					<?php } ?>

					<div class="private_wrap">
						<span id="private_profile" class="private_profile"></span>
						<input type="text" id="private_name" name="private_name" value="<?php echo isset($defaults['private_name']) ? $defaults['private_name'] : '';?>" />
					</div>

					<?php
						if(isset($errors['private_name']) && !empty($errors['private_name'])) {
					?>
					<p class="error">* <?php echo $errors['private_name'];?></p>
					<?php
						}
					?>

				</section>
			</section>
			<?php
				if($event->opt_add_input_contact == 'yes') {
			?>
			<section class="input_group">
				<section class="title">연락처 <span class="required">*</span></section>
				<section class="input">
					<input type="text" name="contact" value="<?php echo isset($defaults['contact']) ? $defaults['contact'] : '';?>" />
					<?php
						if(isset($errors['contact']) && !empty($errors['contact'])) {
					?>
					<p class="error">* <?php echo $errors['contact'];?></p>
					<?php
						}
					?>
				</section>
			</section>

			<?php
				}
			?>

			<section class="input_group">
				<section class="title">하고싶은말</section>
				<section class="input"><textarea name="message"><?php echo isset($defaults['message']) ? $defaults['message'] : '';?></textarea></section>
			</section>

			<section class="input_group">
				<section class="input">
					<button class="green"><span class="label"><?php echo $is_waiting ? '대기하기' : '참석하기';?></span></button>
					<a class="cancel" href="<?php echo site_url('/');?>" onclick="return confirm('<?php echo $is_waiting ? '대기하기' : '참석하기';?>를 취소하시겠습니까?');">취소</a>
				</section>
			</section>
		</form>
	</div>

	<script type="text/javascript">
	    function event_in()
	    {
	    	return true;
	    }

		$(function() {
			$('#private_name').bind('textchange', function(event,prevText) {
				var first_char = $(this).val().substr(0,1);
				$("#private_profile").text(first_char);
			}).trigger('textchange');

		    $("#enable_private_join").change(function() {
		    	var $this = $(this);
		    	var checked = $this.attr('checked') == 'checked';
		    	if(checked) {
		    		$('.event_in_wrap').addClass('enable_private_join');
		    	} else {
		    		$('.event_in_wrap').removeClass('enable_private_join');
		    	}
		    });
		});
	</script>