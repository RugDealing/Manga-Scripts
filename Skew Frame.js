// ----------- Skew Frame ----------- // 
/* 
    Increments the Rotation and Shear X Angle of a text frame by the same amount
*/

var skewFactor = 1; // change this number to increase/decrease the amount the text frame is skewed by
var doc = app.activeDocument;

function main() {
    var hasErrors = false,
        selections = app.selection;

    for (var i = 0; i < selections.length && !hasErrors; i++) {
        var textFrame = selections[i];
        hasErrors = isError(textFrame);

        if (!hasErrors) {
            textFrame.absoluteRotationAngle += skewFactor;
            textFrame.absoluteShearAngle += skewFactor;
        };
    }
}

function isError(obj) {
    if (!(obj instanceof TextFrame)) {
        alert('Please select some text frames and try again');
        return true;
    }
    return false;
}


main();