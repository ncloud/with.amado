
	<div class="grid contents_wrap">
		<div class="create_header_wrap">
			<form style="display: inline" action="<?php echo site_url('/create');?>" method="get">
				<button class="blue"><span class="label">모임 만들기</span></button>
			</form>
		</div>

		<?php
			if(count($events)) {
				echo $this->view('slices/event_column_list', array('events'=>$events,'rsvp_users'=>$rsvp_users, 'rsvp_user_ids'=>$rsvp_user_ids));
			} else {
		?>
		<li class="empty">
			다가오는 모임이 없어요.
		</li>
		<?php
			}
		?>
	</div>