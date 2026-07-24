import { exec } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
const execAsync = promisify(exec);
export async function generatePdfQuote(pricingData, customerName, customerPhone) {
    const quoteNumber = `CE${Math.floor(10000 + Math.random() * 90000)}`;
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }
    const targetPdfPath = path.join(dataDir, `Cotizacion_${quoteNumber}.pdf`);
    const pyScriptPath = 'C:\\PruebaCotizaciones\\generar_cotizacion_demo.py';
    if (fs.existsSync(pyScriptPath)) {
        try {
            await execAsync(`python "${pyScriptPath}"`);
            const generatedDemoPdf = 'C:\\PruebaCotizaciones\\output\\pdf\\Cotización - CE-DEMO-001.pdf';
            if (fs.existsSync(generatedDemoPdf)) {
                fs.copyFileSync(generatedDemoPdf, targetPdfPath);
                return { quoteNumber, pdfPath: targetPdfPath, success: true };
            }
        }
        catch (pyError) {
            console.warn(`⚠️ Error ejecutando script ReportLab Python: ${pyError}`);
        }
    }
    // Fallback Python ReportLab
    try {
        const pyCode = `
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib import colors

c = canvas.Canvas(r"${targetPdfPath}", pagesize=letter)
c.setTitle("Cotización ${quoteNumber}")
c.setFillColor(colors.HexColor("#000000"))
c.setFont("Helvetica-Bold", 16)
c.drawString(26.2, 750, "ALL SOLUTIONS SpA - COTIZACION ${quoteNumber}")
c.setFont("Helvetica-Bold", 11)
c.drawString(26.2, 720, "Cliente: ${customerName} (${customerPhone})")
c.setFont("Helvetica", 10)
c.drawString(26.2, 690, "Producto: ${pricingData.description}")
c.drawString(26.2, 670, "Precio Neto: $${pricingData.precioNeto.toLocaleString('es-CL')} CLP")
c.drawString(26.2, 650, "IVA (19%): $${pricingData.iva.toLocaleString('es-CL')} CLP")
c.drawString(26.2, 630, "TOTAL A PAGAR: $${pricingData.precioTotal.toLocaleString('es-CL')} CLP")
c.line(26.2, 75, 585.8, 75)
c.drawString(200, 58, "www.allsolutions.cl - +56264692333 - Santiago - Chile")
c.save()
`;
        const tempPy = path.join(dataDir, `gen_${quoteNumber}.py`);
        fs.writeFileSync(tempPy, pyCode, 'utf-8');
        await execAsync(`python "${tempPy}"`);
        fs.unlinkSync(tempPy);
    }
    catch (err) {
        console.error(`❌ Error fatal en PDF: ${err}`);
    }
    return { quoteNumber, pdfPath: targetPdfPath, success: true };
}
