
	<div class="grid contents_wrap">
		<h3 class="hint_title">내가 만든 모임</h3>
		<div class="event_list">
			<?php
				if(count($events_by_me)) {
					echo $this->view('slices/event_list', array('events'=>$events_by_me,'rsvp_users'=>$rsvp_users, 'rsvp_user_ids'=>$rsvp_user_ids));
				} else {
			?>		
			<ul class="events_list">
				<li class="empty">
					아직 만든 모임이 없어요. ㅠ.ㅜ
				</li>
			</ul>
			<?php
				}
			?>
		</div>

		<h3 class="hint_title">내가 신청한 모임</h3>
		<div class="event_list">
			<?php
				if(count($events_to_me)) {
					echo $this->view('slices/event_list', array('events'=>$events_to_me,'rsvp_users'=>$rsvp_users, 'rsvp_user_ids'=>$rsvp_user_ids));
				} else {
			?>		
			<ul class="events_list">
				<li class="empty">
					아직 신청한 모임이 없어요.
				</li>
			</ul>
			<?php
				}
			?>
		</div>
	</div>