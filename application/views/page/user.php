	<div class="user_page_wrap">
		<div class="grid">
			<div class="profile"><img src="<?php echo $user->profile_original;?>" alt="" /></div>
			<div class="data">
				<h3><?php echo $user->display_name;?></h3>
				<ul class="info_wrap">
				<?php
					if($user->vendor_id == FACEBOOK_VENDOR) {
				?>
					<li class="facebook"><strong>페이스북</strong> : <a href="http://facebook.com/<?php echo $user->fb_id;?>" target="_blank">http://facebook.com/<?php echo $user->fb_id;?></a></li>
				<?php
					}
				?>
					<li class="join"><strong>가입일</strong> : <?php echo substr($user->create_time,0,10);?></li>
				</ul>
			</div>
		</div>
	</div>	

	<div class="grid contents_wrap">
		<?php
			if(count($events)) {
				echo $this->view('slices/event_column_list', array('id'=>'event_list','events'=>$events,'rsvp_users'=>$rsvp_users, 'rsvp_user_ids'=>$rsvp_user_ids));

				if($have_more_events) {
		?>
				<div class="more_wrap">
					<button onclick="more_events();"><span class="label">더보기</span></button>
				</div>			
		<?php		
				}
			} else {
		?>
		<li class="empty">
			다가오는 모임이 없어요.
		</li>
		<?php
			}
		?>
	</div>

	<script type="text/javascript">
		var $event_list = $("#event_list");
	<?php
		if($have_more_events) {
	?>
		var max_event_time = <?php echo $max_event_time;?>;
		var page = 2;console.log('<?php echo site_url('/ajax/more_events/');?>/' + max_event_time + '/' + page + '/<?php echo $event_get_count;?>');

		function more_events() {
			$.getJSON('<?php echo site_url('/ajax/more_events/');?>/' + max_event_time + '/' + page + '/<?php echo $event_get_count;?>', function(data) {
				if(data.success) {
					if(!data.have_more) { // 더보기 없음
						$('.contents_wrap .more_wrap').html('');
					}

					page = data.page;
					
					var $content = $(data.content);

					var slot_index = ($event_list.find('li.box').length * 2) % 6;
					$content.each(function(index, data) {
						var $this = $(this);
						if(!$this.hasClass('box')) return true;

						if(slot_index > 5) slot_index = 0;
						$this.addClass('slot-' + (slot_index++) + '-' + (slot_index++));
					});

					$event_list.append($content);
				}
			});
		}
	<?php
		}
	?>
	</script>