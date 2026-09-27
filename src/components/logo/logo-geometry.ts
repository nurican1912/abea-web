/**
 * ABEA logosunun geometrisi — tek kaynak.
 *
 * Orijinal logo piksel piksel ölçülüp yeniden kurgulandı
 * (bkz. _kaynak/eski-demo/README.md).
 *
 * Logo, merkezi (125, 197) olan eş merkezli dairelerden kuruludur. Her "şerit"
 * iki parçadır ve ikisi de aynı yönde çizilir — animasyon bu yolu izler:
 *   thin  : x = 143.7 ayrım hattının solundaki ince yay (6 birim)
 *   thick : hattın sağında, alttan dönüp yukarı çıkan kalın çubuk (13.5 birim)
 */
export const LOGO = {
  /** Sembol + kelime markası */
  viewBoxFull: '0 0 458 332',
  /** Yalnızca sembol, kenar boşluğu kırpılmış (topbar, favicon) */
  viewBoxMark: '2 5.5 241.5 315',
  width: 458,
  height: 332,
  mark: { x: 2, y: 5.5, width: 241.5, height: 315 },

  center: { x: 125, y: 197 },
  splitX: 143.7,
  dotR: 19,
  thinWidth: 6,
  thickWidth: 13.5,

  /** i = 0 en içteki şerit, 5 en dıştaki */
  ribbons: [
    { thin: 'M 143.70 168.60 A 34.00 34.00 0 1 0 143.70 225.40', thick: 'M 143.70 214.34 A 25.50 25.50 0 0 0 150.50 197.00 L 150.50 5.50' },
    { thin: 'M 143.70 149.34 A 51.20 51.20 0 1 0 143.70 244.66', thick: 'M 143.70 235.39 A 42.70 42.70 0 0 0 167.70 197.00 L 167.70 5.50' },
    { thin: 'M 143.70 131.21 A 68.40 68.40 0 1 0 143.70 262.79', thick: 'M 143.70 253.91 A 59.90 59.90 0 0 0 184.90 197.00 L 184.90 5.50' },
    { thin: 'M 143.70 113.47 A 85.60 85.60 0 1 0 143.70 280.53', thick: 'M 143.70 271.80 A 77.10 77.10 0 0 0 202.10 197.00 L 202.10 5.50' },
    { thin: 'M 143.70 95.92 A 102.80 102.80 0 1 0 143.70 298.08', thick: 'M 143.70 289.43 A 94.30 94.30 0 0 0 219.30 197.00 L 219.30 5.50' },
    { thin: 'M 143.70 78.47 A 120.00 120.00 0 1 0 143.70 315.53', thick: 'M 143.70 306.92 A 111.50 111.50 0 0 0 236.50 197.00 L 236.50 5.50' },
  ],

  /**
   * Dört satır da aynı genişliğe (192 birim) yaslanır. Puntolar Barlow Semi
   * Condensed 600 ile tarayıcıda ölçülüp yazıldı; logo JS'siz de (topbar,
   * footer) doğru görünür. Animasyonlu logoda fitWordmark() yine ölçüp düzeltir.
   */
  wordmark: {
    x: 265.5,
    width: 192,
    lines: [
      { text: 'Afet', y: 106.5, size: 115.8 },
      { text: 'Bilinci', y: 183.5, size: 81.98 },
      { text: 'Eğitim', y: 269.5, size: 77.17 },
      { text: 'Araştırma', y: 317.5, size: 49.03 },
    ],
  },
} as const;
