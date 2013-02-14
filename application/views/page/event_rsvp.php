	
	<div class="grid contents_wrap">
		<div class="event_title_wrap">
			<h3><a href="<?php echo $event->permalink;?>"><?php echo $event->title;?></a></h3>
			<div class="status_wrap">
				<span class="percent">현재 <strong class="tip" title="<?php echo '전체 ' . $event->rsvp_max . '명 중 ' . $event->rsvp_now . '명이 모집되었습니다';?>"><?php echo $event->rsvp_percent;?>%</strong> 모집</span>
				<span class="remain"><?php echo $this->date->string_from_now_to_remain($event->rsvp_start_time, false, true);?></span>
			</div>

			<div class="bar_progress">
				<div class="fill" style="width:<?php echo $event->rsvp_percent;?>%;"></div>
				<div class="remain" style="left:<?php echo $event->rsvp_percent;?>%; width:<?php echo 100-$event->rsvp_percent;?>%;"></div>
			</div>
		</div>

		<h3 class="hint_title">참석자 목록</h3>
		<ul class="rsvp_users">
		<?php
			$index = 1;
			foreach($rsvp_users as $user) {
		?>
		<li>
			<span class="number"><?php echo $index++;?></span>
			<span class="profile"><img src="<?php echo $user->profile;?>" alt="" /></span>
			<span class="name">
				<?php if($user->is_private == 'yes') { ?>
					<?php echo $user->display_name;?> <span class="private">(익명신청 : <?php echo $user->user_name;?>)</span>
				<?php } else { ?>
					<?php echo $user->user_name;?>
				<?php } ?>
			</span>
			<?php
				if(!empty($user->contact)) {
			?>
			<span class="contact"><?php echo $user->contact;?></span>
			<?php } ?>
			<span class="contact"><?php echo $user->email;?></span>
			<?php
				if(!empty($user->message)) {
			?>
			<p>
				<?php echo nl2br($user->message);?>
			</p>
			<?php
				}
			?>

			<span class="date"><?php echo $this->date->string_from_now($user->insert_time);?></span>
		</li>
		<?php
			}
		?>
		</ul>
	</div>
