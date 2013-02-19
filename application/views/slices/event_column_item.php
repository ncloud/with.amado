<?php
			$rsvp_time = strtotime($event->rsvp_start_time);
			$is_disabled = $rsvp_time < mktime();
			$hint_class = 'hint_old';
			if(!$is_disabled) {
				if(in_array($event->action, array('cancel','pause','finish'))) {
					$hint_class = 'hint_cancel';
					$is_disabled = true;
				} else {
					if($rsvp_time - mktime() <= 60*60*24) { // 오늘 이벤트
						$hint_class = 'hint_1';
					} else if($rsvp_time - mktime() <= 60*60*24*3) { // 3일 이내 이벤트 
						$hint_class = 'hint_2';
					} else {
						$hint_class = 'hint_3';
					}
				}
			}

?>
		<li class="box <?php echo $is_disabled ? 'is_disabled ' : '';?><?php if(isset($slot_index)) { ?>slot-<?php echo $slot_index++;?>-<?php echo $slot_index++;?><?php } ?>">
			<div class="column">
				<div class="remain">
				<?php
					if($event->action == 'cancel') {
				?>				
					<span class="<?php echo $hint_class;?>">취소됨</span>
				<?php
					} else if($event->action == 'finish') {
				?>
					<span class="<?php echo $hint_class;?>">조기마감</span>
				<?php
					} else if($event->action == 'pause') {
				?>
					<span class="<?php echo $hint_class;?>">잠시멈춤</span>
				<?php
					} else {
				?>
					<span class="<?php echo $hint_class;?>"><?php echo $this->date->string_from_now_to_remain($event->rsvp_start_time);?></span>
				<?php
					}
				?>
				</div>

				<h3><a href="<?php echo site_url('/' . (!empty($event->url) ? $event->url : $event->id));?>"><?php echo $event->title;?></a></h3>

				<p>
				<?php
					if(!empty($event->description)) {
				?>
				<?php echo truncate(strip_tags($event->description),20);?>
				<?php
					}
				?>
				</p>

				<ul class="detail_wrap">
					<li>
						<div class="title">날짜</div>
						<div class="value">
							<?php 
								$dates = explode(' ',$event->rsvp_start_time);
								echo date('m월 d일', strtotime($event->rsvp_start_time)) . ' (' . $this->date->get_dow($event->rsvp_start_time) . ') ' . ($dates[1] == '00:00:00' ? '' : ' ' . str_replace(array('AM','PM'),array('오전','오후'), date('A h:i', strtotime($dates[1]))));
							?>
							<?php
								if($event->rsvp_end_time) {
									$dates = explode(' ',$event->rsvp_end_time);
									echo ' ~<br />' . date('m월 d일', strtotime($event->rsvp_end_time)) . ' (' . $this->date->get_dow($event->rsvp_start_time) . ') ' . ($dates[1] == '00:00:00' ? '' : ' ' . str_replace(array('AM','PM'),array('오전','오후'), date('A h:i', strtotime($dates[1]))));
								}
							?>
						</div>
					</li>
					<li>
						<div class="title">인원</div>
						<div class="value"><?php echo $event->rsvp_now;?> / <?php echo $event->rsvp_max;?></div>
					</li>
				</ul>

				<div class="header">
					<span class="profile"><img src="<?php echo $event->profile;?>" class="tip" title="<?php echo $event->display_name;?>" /></span>

					<div class="button">
						<?php
							if($is_disabled) {
						?>
						<p class="disabled">
							<?php if($event->action == 'pause') { ?>
							잠시 멈춤
							<?php } else { ?>
							모집 마감
							<?php } ?>
						</p>
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
					<div class="clear"></div>
				</div>
			</div>
		</li>