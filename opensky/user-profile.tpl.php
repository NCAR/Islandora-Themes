<? 
$fname = $field_first_name[0]['safe_value'];
$lname = $field_last_name[0]['safe_value'];
$phone = $field_phone_extension[0]['safe_value'];
$role = $field_role[0]['safe_value'];
$account = menu_get_object('user');
$id = $account->uid;


echo '<div><span class="profile_label">Name: </span>';
if($lname && $fname){
	echo $fname.' '.$lname;
} else if($lname){
	echo $lname;
} else if($fname){
	echo $fname;
}
echo '</div>';
echo '<div><span class="profile_label">Role: </span>';
if($role){
	echo $role;
}
echo '</div>';
echo '<div><span class="profile_label">Contact: </span>';
echo '<a href="/user/'.$id.'/contact">Send email</a>';
if($phone){
	echo ' or call <span class="fullphone">303-497-'.$phone.'</span><span class="shortphone">x'.$phone.'</span>';
}
echo '</div>';