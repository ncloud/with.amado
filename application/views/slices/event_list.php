<?php
	if(count($events)) {
?>
	<ul class="events_list">
<?php
		foreach($events as $event) {
			$rsvp_time = strtotime($event->rsvp_start_time);
			$is_old = $rsvp_time < mktime();
			$hint_class = 'hint_old';
			if(!$is_old) {
				if($rsvp_time - mktime() <= 60*60*24) { // 오늘 이벤트
					$hint_class = 'hint_1';
				} else if($rsvp_time - mktime() <= 60*60*24*3) { // 3일 이내 이벤트 
					$hint_class = 'htin_2';
				} else {
					$hint_class = 'hint_3';
				}
			}
?>
		<li<?php echo $is_old ? ' class="is_old"' : '';?>>
			<div class="remain"><span class="<?php echo $hint_class;?>"><?php echo $this->date->string_from_now_to_remain($event->rsvp_start_time);?></span></div>
			<div class="title">
				<h3><a href="<?php echo site_url('/' . (!empty($event->url) ? $event->url : $event->id));?>"><?php echo $event->title;?></a></h3>
				<p>
					<?php
						if($event->user_id == $current_user->id) {
					?>
						<strong>회원님</strong>께서 만드신
					<?php
						} else {
					?>
						<strong><?php echo $event->user_display_name;?>님</strong>께서 만드신
					<?php
						}
						
						if(!empty($event->place)) { ?>
						<strong><?php echo $event->place;?></strong>에서
					<?php } 
						$time = strtotime($event->rsvp_start_time);
						$time_text = date('Y년 m월 d일', $time);
						$time_h = intval(date('H', $time));
						$time_m = intval(date('i', $time));

						if($time_h > 0 || $time_m > 0) {
							if($time_h > 0 && $time_m == 0) {
								$time_text.= ' ' . $time_h . '시';
							} else if($time_m > 0) {
								$time_text.= ' ' . $time_m . '분';
							}
						}
					?>
					<strong><?php echo $time_text;?></strong>에 열리는 모임
				</p>
			</div>
			<div class="button">
				<?php
					if($is_old) {
				?>
				<p class="disabled">모임마감</p>
				<?php
					} else {
						if(isset($rsvp_user_ids[$event->id]) && in_array($current_user->id, $rsvp_user_ids[$event->id])) {
				?>
						<button class="disabled"><span class="label">참석함</span></button>
				<?php
						} else {
				?>
					<form style="display: inline" action="<?php echo site_url('/event/in/' . $event->id);?>" method="get">
						<button class="green"><span class="label">참석하기</span></button>
					</form>
				<?php
						}
					}
				?>
			</div>
			<div class="rsvps">
				<?php
					if(isset($rsvp_users[$event->id]) && count($rsvp_users[$event->id])) {
				?>
					<ol>
					<?php 
						$count = 0;
						foreach($rsvp_users[$event->id] as $rsvp) {
							if($count++ > 3) break;
					?>
						<li>
							<?php
								if($rsvp->is_private == 'yes') {
							?>
							<div class="private_profile tip" title="익명 : <?php echo $rsvp->user_name;?>"><?php echo mb_substr($rsvp->user_name,0,1);?></div>
							<?php
								} else {
							?>
							<img class="tip" title="<?php echo $rsvp->user_name;?>" src="<?php echo $rsvp->profile;?>" alt="" />
							<?php
								}
							?>
						</li>
					<?php
						}
					?>
					</ol>
				<?php
					} else {
				?>
				<?php
					}
				?>
			</div>
			<div class="clear"></div>
		</li>
<?php
		}
?>
	</ul>
<?php
	}