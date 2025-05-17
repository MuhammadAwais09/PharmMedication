import latex from 'node-latex';
import { Readable } from 'stream';

const generatePDF = async (req, res) => {
  try {
    const { latex: latexContent } = req.body;
    if (!latexContent) {
      return res.status(400).json({ error: 'LaTeX content is required' });
    }

    // Convert LaTeX string to stream
    const input = new Readable();
    input.push(latexContent);
    input.push(null);

    // Set response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=invoice.pdf');

    // Render LaTeX to PDF
    const pdf = latex(input, { cmd: 'pdflatex' });
    pdf.pipe(res);

    pdf.on('error', (err) => {
      console.error('LaTeX error:', err);
      res.status(500).json({ error: 'Failed to generate PDF' });
    });
    pdf.on('end', () => {
      res.end();
    });
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: err.message });
  }
};

export { generatePDF };