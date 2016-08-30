function demoFromHTML() {
    var pdf = new jsPDF('p', 'pt', 'letter')
    var source = $('#fromHTMLtestdiv').get(0);
    var specialElementHandlers = {
        '#bypassme': function(element, renderer){
            return true
        }
    };

    var margins = {
      top: 0,
      bottom: 60,
      left: 0,
      width: 522
    };
    pdf.fromHTML(source, margins.left, margins.top, {
            'width': margins.width,
            'elementHandlers': specialElementHandlers
        },
        function (dispose) {
          pdf.save('Test.pdf');
        },
        margins
    )
}


$(function(){
    $('#downloadPng').click(function(){
        div2png($("#fromHTMLtestdiv"),'png')
    });
    $('#download').click(function() {
        html2canvas($("#fromHTMLtestdiv"), {
            onrendered: function(canvas) {
                var imgData = canvas.toDataURL('image/png');
                var imgWidth = 210; 
                var pageHeight = 295;  
                var imgHeight = canvas.height * imgWidth / canvas.width;
                var heightLeft = imgHeight;

                var doc = new jsPDF('p', 'mm');
                var position = 0;

                doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;

                while (heightLeft >= 0) {
                    position = heightLeft - imgHeight;
                    doc.addPage();
                    doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                    heightLeft -= pageHeight;
                }
                doc.save('sample-file.pdf');
            },
            useCORS: true
        });
    });
})
