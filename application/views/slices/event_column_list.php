<?php
	$list_id = isset($id) ? 'id="' . $id . '"' : '';
	if(count($events)) {
?>
	<ul <?php echo $list_id;?> class="events_column_list">
<?php
		$slot_index = 0;
		foreach($events as $event) {
			if($slot_index > 5) $slot_index = 0;

			echo $this->view('slices/event_column_item', array('event'=>$event, 'slot_index'=>$slot_index));

			$slot_index += 2;
		}
?>
	</ul>
<?php
	}