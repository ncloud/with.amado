
	<div class="grid contents_wrap view_wrap">
		<div class="row">
			<div class="title_wrap">
				<h3><?php echo $event->title;?></h3>
				<div class="status_wrap">
					<span class="percent">현재 <strong><?php echo $event->rsvp_percent;?>%</strong> 모집</span>
					<span class="remain"><?php echo $this->date->string_from_now_to_remain($event->rsvp_start_time, false, true);?></span>
				</div>

				<div class="bar_progress">
					<div class="fill" style="width:<?php echo $event->rsvp_percent;?>%;"></div>
					<div class="remain" style="left:<?php echo $event->rsvp_percent;?>%; width:<?php echo 100-$event->rsvp_percent;?>%;"></div>
				</div>
			</div>
			<div class="article_wrap slot-0-1-2-3">
				<article>
				<?php
					if(!empty($event->description)) {
				?>
					<?php echo $event->description;?>
				<?php
					} else {
						echo '이 이벤트는 설명이 따로 없습니다.<br />';
						echo '믿고 신청하실 수 밖에... :)';
					}
				?>
				</article>

			</div>
			<div class="sidebar_wrap slot-4-5">
				<div class="information_wrap">
					<div class="maker_wrap">
						<img src="<?php echo $event->user_profile;?>" alt="" /> <span class="name"><?php echo $event->user_display_name;?></span>
					</div>

					<ul class="detail_wrap">
						<li>
							<div class="title">날짜 : </div>
							<div class="value">
								<?php 
									$dates = explode(' ',$event->rsvp_start_time);
									echo $dates[0] . ($dates[1] == '00:00:00' ? '' : $dates[1]);
								?>
								<?php
									if($event->rsvp_end_time) {
										$dates = explode(' ',$event->rsvp_end_time);
										echo ' - ' . $dates[0] . ($dates[1] == '00:00:00' ? '' : $dates[1]);
									}
								?>
							</div>
						</li>
						<li>
							<div class="title">인원 : </div>
							<div class="value"><?php echo $event->rsvp_now;?> / <?php echo $event->rsvp_max;?></div>
						</li>
						<?php
							if(!empty($event->place)) {
						?>
						<li>
							<div class="title">장소 : </div>
							<div class="value"><?php echo $event->place;?></div>
						</li>
						<?php
							}
						?>
					</ul>
				</div>

				<div class="join_wrap">
				<?php 
					if($event->is_end) {
				?>
				이벤트 마감
				<?php
					} else {
						if($me_rsvp_in) {
				?>
					이미 참가신청하셨습니다. 

					<form style="display: inline" action="<?php echo site_url('/event/out/' . $event->id);?>" onsubmit="return confirm('정말로 참석을 취소하시겠습니까?');" method="get">
						<button class="red"><span class="label">참석 취소</span></button>
					</form>
				<?php
						} else {
				?>
				<form style="display: inline" action="<?php echo site_url('/event/in/' . $event->id);?>" method="get">
					<button class="green"><span class="label">참석하기</button>
				</form>
				<?php
						}
					}
				?>
				</div>
				<?php

					if(count($rsvps)) {
				?>
					<ul class="rsvps">
				<?php
						foreach($rsvps as $rsvp) {
				?>
						<li>
							<?php
								if($rsvp->is_private == 'yes') {
							?>
							<div class="private_profile tip" title="<?php echo $rsvp->user_name;?>"><?php echo mb_substr($rsvp->user_name,0,1);?></div>
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
					</ul>
				<?php
					}
				?>
			</div>
		</div>
	</div>