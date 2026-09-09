import { jsPDF } from 'jspdf';
import { PlayerBingoCard, BingoLetter, CardsPerPage, InkMode, Language } from '../types';
import { LETTER_RANGES } from './bingoData';
import { translations } from '../i18n/translations';

interface GeneratePdfOptions {
  cards: PlayerBingoCard[];
  cardsPerPage: CardsPerPage; // 2 or 4
  inkMode: InkMode; // 'color' or 'bw'
  lang?: Language;
}

export function generateBingoPdf({ cards, cardsPerPage, inkMode, lang = 'es' }: GeneratePdfOptions): jsPDF {
  const t = translations[lang] || translations.es;
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const letters: BingoLetter[] = ['B', 'I', 'N', 'G', 'O'];
  const isBW = inkMode === 'bw';

  // Letter colors in RGB
  const letterColors: Record<BingoLetter, [number, number, number]> = {
    B: [239, 68, 68], // Red
    I: [249, 115, 22], // Orange
    N: [16, 185, 129], // Green
    G: [59, 130, 246], // Blue
    O: [139, 92, 246], // Purple
  };

  const drawCard = (card: PlayerBingoCard, x: number, y: number, width: number, height: number) => {
    // Card Border & Background
    doc.setFillColor(255, 255, 255);
    if (isBW) {
      doc.setDrawColor(40, 40, 40);
      doc.setLineWidth(0.6);
      doc.roundedRect(x, y, width, height, 4, 4, 'FD');
    } else {
      doc.setDrawColor(245, 158, 11); // Amber
      doc.setLineWidth(0.8);
      doc.roundedRect(x, y, width, height, 4, 4, 'FD');
    }

    // Card Header Bar
    const headerHeight = cardsPerPage === 2 ? 14 : 10;
    if (isBW) {
      doc.setFillColor(245, 245, 245);
      doc.rect(x + 0.4, y + 0.4, width - 0.8, headerHeight, 'F');
      doc.setDrawColor(180, 180, 180);
      doc.line(x, y + headerHeight, x + width, y + headerHeight);
    } else {
      doc.setFillColor(254, 243, 199); // Amber-100
      doc.rect(x + 0.4, y + 0.4, width - 0.8, headerHeight, 'F');
      doc.setDrawColor(251, 191, 36);
      doc.line(x, y + headerHeight, x + width, y + headerHeight);
    }

    // Header Text: Player Name & Card Info
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(cardsPerPage === 2 ? 13 : 10);
    doc.setTextColor(isBW ? 20 : 30, isBW ? 20 : 41, isBW ? 20 : 59);
    doc.text(card.playerName, x + 4, y + (cardsPerPage === 2 ? 6.5 : 5));

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(cardsPerPage === 2 ? 8.5 : 7);
    doc.setTextColor(isBW ? 100 : 120, isBW ? 100 : 120, isBW ? 100 : 120);
    doc.text(
      t.printCardNumberTitle.replace('{0}', String(card.cardIndex)),
      x + 4,
      y + (cardsPerPage === 2 ? 11.5 : 8.5)
    );

    // Header Right Badge: BINGO 75
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(cardsPerPage === 2 ? 9 : 7.5);
    if (isBW) {
      doc.setTextColor(40, 40, 40);
    } else {
      doc.setTextColor(217, 119, 6);
    }
    doc.text('BINGO 75', x + width - 4, y + (cardsPerPage === 2 ? 8 : 6), { align: 'right' });

    // Grid Dimensions
    const gridPadding = cardsPerPage === 2 ? 5 : 3.5;
    const gridTop = y + headerHeight + (cardsPerPage === 2 ? 4 : 2.5);
    const gridWidth = width - gridPadding * 2;
    const colWidth = gridWidth / 5;

    const letterRowHeight = cardsPerPage === 2 ? 11 : 8.5;
    const availableGridHeight =
      height - (headerHeight + (cardsPerPage === 2 ? 4 : 2.5) + letterRowHeight + (cardsPerPage === 2 ? 11 : 8));
    const cellHeight = availableGridHeight / 5;

    // Draw B-I-N-G-O Letter Header Boxes
    letters.forEach((lettr, colIdx) => {
      const cellX = x + gridPadding + colIdx * colWidth;
      const cellY = gridTop;

      if (isBW) {
        doc.setFillColor(30, 41, 59);
      } else {
        const [r, g, b] = letterColors[lettr];
        doc.setFillColor(r, g, b);
      }
      doc.roundedRect(cellX + 0.6, cellY, colWidth - 1.2, letterRowHeight, 2, 2, 'F');

      // Letter
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(cardsPerPage === 2 ? 14 : 11);
      doc.text(lettr, cellX + colWidth / 2, cellY + (cardsPerPage === 2 ? 6.5 : 5.5), {
        align: 'center',
      });

      // Range text (1-15, etc.)
      const range = LETTER_RANGES[lettr];
      doc.setFontSize(cardsPerPage === 2 ? 6.5 : 5.5);
      doc.setFont('helvetica', 'normal');
      doc.text(
        `${range.min}-${range.max}`,
        cellX + colWidth / 2,
        cellY + (cardsPerPage === 2 ? 9.8 : 7.8),
        { align: 'center' }
      );
    });

    // Draw 5x5 Number Cells
    const numbersTop = gridTop + letterRowHeight + 1.5;

    for (let rowIdx = 0; rowIdx < 5; rowIdx++) {
      for (let colIdx = 0; colIdx < 5; colIdx++) {
        const colLetter = letters[colIdx];
        const cellValue = card.grid[colLetter][rowIdx];
        const isFree = cellValue === 'FREE';

        const cellX = x + gridPadding + colIdx * colWidth;
        const cellY = numbersTop + rowIdx * cellHeight;

        // Cell background
        if (isFree) {
          if (isBW) {
            doc.setFillColor(240, 240, 240);
            doc.setDrawColor(40, 40, 40);
          } else {
            doc.setFillColor(254, 243, 199);
            doc.setDrawColor(251, 191, 36);
          }
          doc.setLineWidth(0.5);
          doc.roundedRect(cellX + 0.6, cellY + 0.6, colWidth - 1.2, cellHeight - 1.2, 2, 2, 'FD');

          // Free Star
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(cardsPerPage === 2 ? 14 : 11);
          doc.setTextColor(isBW ? 40 : 217, isBW ? 40 : 119, isBW ? 40 : 6);
          doc.text('*', cellX + colWidth / 2, cellY + cellHeight / 2 + 1, { align: 'center' });

          doc.setFontSize(cardsPerPage === 2 ? 6.5 : 5);
          doc.text(t.freeSpaceLabel, cellX + colWidth / 2, cellY + cellHeight - 1.5, { align: 'center' });
        } else {
          doc.setFillColor(255, 255, 255);
          doc.setDrawColor(isBW ? 180 : 226, isBW ? 180 : 232, isBW ? 180 : 240);
          doc.setLineWidth(0.3);
          doc.roundedRect(cellX + 0.6, cellY + 0.6, colWidth - 1.2, cellHeight - 1.2, 1.5, 1.5, 'FD');

          // Number text
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(cardsPerPage === 2 ? 16 : 12);
          doc.setTextColor(30, 41, 59);
          doc.text(
            String(cellValue),
            cellX + colWidth / 2,
            cellY + cellHeight / 2 + (cardsPerPage === 2 ? 2.5 : 1.8),
            { align: 'center' }
          );
        }
      }
    }

    // Card Footer instruction for kids
    const footerY = y + height - (cardsPerPage === 2 ? 4 : 2.5);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(cardsPerPage === 2 ? 7 : 5.5);
    doc.setTextColor(140, 140, 140);
    doc.text(t.printBeansCoverHint, x + 4, footerY);
    doc.text(t.printFreeCenterPdfHint, x + width - 4, footerY, { align: 'right' });
  };

  // Group cards into pages
  const totalPages = Math.ceil(cards.length / cardsPerPage);

  for (let p = 0; p < totalPages; p++) {
    if (p > 0) {
      doc.addPage();
    }

    const pageCards = cards.slice(p * cardsPerPage, (p + 1) * cardsPerPage);

    // Page Top Decorative Title (Non-intrusive)
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(160, 160, 160);
    doc.text(t.printPdfTopTitle.replace('{0}', String(p + 1)).replace('{1}', String(totalPages)), 14, 8);

    if (cardsPerPage === 2) {
      // 2 Cards per page (Stacked vertically)
      const cardWidth = 182;
      const cardHeight = 130;
      const startX = 14;

      // Card 1
      if (pageCards[0]) {
        drawCard(pageCards[0], startX, 12, cardWidth, cardHeight);
      }

      // Cut line in between
      doc.setDrawColor(180, 180, 180);
      doc.setLineDashPattern([3, 3], 0);
      doc.setLineWidth(0.4);
      doc.line(10, 147, 200, 147);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(150, 150, 150);
      doc.text(t.printCutHereCenterGuide, 105, 146, { align: 'center' });
      doc.setLineDashPattern([], 0); // Reset dash

      // Card 2
      if (pageCards[1]) {
        drawCard(pageCards[1], startX, 152, cardWidth, cardHeight);
      }
    } else {
      // 4 Cards per page (2x2 Grid)
      const cardWidth = 88;
      const cardHeight = 132;

      const col1X = 14;
      const col2X = 108;
      const row1Y = 12;
      const row2Y = 150;

      // Card 0: Top-Left
      if (pageCards[0]) drawCard(pageCards[0], col1X, row1Y, cardWidth, cardHeight);
      // Card 1: Top-Right
      if (pageCards[1]) drawCard(pageCards[1], col2X, row1Y, cardWidth, cardHeight);
      // Card 2: Bottom-Left
      if (pageCards[2]) drawCard(pageCards[2], col1X, row2Y, cardWidth, cardHeight);
      // Card 3: Bottom-Right
      if (pageCards[3]) drawCard(pageCards[3], col2X, row2Y, cardWidth, cardHeight);

      // Horizontal Cut line
      doc.setDrawColor(180, 180, 180);
      doc.setLineDashPattern([3, 3], 0);
      doc.setLineWidth(0.4);
      doc.line(10, 147, 200, 147);
      doc.text(t.printCutHorizontalGuide, 105, 146, { align: 'center' });

      // Vertical Cut line
      doc.line(105, 10, 105, 285);
      doc.setLineDashPattern([], 0);
    }
  }

  return doc;
}
