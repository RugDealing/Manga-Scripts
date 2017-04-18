﻿var doc = app.activeDocument;var bookSize = doc.pages.count(); // num of pages in .indd// You need to select which way your files are named, and comment out whichever one doesn't apply// for files that look like /108.tifvar regex = new RegExp("(?=.+)[0-9][0-9][0-9](?=\.tif)"); // to match the file namevar numRegex = new RegExp("[0-9][0-9][0-9](?=\.tif)"); // to get *just* the page number from the tif// for  files that look like /P108.TIF// var regex = new RegExp("(?=.+)[0-9][0-9][0-9](.TIF|G.TIF)"); // to match the file name// var numRegex = new RegExp("[0-9][0-9][0-9](?=\.TIF|G\.TIF)"); // to get *just* the page number from the tifvar pageNum, pageLink, i;var imagesLayer = doc.activeLayer.allGraphics;var textFrames = doc.textFrames;// scale images on all pages in the book//      param (float) scaleFactor - decimal of desired scale factor//// Example usage: //      scalePages(110); // scales all images to 110%var scalePages = function(scaleFactor){    for (i=0;i < bookSize; i++){        try{          pageLink = imagesLayer[i].itemLink.filePath;          if(regex.exec(pageLink)){            // get page number            pageNum = parseInt(numRegex.exec(pageLink), 10);                        // rescale images            imagesLayer[i].absoluteHorizontalScale = scaleFactor;            imagesLayer[i].absoluteVerticalScale = scaleFactor;            $.write("scaled page #" + pageNum + "\n");          }        } catch(e){          return 0;        }    };};// shift even- or odd-numbered images the desired number of points//      param (string) side - set of page numbers, can be either 'even' or 'odd'//      param (float) amt - number of points to shift each image//// Example usage: //    shift('even', 0.4); // shifts all even-numbered pages to the right 0.4 points//    shift('odd', -1.2); // shifts all odd-numbered pages to the left 1.2 pointsvar shift = function(side, amt){    if((side == "odd" || side == "even") && parseFloat(amt)){      try{        for (i=0;i < bookSize; i++){          pageLink = imagesLayer[i].itemLink.filePath;          if(regex.exec(pageLink) ){            pageNum = parseInt(numRegex.exec(pageLink), 10);            if(side == "odd" && pageNum && pageNum % 2 > 0){              imagesLayer[i].move(undefined,[amt,0]);              $.write("shifted page #" + pageNum + "\n");            } else if (side == "even" && pageNum && pageNum % 2 == 0){              imagesLayer[i].move(undefined,[amt,0]);              $.write("shifted page #" + pageNum + "\n");            }          }        }      } catch(e){};    } else{        $.write("Incorrect params! Here's an example: \n\t shift(\"left\", 0.8)\n");    }     };