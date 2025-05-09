import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

export async function generatePDF(element, filename = 'leetcode-ai-insights.pdf') {
  try {
    // Capture the element using html2canvas
    const canvas = await html2canvas(element, {
      scale: 2, // Higher scale for better quality
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    })
    
    const imgWidth = 208; // A4 width in mm (210mm) with margins
    const pageHeight = 295; // A4 height in mm (297mm) with margins
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;
    
    const pdf = new jsPDF('p', 'mm', 'a4');
    let currentPage = 0;
    
    // Add title
    pdf.setFontSize(16);
    pdf.setTextColor(66, 133, 244); // Primary color
    pdf.text('LeetCode Performance Analysis', 105, 15, { align: 'center' });
    pdf.setFontSize(12);
    pdf.setTextColor(100);
    pdf.text(`Generated on ${new Date().toLocaleDateString()}`, 105, 22, { align: 'center' });
    
    position = 30; // Start position after title
    
    // Add the canvas image to the PDF (adding the first part)
    pdf.addImage(
      canvas.toDataURL('image/png', 1.0), 
      'PNG', 
      0, 
      position, 
      imgWidth, 
      imgHeight
    );
    
    heightLeft -= (pageHeight - position);
    
    // Add new pages if content overflows
    while (heightLeft > 0) {
      position = -pageHeight * currentPage;
      currentPage++;
      pdf.addPage();
      pdf.addImage(
        canvas.toDataURL('image/png', 1.0), 
        'PNG', 
        0, 
        position, 
        imgWidth, 
        imgHeight
      );
      heightLeft -= pageHeight;
    }
    
    // Add footer
    const pageCount = pdf.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      pdf.setPage(i);
      pdf.setFontSize(10);
      pdf.setTextColor(150);
      pdf.text(
        'LeetCode Stats Analyzer | Powered by AI',
        105,
        287,
        { align: 'center' }
      );
      pdf.text(`Page ${i} of ${pageCount}`, 190, 287, { align: 'right' });
    }
    
    // Save the PDF
    pdf.save(filename);
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    return false;
  }
}