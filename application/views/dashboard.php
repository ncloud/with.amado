
	<div class="grid contents_wrap">
		<div class="create_header_wrap">
			<form style="display: inline" action="<?php echo site_url('/create');?>" method="get">
				<button class="green"><span class="label">모임 만들기</span></button>
			</form>
		</div>

		<h3 class="hint_title">내가 만든 모임</h3>
		<ul class="event_list">
			<?php
				if(count($events_by_me)) {
					echo $this->view('slices/event_list', array('events'=>$events_by_me));
				} else {
			?>
			<li class="empty">
				아직 만든 모임이 없어요. ㅠ.ㅜ
			</li>
			<?php
				}
			?>
		</ul>

		<h3 class="hint_title">내가 신청한 모임</h3>
		<ul class="event_list">
			<?php
				if(count($events_to_me)) {
					echo $this->view('slices/event_list', array('events'=>$events_to_me));
				} else {
			?>
			<li class="empty">
				아직 신청한 모임이 없어요. ㅠ.ㅜ
			</li>
			<?php
				}
			?>
		</ul>
	</div>