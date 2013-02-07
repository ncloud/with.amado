
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
			<div class="article_wrap slot-0-1-2-3-4">

				<?php
					if(!empty($event->description)) {
				?>
				<article>
					<?php echo $event->description;?>
				</article>
				<?php
					} else {
						echo '이 이벤트는 설명이 따로 없습니다.';
					}
				?>
			</div>
			<div class="join_wrap slot-5">
				<?php 
					if($event->is_end) {
				?>
				이벤트 마감
				<?php
					} else {
						if($me_rsvp_in) {
				?>
					이미 참가함
				<?php
						} else {
				?>
				<form style="display: inline" action="<?php echo site_url('/event/in/' . $event->id);?>" method="get">
					<button class="green"><span class="label">참석하기</button>
				</form>
				<?php
						}
					}

					if(count($rsvps)) {
				?>
					<ul class="rsvps">
				<?php
						foreach($rsvps as $rsvp) {
				?>
						<li><img src="<?php echo $rsvp->profile;?>" alt="" /></li>
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