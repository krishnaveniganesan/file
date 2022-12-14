// This file was generated by Mendix Studio Pro.
//
// WARNING: Only the following code will be retained when actions are regenerated:
// - the import list
// - the code between BEGIN USER CODE and END USER CODE
// - the code between BEGIN EXTRA CODE and END EXTRA CODE
// Other code you write will be lost the next time you deploy the project.
import "mx-global";
import { Big } from "big.js";

// BEGIN EXTRA CODE
// END EXTRA CODE

/**
 * @param {string} base64content
 * @param {string} filename
 * @param {Big} version
 * @param {string} current_UserName
 * @param {string} webViewerPath
 * @param {string} path
 * @param {Big} timeOut
 * @param {Big} minTime
 * @param {Big} maxTime
 * @param {string} documenttype
 * @param {string} appid
 * @param {Big} viewerCount
 * @param {string} signaturebase64
 * @param {string} user
 * @returns {Promise.<string>}
 */
export async function JavaScript_actionDocToBase64_add_Image(base64content, filename, version, current_UserName, webViewerPath, path, timeOut, minTime, maxTime, documenttype, appid, viewerCount, signaturebase64, user) {
	// BEGIN USER CODE
    var timeOut = base64content.length / 100 > 30000 ? maxTime : minTime;
    console.warn('base64 length', timeOut);
    let finalBase64String;
    let pdftronViewers = document.getElementById('pdftron-viewers');
    let viewer = document.createElement('div');
    viewer.id = 'demo-viewer'
    viewer.style.display= 'none';
    pdftronViewers.innerHTML='';
    pdftronViewers.appendChild(viewer)
    window.base64='';
    
            //   console.log('s'+mailid)
            //    var complace=mailid.lastIndexOf(".com");            
            //    var newmail=mailid.slice(0,complace);
            //    console.log(newmail);
               
    WebViewer
        (
            {
    
                path: path.toString(),
                documentType: 'pdf',
                l: 'Dubai Municipality HQ(dm.gov.ae):ENTERP:Smart Office Application::B+:AMS(20221113):07A5E1DD04B7B60A7360B13AC9A2737820611F56C9707AB8D35C4DCA042299C64284B6F5C7',

                fullAPI: true,

                enableFilePicker: true
            },
            document.getElementById('demo-viewer')
        ).then
        (async (instance) => {
            let documentViewer = instance.docViewer;
 
            let annotationManager = documentViewer.getAnnotationManager();
       
            const { Annotations } = instance;
            const { WidgetFlags } = Annotations;
            // load document 

     
            const mainDoc = await documentViewer.getDocument();

            if (mainDoc === null) {
                await instance.loadDocument(base64ToBlob(base64content), {
                    filename: 'myfile.pdf'
                });
      
       
            }
            var FitM = instance.FitMode;
            instance.setFitMode(FitM.FitWidth);
            instance.setHeaderItems(function(header) {
                header.push({
                    type: 'actionButton',
                    img: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/></svg>',
                    onClick: function() {
                        // Update the document when button is clicked
                        saveDocumentfile().then(function() {
                            alert('Annotations saved to the document.');
                        });
                    }
                });
            });
            //base64 to blob conversion

            function base64ToBlob(base64) {
                var binaryString = window.atob(base64);
                var len = binaryString.length;
                var bytes = new Uint8Array(len);
                for (let i = 0; i < len; ++i) {
                    bytes[i] = binaryString.charCodeAt(i);
                }
                return new Blob([bytes], {
                    type: 'application/pdf'
                });
            };

            
        

   
            // set flags for required
            // const flags = new WidgetFlags();
            // flags.set('Required', true);

            // // create a form field
            // const fieldnew = new Annotations.Forms.Field("Signature1", { 
            //     type: 'Sig', 
            //     flags,
            // });

            const getFieldNameAndValue = (field) => {
                // Do something with data
                const { name, value } = field;
       
        //getfinalmail
          var validmail =name.includes(user)?true:false;
          console.log(validmail);


              
 console.log('sname'+name);
 console.log('sname'+field.od.toLowerCase())
        //getfinalmail
        debugger
                if (validmail) {
                    console.log("if works");
                    const widgetAnnot = new Annotations.SignatureWidgetAnnotation(field, {
                        appearance: '_DEFAULT',
                        appearances: {
                            _DEFAULT: {
                                Normal: {
                                    data: `data:image/png;base64,${signaturebase64}`,
                                    offset: {
                                        x: 100,
                                        y: 100,
                                    },
                                },
                            },
                        },
                    });
                    // console.log('Field Annot', field.Zd[0].Vs)
                   console.log('Field Annot', field)
                    //FIELD POSITION
                    console.log('widgetAnnot.X', field.Zd[0].fx)
                    console.log('widgetAnnot.Y', field.Zd[0].gx)
                    console.log('widgetAnnot.Width', field.Zd[0].Xs)
                    console.log('widgetAnnot.Height', field.Zd[0].Vs)
                    console.log('page number', field.Zd[0].bD)

                    // set position and size
                    widgetAnnot.PageNumber = field.Zd[0].bD;
                    widgetAnnot.X = field.Zd[0].fx; //fx
                    widgetAnnot.Y = field.Zd[0].gx; //gx
                    widgetAnnot.Width = field.Zd[0].Xs; //xs
                    widgetAnnot.Height = field.Zd[0].Vs; //vs
                    console.log("Widget Annot fd", field.Zd[0].bD);
                    //add the form field and widget annotation
                    // annotationManager.getFieldManager().addField(fieldnew);
                    annotationManager.addAnnotation(widgetAnnot);
                    annotationManager.drawAnnotationsFromList([widgetAnnot]);
                }
        
            }
            var saveDocumentfile = function(filename) {
                return new Promise(function(resolve) {
                    annotationManager.exportAnnotations().then(function(xfdfString) {
                        instance.docViewer.getDocument().getFileData({ xfdfString }).then(function(data) {
                            var arr = new Uint8Array(data);
                            var blob = new Blob([arr], { type: 'application/pdf' });
                            console.log('Blob - ', blob); 
                            var reader = new FileReader(); 
                            reader.readAsDataURL(blob); 
                            reader.onloadend = async() => { 
                                var base64String = reader.result; 
                                var newBase64 = base64String.split(',')[1];
                                console.log(newBase64);
                                finalBase64String = await newBase64;
                                window.base64 = newBase64;
                            }
          
                  
                        });
                    });
                });
            };
            documentViewer.on('annotationsLoaded', () => {
                const fieldManager = annotationManager.getFieldManager();
                console.log(fieldManager);
                fieldManager.forEachField(getFieldNameAndValue);      
            });

        saveDocumentfile()
        
       
        }
        );
 
    // $('iframe').on('load', function() {
     
    //     document.getElementsByTagName('iframe')[0].contentWindow.document.getElementById('Signature11').innerHTML = document.getElementsByTagName('iframe')[0].contentWindow.document.getElementById('Signature1').innerHTML;
    //     document.getElementsByTagName('iframe')[0].contentWindow.document.getElementById('Signature1').remove();

    // });
return  window.base64;
	// END USER CODE
}
