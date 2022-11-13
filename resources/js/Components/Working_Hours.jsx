import React , {useState} from 'react';


export default function RegisterBusinessForm(data) {

    const Header_id = "Header_" + data.day,
        CheckMarkButton_id = "CrossButton_" + data.day,
        WHButtons_id = "WHButtons_" + data.day,
        OpenDay_id = "Open_" + data.day,
        ClosedDay_id = "Closed_" + data.day,
        WHours_id = "WHours_" + data.day,
        OpenTime_id = "OpenTime_" + data.day,
        CloseTime_id = "CloseTime_" + data.day,
        HeaderDiv_id = 'HeaderDiv_' + data.day,
        [HeaderVisible, setHeaderVisible] = useState(false),
        [OpeningTime, setOpeningTime] = useState(''),
        [ClosingTime,setClosingTime] =  useState(''),
        [HeaderString,setHeaderString] = useState('');

    let OpenTimeInput = $('#' + OpenTime_id),
        ClosingTimeInput = $('#' + CloseTime_id);

    function handleOpenDayClick() {
        $('#' + WHours_id).show();
        $('#' + CheckMarkButton_id).show();
        $('#' + Header_id).hide();
        $('#' + WHButtons_id).hide();
    }

    function handleCrossButtonClick() {
        $('#' + WHours_id).hide();
        $('#' + CheckMarkButton_id).hide();
        $('#' + Header_id).show();
        $('#' + WHButtons_id).show();
        handleHeaderClick();
    }

    function handleHeaderClick() {
        let HeaderDiv = $('#' + HeaderDiv_id);
        if(!HeaderVisible){
            $('#' + WHButtons_id).show();
            setHeaderVisible(true);
            HeaderDiv.addClass('col-half');
        }
        else{
            $('#' + WHButtons_id).hide();
            HeaderDiv.removeClass('col-half');
            setHeaderVisible(false);
        }

    }

    function handleClosedClick() {
        OpenTimeInput.val('');
        ClosingTimeInput.val('');
        setHeaderString(' : Closed');
        handleHeaderClick();
    }

    function handleTime() {
        if( OpenTimeInput.val() === '' ||  ClosingTimeInput.val() === '') {
            setHeaderString('');
            return;
        }

        setOpeningTime(OpenTimeInput.val().toString());
        setClosingTime(ClosingTimeInput.val().toString());
        setHeaderString(' : Open ' + OpeningTime + ' to ' + ClosingTime);
        console.log('Header String is : ' + HeaderString);
    }
    return (
        <div className="input-group">
            <div id={HeaderDiv_id}>
                <input id={Header_id} type="button" value={data.day + HeaderString} onClick={handleHeaderClick}/>
                <button type="button" id={CheckMarkButton_id} className="close-container" hidden onClick={handleCrossButtonClick}>
                    <div className="check"></div>
                    <label className="close"></label>
                </button>
            </div>
            <div id={WHButtons_id} className="col-half" hidden>
                <div className="input-group">
                    <div className="col-half">
                        <input type="button" id={OpenDay_id} value="Open" onClick={handleOpenDayClick}/>
                    </div>
                    <div className="col-half">
                        <input type="button" id={ClosedDay_id} value="Closed" onClick={handleClosedClick}/>
                    </div>
                </div>
            </div>
            <div id={WHours_id} className="col-half" hidden>
                <div className="col-half">
                    <div className="input-group">
                        <input type="time" id={OpenTime_id} onInput={handleTime}/>
                    </div>
                </div>
                <div className="col-half">
                    <div className="input-group">
                        <input type="time" id={CloseTime_id} onInput={handleTime} />
                    </div>
                </div>
            </div>
        </div>
    )
}
