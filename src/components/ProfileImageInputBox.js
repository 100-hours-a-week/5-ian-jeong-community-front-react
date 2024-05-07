import React from "react";
import "./../styles/components/profile-image-input-box.css";

const ProfileImageInputBox = (props) => {
    const type = props.type;
    if (type == 'new') {
        return (
            <>
                <label id="profile-image-input-text" for="profile-image-input">프로필 사진</label>
                            
                    <div id="profile-image-input-box">
                        <input type="file" id="profile-image-input" accept="image/*" name="profileImage"></input>
                        <div id="cross-col"></div>
                        <div id="cross-row"></div>
                        <img id="profile-image-preview" src=""></img>
                    </div>
            </>
        )
    } else {
        return (
            <>
                <label id="profile-image-input-text" for="profile-image-input">프로필 사진</label>
                        
                    <div id="profile-image-input-box">
                        <input type="file" id="profile-image-input" accept="image/*" name="profileImage"></input>
                        <button id="image-edit-btn">변경</button>
                        <img id="profile-image-preview" src=""></img>
                    </div>
            </>
        );
    }

}

export default ProfileImageInputBox;