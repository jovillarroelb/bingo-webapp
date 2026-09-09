import { Language, GameMode } from '../types';

export interface Translations {
  // Brand & Header
  appTitle: string;
  appSubtitle: string;
  sessionActiveBadge: string;
  activeSessionBadge: string;
  instructionsBtn: string;
  claimBingoBtn: string;
  exitSessionBtnTitle: string;
  exitSessionBtn: string;
  enterKeyHint: string;
  spaceKeyHint: string;

  // Navigation Tabs
  tabWheel: string;
  tabScoreboard: string;
  tabPrint: string;
  tabDigital: string;

  // Landing Page
  landingBadge: string;
  landingTitle: string;
  landingSubtitle: string;
  landingStartBtn: string;
  landingNoAccountNote: string;
  landingFeature1Title: string;
  landingFeature1Desc: string;
  landingFeature2Title: string;
  landingFeature2Desc: string;
  landingFeature3Title: string;
  landingFeature3Desc: string;
  landingFeature4Title: string;
  landingFeature4Desc: string;
  landingFooterNote: string;

  // Game Modes
  modeFullCard: string;
  modeFullCardDesc: string;
  modeLineRow: string;
  modeLineRowDesc: string;
  modeLineCol: string;
  modeLineColDesc: string;
  modeSelectorLabel: string;

  // 3D Wheel & Tumbler
  wheelDrawBtn: string;
  wheelSpinning: string;
  wheelAllDrawn: string;
  wheelResetBtn: string;
  wheelSoundOn: string;
  wheelSoundOff: string;
  wheelTotalDrawn: string;
  wheelLastBall: string;
  wheelKeyboardHint: string;

  // Master Board
  masterBoardTitle: string;
  masterBoardSubtitle: string;
  masterBoardDrawnStat: string;
  masterBoardSearchPlaceholder: string;
  masterBoardDrawnBadge: string;
  masterBoardNotDrawnBadge: string;

  // Scoreboard
  scoreboardTitle: string;
  scoreboardSubtitle: string;
  scoreboardSessionResetBadge: string;
  scoreboardPodiumTitle: string;
  scoreboardHistoryTitle: string;
  scoreboardEmpty: string;
  scoreboardEmptyTitle: string;
  scoreboardEmptyDesc: string;
  scoreboardRecentTitle: string;
  scoreboardThPlayer: string;
  scoreboardThMode: string;
  scoreboardThBalls: string;
  scoreboardThDate: string;
  scoreboardThAction: string;
  scoreboardManualTitle: string;
  scoreboardManualSubtitle: string;
  scoreboardManualDesc: string;
  scoreboardManualPlaceholder: string;
  scoreboardManualSubmit: string;
  scoreboardSuccessNotice: string;
  scoreboardInputPlaceholder: string;
  scoreboardSelectMode: string;
  scoreboardManualBtn: string;
  scoreboardResetBtn: string;
  scoreboardClearBtn: string;
  scoreboardDeleteConfirm: string;
  scoreboardClearConfirm: string;
  scoreboardWinsCount: string;

  // Printable Cards
  printTitle: string;
  printSubtitle: string;
  printParticipantsTitle: string;
  printParticipantsDesc: string;
  participantsTitle: string;
  participantsDesc: string;
  addPlayerBtn: string;
  restoreDefaultPlayersBtn: string;
  cardsPerPlayerLabel: string;
  cardsPerSheetLabel: string;
  cardsPerPage2: string;
  cardsPerPage4: string;
  printStyleLabel: string;
  printStyleColor: string;
  printStyleBW: string;
  shuffleGridsLabel: string;
  shuffleGridsBtn: string;
  scissorsLineCut: string;
  freeSpaceLabel: string;
  cardCoverHint: string;
  cardFreeCenterHint: string;
  printAddParticipantPlaceholder: string;
  printAddParticipantBtn: string;
  printCardsPerParticipant: string;
  printLayoutNotice: string;
  printDownloadPdfBtn: string;
  printDirectPrintBtn: string;
  printDirectBtn: string;
  printPdfGenerating: string;
  printGeneratingPdf: string;
  printCutGuideNotice: string;
  printColorThemeLabel: string;
  printEmptyParticipantsWarning: string;

  // Digital Cards
  digitalTitle: string;
  digitalSubtitle: string;
  digitalChooseToken: string;
  verifyWinnerBtn: string;
  digitalSelectPlayer: string;
  digitalCardNumber: string;
  digitalResetMarks: string;
  digitalVerifyBtn: string;
  digitalMarkTip: string;

  // Bingo Claim Modal
  claimModalTitle: string;
  claimModalSubtitle: string;
  claimGameModeLabel: string;
  claimWinnerNameLabel: string;
  claimWinnerNamePlaceholder: string;
  claimQuickSelectLabel: string;
  claimVerifyBtn: string;
  claimValidWinTitle: string;
  claimCongrats: string;
  claimRegisteredNotice: string;
  claimMoreFireworksBtn: string;
  claimNotYetTitle: string;
  claimTryOtherPlayerBtn: string;
  claimCloseBtn: string;
  claimManualVerifyOkBtn: string;
  claimManualVerifyFailBtn: string;
  claimHostVerifyGuide: string;
  claimReviewingWinner: string;
  claimSearchHint: string;
  claimIncorrectTitle: string;
  claimIncorrectDesc: string;
  claimBackToEdit: string;
  claimContinueSpinningBtn: string;
  claimModalStep1: string;
  claimModalStep2: string;
  claimModalWinnerNameLabel: string;
  claimModalWinnerNamePlaceholder: string;
  claimModalSelectQuickChip: string;
  claimModalModeLabel: string;
  claimModalCardToVerifyLabel: string;
  claimModalValidBingo: string;
  claimModalNotBingoYet: string;
  claimModalMissingNumbers: string;
  claimModalRecordVictoryBtn: string;
  claimModalCloseBtn: string;
  claimModalSuccessSaved: string;

  // Reset & Exit Confirmation Modals
  resetModalTitle: string;
  resetModalDesc: string;
  resetModalCancel: string;
  resetModalConfirm: string;
  exitModalTitle: string;
  exitModalDesc: string;
  exitModalCancel: string;
  exitModalConfirm: string;

  // Instructions Modal
  instructionsModalTitle: string;
  instructionsModalSubtitle: string;
  instructionsShortcutsTitle: string;
  instructionsShortcutSpace: string;
  instructionsShortcutEnter: string;
  instructionsCloseBtn: string;
  instructionsModalClose: string;
  instructionsStep1Title: string;
  instructionsStep1Desc: string;
  instructionsStep2Title: string;
  instructionsStep2Desc: string;
  instructionsStep3Title: string;
  instructionsStep3Desc: string;
  instructionsStep4Title: string;
  instructionsStep4Desc: string;
  instructionsStep5Title: string;
  instructionsStep5Desc: string;

  // Tips Card
  tipsTitle: string;
  tipsTip1: string;
  tipsTip2: string;
  tipsTip3: string;
  tipsPrintBtn: string;
  tipsGoToPrintBtn: string;

  // Footer
  footerCopyright: string;
  footerRights: string;
  footerDevelopedWith: string;
  footerBy: string;
  footerMitLicense: string;
  footerCreatedUnder: string;
  footerGithubRepo: string;

  // Automatic Draw Mode
  autoModeStart: string;
  autoModePause: string;
  autoModeNextIn: string;
  autoModeSpeedLabel: string;

  // Wheel details
  wheelCageBadge: string;
  wheelRemainingBallsText: string;
  wheelBallNumberPrefix: string;
  wheelColumnPrefix: string;
  wheelRangeTo: string;
  wheelReadyToPlay: string;
  wheelStartHint: string;
  wheelRecentBalls: string;
  wheelNoBallsDrawn: string;

  // Master Board details
  masterBoardOrderDrawn: string;
  masterBoardNotYetDrawn: string;

  // Scoreboard details
  scoreboardPlayersCount: string;
  scoreboardModeRowShort: string;
  scoreboardModeColShort: string;
  scoreboardModeFullShort: string;
  scoreboardWinSingular: string;
  scoreboardWinPlural: string;
  scoreboardCompletedInBalls: string;
  scoreboardBallsWord: string;
  scoreboardDeleteRecordTooltip: string;
  scoreboardRecentTime: string;

  // Printable Cards details
  printPlayerPrefix: string;
  printRemovePlayerTitle: string;
  printEachSuffix: string;
  printCardSingular: string;
  printCardPlural: string;
  printTotalCardsSummary: string;
  printSheetsSummary: string;
  printColorStyleDesc: string;
  printBwStyleDesc: string;
  printShuffleGridsDesc: string;
  printSheetPageInfo: string;
  printCardNumberTitle: string;
  printPdfSuccessNotice: string;
  printPdfErrorNotice: string;
  printCutHereCenterGuide: string;
  printCutHorizontalGuide: string;
  printBeansCoverHint: string;
  printFreeCenterPdfHint: string;
  printPdfTopTitle: string;

  // Digital Cards details
  digitalNotDrawnWarning: string;
  digitalLineSingular: string;
  digitalLinePlural: string;

  // Bingo Claim Modal details
  claimDefaultChampionName: string;
  claimManualVerifiedDesc: string;
  claimStep1Subtitle: string;
  claimRecordedBadge: string;
  claimHostGuideText: string;
  claimHostCheckNumbersText: string;
  claimSearchDrawnBadge: string;
  claimSearchNotDrawnBadge: string;
  claimBallsDrawnOutOf: string;
  claimMatchesBoardQuestion: string;
  claimAchievedWithBalls: string;
  claimNoVictoryRecordedNotice: string;
  claimCheckAgainBtn: string;

  // Version
  versionLabel: string;
}

export const translations: Record<Language, Translations> = {
  es: {
    // Brand & Header
    appTitle: '¡Bingo Familiar!',
    appSubtitle: 'Ruleta 3D, verificación de Bingo con fiesta y cartones en PDF',
    sessionActiveBadge: 'Sesión Activa',
    activeSessionBadge: 'Sesión Activa',
    instructionsBtn: 'Instrucciones',
    claimBingoBtn: '¡Cantar Bingo!',
    exitSessionBtnTitle: 'Finalizar sesión y volver al inicio',
    exitSessionBtn: 'Finalizar sesión y volver al inicio',
    enterKeyHint: 'Enter ↵',
    spaceKeyHint: 'Espacio ␣',

    // Navigation Tabs
    tabWheel: 'Ruleta 3D y Bombo',
    tabScoreboard: 'Scoreboard',
    tabPrint: 'Imprimir Cartones',
    tabDigital: 'Digital',

    // Landing Page
    landingBadge: '¡Bienvenidos al Bingo Familiar!',
    landingTitle: '¡La mejor tarde de Bingo en Familia!',
    landingSubtitle:
      'Una experiencia interactiva con bombo 3D en tiempo real, cartones descargables en PDF listos para imprimir y recorte con tijera, verificación con fuegos artificiales y marcador para coronar a los campeones de cada partida.',
    landingStartBtn: 'INICIAR SESIÓN DE JUEGO',
    landingNoAccountNote: 'Sin contraseñas ni registros previos. Listo para proyectar o jugar en mesa.',
    landingFeature1Title: 'Bombo 3D Interactivo',
    landingFeature1Desc: 'Física y rotación con 75 bolitas numeradas que caen al azar con sonidos realistas.',
    landingFeature2Title: 'Cartones en PDF',
    landingFeature2Desc: 'Personaliza los nombres de tu familia o curso e imprime 2 o 4 cartones por hoja.',
    landingFeature3Title: 'Verificación Instantánea',
    landingFeature3Desc: 'Revisa cualquier cartón al cantar ¡Bingo! con explosión de confeti y fanfarria.',
    landingFeature4Title: 'Marcador por Sesión',
    landingFeature4Desc: 'Registra a los ganadores tecleando su nombre y corónalos en el podio de honor.',
    landingFooterNote: '¡A jugar y disfrutar en familia! 🎈 Comparte esta pantalla o proyéctala para toda la sala.',

    // Game Modes
    modeFullCard: 'Cartón Lleno',
    modeFullCardDesc: 'Completar los 24 números del cartón',
    modeLineRow: 'Línea Horizontal',
    modeLineRowDesc: 'Cualquier fila de 5 números',
    modeLineCol: 'Línea Vertical',
    modeLineColDesc: 'Cualquier columna de 5 números',
    modeSelectorLabel: 'Modalidad de Victoria:',

    // 3D Wheel & Tumbler
    wheelDrawBtn: '¡GIRAR Y SACAR BOLA!',
    wheelSpinning: 'GIRANDO BOMBO...',
    wheelAllDrawn: '¡TODAS LAS BOLAS EXTRAÍDAS!',
    wheelResetBtn: 'Reiniciar Bombo',
    wheelSoundOn: 'Sonido Activado',
    wheelSoundOff: 'Sonido Silenciado',
    wheelTotalDrawn: 'Bolas extraídas',
    wheelLastBall: 'Última bola',
    wheelKeyboardHint: 'Presiona la barra espaciadora para girar',

    // Master Board
    masterBoardTitle: 'Tablero Maestro de Control (1 a 75)',
    masterBoardSubtitle: 'Revisa de un vistazo todos los números que ya han salido del bombo',
    masterBoardDrawnStat: 'Extraídas',
    masterBoardSearchPlaceholder: '¿Salió el número...?',
    masterBoardDrawnBadge: '¡Ya salió!',
    masterBoardNotDrawnBadge: 'Aún en el bombo',

    // Scoreboard
    scoreboardTitle: 'Scoreboard de la Sesión Actual',
    scoreboardSubtitle: 'Teclea el nombre de quien gane para registrar su victoria. Cada nueva sesión inicia fresca.',
    scoreboardSessionResetBadge: 'Sesión Activa',
    scoreboardPodiumTitle: 'Podio de la Sesión',
    scoreboardHistoryTitle: 'Victorias Anotadas en esta Sesión',
    scoreboardEmpty: '¡Esta sesión aún no tiene campeones registrados!',
    scoreboardEmptyTitle: '¡Esta sesión aún no tiene campeones registrados!',
    scoreboardEmptyDesc: 'Puedes teclear el nombre del ganador en la casilla de arriba, o usar el botón grande "¡Cantar Bingo!" (o pulsar la tecla Enter) para verificar el cartón y registrarlo con fuegos artificiales.',
    scoreboardRecentTitle: 'Victorias Anotadas en esta Sesión',
    scoreboardThPlayer: 'Jugador',
    scoreboardThMode: 'Modalidad',
    scoreboardThBalls: 'Bolas Usadas',
    scoreboardThDate: 'Hora',
    scoreboardThAction: 'Acción',
    scoreboardManualTitle: 'Teclear Nombre del Ganador / Campeón',
    scoreboardManualSubtitle: 'Escribe el nombre y pulsa "Registrar":',
    scoreboardManualDesc: 'Escribe el nombre y pulsa "Registrar"',
    scoreboardManualPlaceholder: 'Teclea el nombre aquí (ej: Lucas, Familia Gómez, Sofi...)',
    scoreboardManualSubmit: 'Registrar Victoria',
    scoreboardSuccessNotice: '¡Victoria registrada con éxito en el Scoreboard de la sesión!',
    scoreboardInputPlaceholder: 'Nombre del ganador (ej: Sofía, Papá, Martín)...',
    scoreboardSelectMode: 'Modalidad ganada',
    scoreboardManualBtn: 'Registrar Victoria',
    scoreboardResetBtn: 'Resetear Sesión',
    scoreboardClearBtn: 'Limpiar Marcador',
    scoreboardDeleteConfirm: '¿Eliminar este registro?',
    scoreboardClearConfirm: '¿Deseas reiniciar el marcador de esta sesión?',
    scoreboardWinsCount: 'victorias',

    // Printable Cards
    printTitle: 'Generador de Cartones PDF e Imprimibles',
    printSubtitle: 'Configura cuántos cartones recibe cada niño, descarga tu archivo PDF listo para imprimir en alta calidad o imprime directo.',
    printParticipantsTitle: 'Nombres de los Participantes (Guardados de la última sesión):',
    printParticipantsDesc: 'Los cambios se guardan automáticamente en este navegador para futuras partidas.',
    participantsTitle: 'Nombres de los Participantes (Guardados de la última sesión)',
    participantsDesc: 'Los cambios se guardan automáticamente en este navegador para futuras partidas.',
    addPlayerBtn: 'Añadir Jugador',
    restoreDefaultPlayersBtn: 'Restaurar',
    cardsPerPlayerLabel: 'Cartones por jugador',
    cardsPerSheetLabel: 'Cartones por hoja',
    cardsPerPage2: '2 (Grandes)',
    cardsPerPage4: '4 (Estándar)',
    printStyleLabel: 'Estilo de impresión',
    printStyleColor: '🎨 Todo Color',
    printStyleBW: 'Ahorro Tinta',
    shuffleGridsLabel: 'Nuevos números',
    shuffleGridsBtn: 'Revolver cuadrículas',
    scissorsLineCut: 'Líneas de corte para recortar con tijera',
    freeSpaceLabel: 'GRATIS',
    cardCoverHint: '🌽 Tapa tus números con porotos o fichas',
    cardFreeCenterHint: '⭐ Centro gratis',
    printAddParticipantPlaceholder: 'Nuevo nombre (ej: Vicente, Mamá)...',
    printAddParticipantBtn: 'Agregar',
    printCardsPerParticipant: 'Cartones por participante',
    printLayoutNotice: 'Hojas optimizadas para tamaño Carta / A4 con líneas de recorte.',
    printDownloadPdfBtn: 'DESCARGAR PDF DE CARTONES',
    printDirectPrintBtn: 'Imprimir directo',
    printDirectBtn: 'Imprimir directo',
    printPdfGenerating: 'Generando PDF...',
    printGeneratingPdf: 'Generando PDF...',
    printCutGuideNotice: 'Corta por la línea punteada ✂️ y reparte porotos, botones o tapitas para marcar.',
    printColorThemeLabel: 'Paleta de Color:',
    printEmptyParticipantsWarning: 'Agrega al menos un participante para generar los cartones.',

    // Digital Cards
    digitalTitle: 'Modo Cartón Digital en Pantalla',
    digitalSubtitle: 'Toca los números para ponerles una estampita cuando salgan en la ruleta',
    digitalChooseToken: 'Elige tu ficha',
    verifyWinnerBtn: 'Verificar',
    digitalSelectPlayer: 'Ver cartón de:',
    digitalCardNumber: 'Cartón',
    digitalResetMarks: 'Limpiar fichas',
    digitalVerifyBtn: 'Verificar si gané',
    digitalMarkTip: 'Toca o haz clic sobre cada número que vaya saliendo en el bombo.',

    // Bingo Claim Modal
    claimModalTitle: '¡Cantar Bingo!',
    claimModalSubtitle: 'Teclea el nombre de quien cantó Bingo y verificaremos su cartón al instante',
    claimGameModeLabel: 'Modalidad de Juego a comprobar:',
    claimWinnerNameLabel: 'Teclea el nombre de quien cantó Bingo:',
    claimWinnerNamePlaceholder: 'Teclea el nombre aquí (ej: Lucas, Familia Muñoz, Mamá...)',
    claimQuickSelectLabel: 'O selecciona rápido de los cartones:',
    claimVerifyBtn: '¡VERIFICAR SI ES BINGO!',
    claimValidWinTitle: '¡¡SÍIII, ES BINGO VÁLIDO!! 🏆',
    claimCongrats: '¡Felicidades,',
    claimRegisteredNotice: '¡Registrado en el Scoreboard de la sesión con el nombre tecleado!',
    claimMoreFireworksBtn: '¡Lanzar más fuegos artificiales!',
    claimNotYetTitle: '¡Aún no es Bingo! Falta un poquito',
    claimTryOtherPlayerBtn: 'Probar con otro jugador',
    claimCloseBtn: 'Cerrar y seguir jugando',
    claimManualVerifyOkBtn: '¡ESTÁ OK! (VERDE) - BINGO VÁLIDO',
    claimManualVerifyFailBtn: 'ESTÁ MAL (ROJO) - NO ES BINGO',
    claimHostVerifyGuide: 'El encargado de la ruleta revisa los números en el Tablero Maestro:',
    claimReviewingWinner: 'Comprobando Bingo de',
    claimSearchHint: '¿Salió el número...?',
    claimIncorrectTitle: '¡Bingo Incorrecto / No válido!',
    claimIncorrectDesc: 'Faltaban números por salir o hubo una equivocación al cantar. ¡Pueden seguir girando el bombo!',
    claimBackToEdit: 'Cambiar nombre o modalidad',
    claimContinueSpinningBtn: 'Seguir girando el bombo',
    claimModalStep1: '1. Identificar al Ganador',
    claimModalStep2: '2. Verificación de Números',
    claimModalWinnerNameLabel: 'Nombre del Ganador (teclea o elige):',
    claimModalWinnerNamePlaceholder: 'Escribe el nombre del ganador...',
    claimModalSelectQuickChip: 'O selecciona participante:',
    claimModalModeLabel: 'Modalidad cantada:',
    claimModalCardToVerifyLabel: 'Cartón a revisar:',
    claimModalValidBingo: '¡BINGO VÁLIDO! ¡FELICIDADES AL CAMPEÓN!',
    claimModalNotBingoYet: '¡Aún falta para completar el Bingo!',
    claimModalMissingNumbers: 'Números que faltan por salir:',
    claimModalRecordVictoryBtn: '🏆 Registrar Victoria en el Scoreboard',
    claimModalCloseBtn: 'Cerrar',
    claimModalSuccessSaved: '¡Victoria registrada con éxito!',

    // Reset & Exit Confirmation Modals
    resetModalTitle: '¿Reiniciar la partida?',
    resetModalDesc: 'Se devolverán todas las bolitas extraídas al bombo 3D para empezar un nuevo juego desde cero.',
    resetModalCancel: 'Cancelar',
    resetModalConfirm: 'Sí, reiniciar',
    exitModalTitle: '¿Volver a la Pantalla Principal?',
    exitModalDesc: 'Podrás iniciar una nueva sesión cuando quieras. Cada nueva sesión comienza con su propio marcador limpio.',
    exitModalCancel: 'Seguir Jugando',
    exitModalConfirm: 'Salir al Inicio',

    // Instructions Modal
    instructionsModalTitle: 'Guía e Instrucciones del Bingo Familiar',
    instructionsModalSubtitle: 'Todo lo que necesitas saber para organizar una partida entre familias y apoderados',
    instructionsShortcutsTitle: 'Atajos de Teclado Rápidos',
    instructionsShortcutSpace: '¡Girar el bombo y sacar bola!',
    instructionsShortcutEnter: '¡Cantar Bingo y verificar!',
    instructionsCloseBtn: '¡Entendido, vamos a jugar!',
    instructionsModalClose: 'Entendido, ¡a jugar!',
    instructionsStep1Title: 'Generar e Imprimir los Cartones en PDF',
    instructionsStep1Desc:
      'Dirígete a la pestaña "Imprimir Cartones". Puedes ingresar los nombres de los participantes (se guardan automáticamente), elegir cuántos cartones recibe cada persona (1 a 4 cartones), y presionar el botón "DESCARGAR PDF DE CARTONES". El PDF viene optimizado en alta definición con líneas de corte para tijera.',
    instructionsStep2Title: 'Girar el Bombo 3D y Cantar Bolitas',
    instructionsStep2Desc:
      'Presiona el botón "¡GIRAR Y SACAR BOLA!" o pulsa la tecla Espacio. La ruleta 3D girará y extraerá una de las 75 bolitas con su letra B-I-N-G-O y su simpático apodo infantil (ej: "B-7 El Cohete"). También puedes activar el Modo Automático con temporizador para jugar sin tocar la pantalla.',
    instructionsStep3Title: 'Seleccionar la Modalidad de Juego',
    instructionsStep3Desc:
      'Antes de jugar, acuerden la modalidad: Fila Horizontal (5 números seguidos de izquierda a derecha), Columna Vertical (5 en columna) o Todo el Cartón (las 25 casillas para el gran premio).',
    instructionsStep4Title: '¡Cantar Bingo! y Comprobación con Fiesta',
    instructionsStep4Desc:
      'Cuando alguien complete su cartón, pulsa el botón grande "¡Cantar Bingo!" o la tecla Enter. Se abrirá la ventana de verificación donde podrás teclear el nombre del ganador (o seleccionarlo con un clic). Si el Bingo es correcto, la aplicación activará fuegos artificiales reales en pantalla y fanfarria.',
    instructionsStep5Title: 'Scoreboard y Registro de la Sesión',
    instructionsStep5Desc:
      'Al verificar un triunfo o teclear el nombre en el Scoreboard, la victoria queda anotada en el podio de campeones de la partida. Cada sesión resetea una sesión, garantizando que cada encuentro comience desde cero para una competencia limpia y emocionante.',

    // Tips Card
    tipsTitle: 'Consejos para jugar en familia y con apoderados',
    tipsTip1: 'Imprime los cartones en la pestaña "Imprimir Cartones" con recorte para tijera y reparte por participante.',
    tipsTip2: 'Gira el bombo presionando la Barra Espaciadora y canta Bingo pulsando la tecla Enter.',
    tipsTip3: 'Al cantar Bingo, teclea el nombre del ganador para registrarlo en el podio del Scoreboard de la sesión.',
    tipsPrintBtn: 'Ir a Imprimir Cartones',
    tipsGoToPrintBtn: 'Ir a Imprimir Cartones',

    // Footer
    footerCopyright: 'Bingo Familiar',
    footerRights: 'Todos los derechos reservados.',
    footerDevelopedWith: 'Desarrollado con',
    footerBy: 'por',
    footerMitLicense: 'Licencia MIT',
    footerCreatedUnder: 'Creado bajo',
    footerGithubRepo: 'Repositorio en GitHub',

    // Automatic Draw Mode
    autoModeStart: 'Modo Automático',
    autoModePause: 'Pausar automático',
    autoModeNextIn: 'Siguiente en',
    autoModeSpeedLabel: 'Pausa entre bolas:',

    // Wheel details
    wheelCageBadge: 'Bombo 3D Three.js',
    wheelRemainingBallsText: 'Quedan {0} de 75 bolas',
    wheelBallNumberPrefix: 'Bola #',
    wheelColumnPrefix: 'Columna',
    wheelRangeTo: 'a',
    wheelReadyToPlay: '¡Listo para jugar!',
    wheelStartHint: 'Pulsa "¡GIRAR Y SACAR BOLA!" o pulsa la tecla Espacio para comenzar la partida familiar.',
    wheelRecentBalls: 'Últimas 5 bolitas:',
    wheelNoBallsDrawn: 'Aún no hay bolitas cantadas',

    // Master Board details
    masterBoardOrderDrawn: 'Extraída en orden #',
    masterBoardNotYetDrawn: 'No extraída',

    // Scoreboard details
    scoreboardPlayersCount: 'jugadores',
    scoreboardModeRowShort: 'Fila',
    scoreboardModeColShort: 'Col',
    scoreboardModeFullShort: 'Todo',
    scoreboardWinSingular: 'Victoria',
    scoreboardWinPlural: 'Victorias',
    scoreboardCompletedInBalls: 'Completó en',
    scoreboardBallsWord: 'bolas',
    scoreboardDeleteRecordTooltip: 'Eliminar este registro',
    scoreboardRecentTime: 'Reciente',

    // Printable Cards details
    printPlayerPrefix: 'Jugador',
    printRemovePlayerTitle: 'Eliminar jugador',
    printEachSuffix: 'c/u',
    printCardSingular: 'cartón',
    printCardPlural: 'cartones',
    printTotalCardsSummary: 'Total: {0} cartones ({1} jugadores × {2})',
    printSheetsSummary: 'Genera {0} hojas en el PDF',
    printColorStyleDesc: 'Bordes e insignias alegres',
    printBwStyleDesc: 'Escala de grises económica',
    printShuffleGridsDesc: 'Genera nuevas combinaciones aleatorias',
    printSheetPageInfo: 'Página {0} de {1} ({2} cartones por hoja)',
    printCardNumberTitle: 'Cartón #{0} • ¡Bingo Familiar!',
    printPdfSuccessNotice: '¡PDF generado con éxito! Archivo:',
    printPdfErrorNotice: 'Hubo un problema generando el archivo PDF de los cartones.',
    printCutHereCenterGuide: '-- Cortar con tijera aquí --',
    printCutHorizontalGuide: '-- Cortar horizontal --',
    printBeansCoverHint: 'Tapa tus números con porotos o lentejas',
    printFreeCenterPdfHint: '* Centro gratis',
    printPdfTopTitle: 'Bingo Familiar - Página {0} de {1}',

    // Digital Cards details
    digitalNotDrawnWarning: '¡El número {0} aún no sale del bombo!',
    digitalLineSingular: 'Línea',
    digitalLinePlural: 'Líneas',

    // Bingo Claim Modal details
    claimDefaultChampionName: 'Campeón',
    claimManualVerifiedDesc: 'Victoria manual verificada',
    claimStep1Subtitle: 'Teclea el nombre de quien cantó Bingo para verificar los números en el Tablero Maestro.',
    claimRecordedBadge: 'Quedará en el Scoreboard',
    claimHostGuideText: 'El encargado de la ruleta revisará con el Tablero Maestro los números cantados.',
    claimHostCheckNumbersText: 'Pídele al jugador que cante sus números y comprueba que estén encendidos con color.',
    claimSearchDrawnBadge: '¡SALIÓ!',
    claimSearchNotDrawnBadge: 'NO HA SALIDO',
    claimBallsDrawnOutOf: 'bolas cantadas',
    claimMatchesBoardQuestion: '¿Los números cantados por el jugador coinciden con el tablero?',
    claimAchievedWithBalls: 'Logrado con {0} bolas cantadas del bombo',
    claimNoVictoryRecordedNotice: 'No se registró victoria en el Scoreboard. Pueden seguir jugando normalmente.',
    claimCheckAgainBtn: 'Volver a revisar',

    // Version
    versionLabel: 'Versión',
  },

  en: {
    // Brand & Header
    appTitle: 'Family Bingo!',
    appSubtitle: '3D interactive tumbler, fireworks bingo verification & printable PDF cards',
    sessionActiveBadge: 'Active Session',
    activeSessionBadge: 'Active Session',
    instructionsBtn: 'Instructions',
    claimBingoBtn: 'Call Bingo!',
    exitSessionBtnTitle: 'End session and return to home',
    exitSessionBtn: 'End session and return to home',
    enterKeyHint: 'Enter ↵',
    spaceKeyHint: 'Space ␣',

    // Navigation Tabs
    tabWheel: '3D Tumbler & Cage',
    tabScoreboard: 'Scoreboard',
    tabPrint: 'Print Cards',
    tabDigital: 'Digital',

    // Landing Page
    landingBadge: 'Welcome to Family Bingo!',
    landingTitle: 'The Ultimate Family Bingo Afternoon!',
    landingSubtitle:
      'An interactive real-time 3D cage tumbler, printable PDF cards ready for scissor trimming, celebration fireworks bingo verification, and a session scoreboard to crown each round’s champions.',
    landingStartBtn: 'START GAME SESSION',
    landingNoAccountNote: 'No sign-up or passwords required. Ready to project or play on your tabletop.',
    landingFeature1Title: 'Interactive 3D Tumbler',
    landingFeature1Desc: 'Physical rotation with 75 numbered balls drawn at random with realistic sound effects.',
    landingFeature2Title: 'Printable PDF Cards',
    landingFeature2Desc: 'Personalize names for your family or classroom and print 2 or 4 cards per page.',
    landingFeature3Title: 'Instant Verification',
    landingFeature3Desc: 'Check any card when someone calls Bingo! with celebratory confetti and victory fanfare.',
    landingFeature4Title: 'Session Scoreboard',
    landingFeature4Desc: 'Record winners by typing their name and honor them on the champion podium.',
    landingFooterNote: 'Play and enjoy together! 🎈 Share this screen or project it for the whole room.',

    // Game Modes
    modeFullCard: 'Full Card',
    modeFullCardDesc: 'Complete all 24 numbers on the card',
    modeLineRow: 'Horizontal Line',
    modeLineRowDesc: 'Any horizontal row of 5 numbers',
    modeLineCol: 'Vertical Column',
    modeLineColDesc: 'Any vertical column of 5 numbers',
    modeSelectorLabel: 'Winning Mode:',

    // 3D Wheel & Tumbler
    wheelDrawBtn: 'SPIN & DRAW BALL!',
    wheelSpinning: 'SPINNING CAGE...',
    wheelAllDrawn: 'ALL BALLS HAVE BEEN DRAWN!',
    wheelResetBtn: 'Reset Tumbler',
    wheelSoundOn: 'Sound Enabled',
    wheelSoundOff: 'Sound Muted',
    wheelTotalDrawn: 'Drawn balls',
    wheelLastBall: 'Last ball',
    wheelKeyboardHint: 'Press Spacebar on your keyboard to spin',

    // Master Board
    masterBoardTitle: 'Master Control Board (1 to 75)',
    masterBoardSubtitle: 'Check at a glance all numbers drawn from the cage',
    masterBoardDrawnStat: 'Drawn',
    masterBoardSearchPlaceholder: 'Was number drawn...?',
    masterBoardDrawnBadge: 'Already drawn!',
    masterBoardNotDrawnBadge: 'Still in cage',

    // Scoreboard
    scoreboardTitle: 'Current Session Scoreboard',
    scoreboardSubtitle: 'Type the winner’s name to record their victory. Each new session starts clean.',
    scoreboardSessionResetBadge: 'Active Session',
    scoreboardPodiumTitle: 'Session Podium',
    scoreboardHistoryTitle: 'Victories Logged in this Session',
    scoreboardEmpty: 'No champions registered in this session yet!',
    scoreboardEmptyTitle: 'No champions registered in this session yet!',
    scoreboardEmptyDesc: 'You can type the winner’s name in the box above, or click the large "Call Bingo!" button (or press Enter) to verify the card and celebrate with fireworks.',
    scoreboardRecentTitle: 'Victories Logged in this Session',
    scoreboardThPlayer: 'Player',
    scoreboardThMode: 'Game Mode',
    scoreboardThBalls: 'Balls Drawn',
    scoreboardThDate: 'Time',
    scoreboardThAction: 'Action',
    scoreboardManualTitle: 'Type Winner / Champion Name',
    scoreboardManualSubtitle: 'Type name and click "Record Victory":',
    scoreboardManualDesc: 'Type name and click "Record Victory"',
    scoreboardManualPlaceholder: 'Type name here (e.g. Lucas, Gomez Family, Sophie...)',
    scoreboardManualSubmit: 'Record Victory',
    scoreboardSuccessNotice: 'Victory recorded successfully in session Scoreboard!',
    scoreboardInputPlaceholder: 'Winner’s name (e.g. Sophie, Dad, Oliver)...',
    scoreboardSelectMode: 'Winning mode',
    scoreboardManualBtn: 'Record Victory',
    scoreboardResetBtn: 'Reset Session',
    scoreboardClearBtn: 'Clear Scoreboard',
    scoreboardDeleteConfirm: 'Delete this record?',
    scoreboardClearConfirm: 'Do you want to reset the scoreboard for this session?',
    scoreboardWinsCount: 'wins',

    // Printable Cards
    printTitle: 'Printable PDF Card Generator',
    printSubtitle: 'Configure cards per child, download high-definition print-ready PDF files or print directly.',
    printParticipantsTitle: 'Participant Names (Saved from last session):',
    printParticipantsDesc: 'Changes are automatically saved in this browser for future game days.',
    participantsTitle: 'Participant Names (Saved from last session)',
    participantsDesc: 'Changes are automatically saved in this browser for future game days.',
    addPlayerBtn: 'Add Player',
    restoreDefaultPlayersBtn: 'Restore',
    cardsPerPlayerLabel: 'Cards per player',
    cardsPerSheetLabel: 'Cards per sheet',
    cardsPerPage2: '2 (Large)',
    cardsPerPage4: '4 (Standard)',
    printStyleLabel: 'Print style',
    printStyleColor: '🎨 Full Color',
    printStyleBW: 'Ink Saver',
    shuffleGridsLabel: 'New numbers',
    shuffleGridsBtn: 'Shuffle grids',
    scissorsLineCut: 'Scissor cutting guide lines',
    freeSpaceLabel: 'FREE',
    cardCoverHint: '🌽 Cover numbers with beans or tokens',
    cardFreeCenterHint: '⭐ Free center',
    printAddParticipantPlaceholder: 'New name (e.g. Vincent, Mom)...',
    printAddParticipantBtn: 'Add',
    printCardsPerParticipant: 'Cards per participant',
    printLayoutNotice: 'Optimized sheets for Letter / A4 paper with dashed cut lines.',
    printDownloadPdfBtn: 'DOWNLOAD PDF CARDS',
    printDirectPrintBtn: 'Print directly',
    printDirectBtn: 'Print directly',
    printPdfGenerating: 'Generating PDF...',
    printGeneratingPdf: 'Generating PDF...',
    printCutGuideNotice: 'Cut along the dashed lines ✂️ and hand out beans, buttons or tokens to mark numbers.',
    printColorThemeLabel: 'Color Palette:',
    printEmptyParticipantsWarning: 'Add at least one participant to generate cards.',

    // Digital Cards
    digitalTitle: 'Digital On-Screen Cards',
    digitalSubtitle: 'Tap numbers to place a sticker when they are drawn from the cage',
    digitalChooseToken: 'Choose token',
    verifyWinnerBtn: 'Verify',
    digitalSelectPlayer: 'View card for:',
    digitalCardNumber: 'Card',
    digitalResetMarks: 'Clear tokens',
    digitalVerifyBtn: 'Check if I won',
    digitalMarkTip: 'Tap or click on each number that gets drawn from the tumbler.',

    // Bingo Claim Modal
    claimModalTitle: 'Call Bingo!',
    claimModalSubtitle: 'Type the winner’s name and we will verify their card immediately',
    claimGameModeLabel: 'Game Mode to verify:',
    claimWinnerNameLabel: 'Type the name of who called Bingo:',
    claimWinnerNamePlaceholder: 'Type name here (e.g. Lucas, Munoz Family, Mom...)',
    claimQuickSelectLabel: 'Or quick-select from cards:',
    claimVerifyBtn: 'CHECK IF IT IS BINGO!',
    claimValidWinTitle: 'YESSSS, VALID BINGO!! 🏆',
    claimCongrats: 'Congratulations,',
    claimRegisteredNotice: 'Recorded on the session Scoreboard with typed name!',
    claimMoreFireworksBtn: 'Launch more fireworks!',
    claimNotYetTitle: 'Not quite Bingo yet! Just a little more',
    claimTryOtherPlayerBtn: 'Try with another player',
    claimCloseBtn: 'Close & keep playing',
    claimManualVerifyOkBtn: 'IT IS OK! (GREEN) - VALID BINGO',
    claimManualVerifyFailBtn: 'INCORRECT (RED) - NOT BINGO',
    claimHostVerifyGuide: 'The cage host verifies called numbers against the Master Board:',
    claimReviewingWinner: 'Checking Bingo for',
    claimSearchHint: 'Was number drawn...?',
    claimIncorrectTitle: 'Incorrect Bingo / Not Valid!',
    claimIncorrectDesc: 'Some numbers have not been drawn yet or there was a mistake. You can keep spinning the tumbler!',
    claimBackToEdit: 'Change name or game mode',
    claimContinueSpinningBtn: 'Keep spinning cage',
    claimModalStep1: '1. Identify the Winner',
    claimModalStep2: '2. Verify Numbers',
    claimModalWinnerNameLabel: 'Winner’s Name (type or select):',
    claimModalWinnerNamePlaceholder: 'Type winner’s name...',
    claimModalSelectQuickChip: 'Or select participant:',
    claimModalModeLabel: 'Called mode:',
    claimModalCardToVerifyLabel: 'Card to verify:',
    claimModalValidBingo: 'VALID BINGO! CONGRATULATIONS TO THE CHAMPION!',
    claimModalNotBingoYet: 'Not a complete Bingo yet!',
    claimModalMissingNumbers: 'Numbers still needed to win:',
    claimModalRecordVictoryBtn: '🏆 Record Victory on Scoreboard',
    claimModalCloseBtn: 'Close',
    claimModalSuccessSaved: 'Victory successfully recorded!',

    // Reset & Exit Confirmation Modals
    resetModalTitle: 'Reset game round?',
    resetModalDesc: 'All drawn balls will be returned to the 3D tumbler to start a brand new game from scratch.',
    resetModalCancel: 'Cancel',
    resetModalConfirm: 'Yes, reset',
    exitModalTitle: 'Return to Home Screen?',
    exitModalDesc: 'You can start a new session whenever you wish. Each new session starts with a clean scoreboard.',
    exitModalCancel: 'Keep Playing',
    exitModalConfirm: 'Exit to Home',

    // Instructions Modal
    instructionsModalTitle: 'Family Bingo Guide & Instructions',
    instructionsModalSubtitle: 'Everything you need to know to host a game with family and friends',
    instructionsShortcutsTitle: 'Quick Keyboard Shortcuts',
    instructionsShortcutSpace: 'Spin cage and draw ball!',
    instructionsShortcutEnter: 'Call Bingo and verify!',
    instructionsCloseBtn: 'Understood, let’s play!',
    instructionsModalClose: 'Got it, let’s play!',
    instructionsStep1Title: 'Generate & Print PDF Cards',
    instructionsStep1Desc:
      'Go to the "Print Cards" tab. You can enter participant names (saved automatically), choose how many cards each person gets (1 to 4 cards), and click "DOWNLOAD PDF CARDS". The PDF comes optimized in high definition with scissor cutting lines.',
    instructionsStep2Title: 'Spin the 3D Cage & Call Numbers',
    instructionsStep2Desc:
      'Click "SPIN & DRAW BALL!" or press the Spacebar. The 3D cage will spin and extract one of the 75 balls with its B-I-N-G-O letter and cute children’s nickname (e.g. "B-7 The Rocket"). You can also activate Auto Mode with a timer to play hands-free.',
    instructionsStep3Title: 'Select Winning Game Mode',
    instructionsStep3Desc:
      'Before playing, agree on the winning rule: Horizontal Line (5 consecutive numbers left to right), Vertical Column (5 top to bottom), or Full Card (all 25 tiles for the grand prize).',
    instructionsStep4Title: 'Call Bingo & Verify with Celebration',
    instructionsStep4Desc:
      'When someone completes their card, click the large "Call Bingo!" button or press Enter. The verification modal will open where you can type the winner’s name (or select it with a click). If valid, real fireworks and fanfare will erupt on screen.',
    instructionsStep5Title: 'Session Scoreboard & Records',
    instructionsStep5Desc:
      'When verifying a win or typing the name in the Scoreboard, the victory is recorded on the session podium. Starting a new session resets the board, keeping every encounter fair, clean, and exciting.',

    // Tips Card
    tipsTitle: 'Tips for playing with family and friends',
    tipsTip1: 'Print cards in the "Print Cards" tab with scissor cutting guides and hand them out.',
    tipsTip2: 'Spin the tumbler using the Spacebar and call Bingo using the Enter key.',
    tipsTip3: 'When calling Bingo, type the winner’s name to record them on the session Scoreboard podium.',
    tipsPrintBtn: 'Go to Print Cards',
    tipsGoToPrintBtn: 'Go to Print Cards',

    // Footer
    footerCopyright: 'Family Bingo',
    footerRights: 'All rights reserved.',
    footerDevelopedWith: 'Developed with',
    footerBy: 'by',
    footerMitLicense: 'MIT License',
    footerCreatedUnder: 'Released under',
    footerGithubRepo: 'GitHub Repository',

    // Automatic Draw Mode
    autoModeStart: 'Auto Draw',
    autoModePause: 'Pause Auto',
    autoModeNextIn: 'Next in',
    autoModeSpeedLabel: 'Pause between balls:',

    // Wheel details
    wheelCageBadge: '3D Three.js Cage',
    wheelRemainingBallsText: '{0} of 75 balls left',
    wheelBallNumberPrefix: 'Ball #',
    wheelColumnPrefix: 'Column',
    wheelRangeTo: 'to',
    wheelReadyToPlay: 'Ready to play!',
    wheelStartHint: 'Click "SPIN & DRAW BALL!" or press the Spacebar to start the game.',
    wheelRecentBalls: 'Last 5 balls drawn:',
    wheelNoBallsDrawn: 'No balls drawn yet',

    // Master Board details
    masterBoardOrderDrawn: 'Drawn order #',
    masterBoardNotYetDrawn: 'Not drawn yet',

    // Scoreboard details
    scoreboardPlayersCount: 'players',
    scoreboardModeRowShort: 'Row',
    scoreboardModeColShort: 'Col',
    scoreboardModeFullShort: 'Full',
    scoreboardWinSingular: 'Win',
    scoreboardWinPlural: 'Wins',
    scoreboardCompletedInBalls: 'Completed in',
    scoreboardBallsWord: 'balls',
    scoreboardDeleteRecordTooltip: 'Delete record',
    scoreboardRecentTime: 'Recent',

    // Printable Cards details
    printPlayerPrefix: 'Player',
    printRemovePlayerTitle: 'Remove player',
    printEachSuffix: 'ea.',
    printCardSingular: 'card',
    printCardPlural: 'cards',
    printTotalCardsSummary: 'Total: {0} cards ({1} players × {2})',
    printSheetsSummary: 'Generates {0} sheets in PDF',
    printColorStyleDesc: 'Vibrant colors & badges',
    printBwStyleDesc: 'Budget grayscale',
    printShuffleGridsDesc: 'Generate new random layouts',
    printSheetPageInfo: 'Page {0} of {1} ({2} cards per sheet)',
    printCardNumberTitle: 'Card #{0} • Family Bingo!',
    printPdfSuccessNotice: 'PDF generated successfully! File:',
    printPdfErrorNotice: 'There was a problem generating the PDF bingo cards.',
    printCutHereCenterGuide: '-- Cut with scissors here --',
    printCutHorizontalGuide: '-- Cut horizontal --',
    printBeansCoverHint: 'Cover numbers with beans or tokens',
    printFreeCenterPdfHint: '* Free center',
    printPdfTopTitle: 'Family Bingo - Page {0} of {1}',

    // Digital Cards details
    digitalNotDrawnWarning: 'Number {0} has not been drawn yet!',
    digitalLineSingular: 'Line',
    digitalLinePlural: 'Lines',

    // Bingo Claim Modal details
    claimDefaultChampionName: 'Champion',
    claimManualVerifiedDesc: 'Manual verified victory',
    claimStep1Subtitle: 'Type the winner’s name to check their called numbers on the Master Board.',
    claimRecordedBadge: 'Recorded on Scoreboard',
    claimHostGuideText: 'The cage host will check the called numbers against the Master Board.',
    claimHostCheckNumbersText: 'Ask the player to call out their numbers and verify that they are lit up in color.',
    claimSearchDrawnBadge: 'DRAWN!',
    claimSearchNotDrawnBadge: 'NOT DRAWN',
    claimBallsDrawnOutOf: 'balls drawn',
    claimMatchesBoardQuestion: 'Do the numbers called out by the player match the board?',
    claimAchievedWithBalls: 'Achieved with {0} balls drawn from cage',
    claimNoVictoryRecordedNotice: 'No victory recorded on Scoreboard. You can resume regular play.',
    claimCheckAgainBtn: 'Check again',

    // Version
    versionLabel: 'Version',
  },
  it: {
    // Brand & Header
    appTitle: '¡Bingo e Tombola di Famiglia!',
    appSubtitle: 'Gabbia 3D, verifica del Bingo con festa e cartelle in PDF',
    sessionActiveBadge: 'Sessione Attiva',
    activeSessionBadge: 'Sessione Attiva',
    instructionsBtn: 'Istruzioni',
    claimBingoBtn: '¡Dichiara Bingo!',
    exitSessionBtnTitle: 'Termina sessione e torna all’inizio',
    exitSessionBtn: 'Termina sessione e torna all’inizio',
    enterKeyHint: 'Invio ↵',
    spaceKeyHint: 'Spazio ␣',

    // Navigation Tabs
    tabWheel: 'Ruota 3D e Gabbia',
    tabScoreboard: 'Tabellone Punti',
    tabPrint: 'Stampa Cartelle',
    tabDigital: 'Digitale',

    // Landing Page
    landingBadge: 'Benvenuti a Bingo di Famiglia!',
    landingTitle: 'Il Pomeriggio di Gioco Perfetto in Famiglia!',
    landingSubtitle:
      'Una gabbia 3D interattiva, cartelle stampabili in PDF pronte da ritagliare, verifica con fuochi d’artificio e tabellone dei campioni di ogni partita.',
    landingStartBtn: 'INIZIA SESSIONE DI GIOCO',
    landingNoAccountNote: 'Nessuna registrazione necessaria. Pronto da proiettare sullo schermo o giocare sul tavolo.',
    landingFeature1Title: 'Gabbia 3D Interattiva',
    landingFeature1Desc: 'Rotazione fisica con 75 palline numerate estratte a caso ed effetti sonori realistici.',
    landingFeature2Title: 'Cartelle PDF Stampabili',
    landingFeature2Desc: 'Personalizza i nomi di parenti o amici e stampa 2 o 4 cartelle per foglio.',
    landingFeature3Title: 'Verifica Immediata',
    landingFeature3Desc: 'Controlla subito quando qualcuno fa Bingo con coriandoli e fanfara di vittoria.',
    landingFeature4Title: 'Tabellone della Sessione',
    landingFeature4Desc: 'Registra i vincitori digitando il loro nome e premiali sul podio della sessione.',
    landingFooterNote: 'Divertiti e gioca insieme! 🎈 Condividi questo schermo o proiettalo per tutti.',

    // Game Modes
    modeFullCard: 'Cartella Piena (Tombola)',
    modeFullCardDesc: 'Completa tutti i numeri della cartella',
    modeLineRow: 'Cinquina / Riga Orizzontale',
    modeLineRowDesc: 'Qualsiasi riga orizzontale di 5 numeri',
    modeLineCol: 'Colonna Verticale',
    modeLineColDesc: 'Qualsiasi colonna verticale di 5 numeri',
    modeSelectorLabel: 'Modalità di Vittoria:',

    // 3D Wheel & Tumbler
    wheelDrawBtn: '¡GIRA ED ESTRAI PALLINA!',
    wheelSpinning: 'GIRANDO LA GABBIA...',
    wheelAllDrawn: 'TUTTE LE PALLINE SONO STATE ESTRATTE!',
    wheelResetBtn: 'Riavvia Gabbia',
    wheelSoundOn: 'Audio Attivo',
    wheelSoundOff: 'Audio Silenziato',
    wheelTotalDrawn: 'Palline estratte',
    wheelLastBall: 'Ultima pallina',
    wheelKeyboardHint: 'Premi la barra Spazio sulla tastiera per girare',

    // Master Board
    masterBoardTitle: 'Tabellone Maestro di Controllo (da 1 a 75)',
    masterBoardSubtitle: 'Controlla a colpo d’occhio tutti i numeri usciti dalla gabbia',
    masterBoardDrawnStat: 'Estratte',
    masterBoardSearchPlaceholder: 'È uscito il numero...?',
    masterBoardDrawnBadge: 'Già estratto!',
    masterBoardNotDrawnBadge: 'Ancora nella gabbia',

    // Scoreboard
    scoreboardTitle: 'Tabellone Punti della Sessione',
    scoreboardSubtitle: 'Scrivi il nome del vincitore per registrare la vittoria. Ogni nuova sessione riparte da zero.',
    scoreboardSessionResetBadge: 'Sessione Attiva',
    scoreboardPodiumTitle: 'Podio della Sessione',
    scoreboardHistoryTitle: 'Vittorie Registrate in Questa Sessione',
    scoreboardEmpty: 'Nessun campione registrato ancora in questa sessione!',
    scoreboardEmptyTitle: 'Nessun campione registrato ancora in questa sessione!',
    scoreboardEmptyDesc: 'Puoi digitare il nome del vincitore nella casella sopra, oppure cliccare su "Dichiara Bingo!" (o premere Invio) per verificare e festeggiare con i fuochi d’artificio.',
    scoreboardRecentTitle: 'Vittorie Registrate in Questa Sessione',
    scoreboardThPlayer: 'Giocatore',
    scoreboardThMode: 'Modalità',
    scoreboardThBalls: 'Palline Estratte',
    scoreboardThDate: 'Orario',
    scoreboardThAction: 'Azione',
    scoreboardManualTitle: 'Scrivi Nome del Vincitore / Campione',
    scoreboardManualSubtitle: 'Scrivi il nome e clicca "Registra Vittoria":',
    scoreboardManualDesc: 'Scrivi il nome e clicca "Registra Vittoria"',
    scoreboardManualPlaceholder: 'Scrivi il nome qui (es: Marco, Famiglia Rossi, Sofia...)',
    scoreboardManualSubmit: 'Registra Vittoria',
    scoreboardSuccessNotice: 'Vittoria registrata con successo nel Tabellone Punti!',
    scoreboardInputPlaceholder: 'Nome del vincitore (es: Sofia, Papà, Luca)...',
    scoreboardSelectMode: 'Modalità vincente',
    scoreboardManualBtn: 'Registra Vittoria',
    scoreboardResetBtn: 'Azzera Sessione',
    scoreboardClearBtn: 'Cancella Tabellone',
    scoreboardDeleteConfirm: 'Eliminare questa registrazione?',
    scoreboardClearConfirm: 'Vuoi azzerare il tabellone punti per questa sessione?',
    scoreboardWinsCount: 'vittorie',

    // Printable Cards
    printTitle: 'Generatore di Cartelle PDF Stampabili',
    printSubtitle: 'Configura le cartelle per ogni partecipante, scarica PDF ad alta definizione pronti per la stampa o stampa direttamente.',
    printParticipantsTitle: 'Nomi dei Partecipanti (Salvati dalla sessione precedente):',
    printParticipantsDesc: 'Le modifiche vengono salvate automaticamente in questo browser per le prossime partite.',
    participantsTitle: 'Nomi dei Partecipanti (Salvati dalla sessione precedente)',
    participantsDesc: 'Le modifiche vengono salvate automaticamente in questo browser per le prossime partite.',
    addPlayerBtn: 'Aggiungi Giocatore',
    restoreDefaultPlayersBtn: 'Ripristina',
    cardsPerPlayerLabel: 'Cartelle per giocatore',
    cardsPerSheetLabel: 'Cartelle per foglio',
    cardsPerPage2: '2 (Grandi)',
    cardsPerPage4: '4 (Standard)',
    printStyleLabel: 'Stile di stampa',
    printStyleColor: '🎨 A Colori',
    printStyleBW: 'Risparmio Inchiostro',
    shuffleGridsLabel: 'Nuovi numeri',
    shuffleGridsBtn: 'Mescola numeri',
    scissorsLineCut: 'Linee guida di taglio con forbici',
    freeSpaceLabel: 'GRATIS',
    cardCoverHint: '🌽 Copri i numeri con fagioli, bottoni o gettoni',
    cardFreeCenterHint: '⭐ Centro gratuito',
    printAddParticipantPlaceholder: 'Nuovo nome (es: Matteo, Mamma)...',
    printAddParticipantBtn: 'Aggiungi',
    printCardsPerParticipant: 'Cartelle per partecipante',
    printLayoutNotice: 'Fogli ottimizzati per formato A4 / Lettera con linee tratteggiate di taglio.',
    printDownloadPdfBtn: 'SCARICA PDF CARTELLE',
    printDirectPrintBtn: 'Stampa direttamente',
    printDirectBtn: 'Stampa direttamente',
    printPdfGenerating: 'Generazione PDF in corso...',
    printGeneratingPdf: 'Generazione PDF in corso...',
    printCutGuideNotice: 'Taglia lungo le linee tratteggiate ✂️ e distribuisci fagioli o gettoni per segnare i numeri.',
    printColorThemeLabel: 'Tavolozza Colori:',
    printEmptyParticipantsWarning: 'Aggiungi almeno un partecipante per generare le cartelle.',

    // Digital Cards
    digitalTitle: 'Cartelle Digitali su Schermo',
    digitalSubtitle: 'Tocca i numeri per posizionare un gettone quando vengono estratti dalla gabbia',
    digitalChooseToken: 'Scegli gettone',
    verifyWinnerBtn: 'Verifica',
    digitalSelectPlayer: 'Visualizza cartella di:',
    digitalCardNumber: 'Cartella',
    digitalResetMarks: 'Rimuovi gettoni',
    digitalVerifyBtn: 'Controlla se ho vinto',
    digitalMarkTip: 'Tocca o clicca su ogni numero che viene estratto dalla gabbia.',

    // Bingo Claim Modal
    claimModalTitle: '¡Dichiara Bingo!',
    claimModalSubtitle: 'Digita il nome del vincitore e verificheremo subito la sua cartella',
    claimGameModeLabel: 'Modalità di gioco da verificare:',
    claimWinnerNameLabel: 'Digita il nome di chi ha cantato Bingo:',
    claimWinnerNamePlaceholder: 'Scrivi il nome qui (es: Marco, Papà, Sofia, Mamma...)',
    claimQuickSelectLabel: 'Oppure seleziona rapidamente:',
    claimVerifyBtn: '¡VERIFICA SE È BINGO!',
    claimValidWinTitle: '¡SIIII, BINGO VALIDO!! 🏆',
    claimCongrats: 'Congratulazioni,',
    claimRegisteredNotice: 'Registrato nel Tabellone Punti con il nome indicato!',
    claimMoreFireworksBtn: 'Altri fuochi d’artificio!',
    claimNotYetTitle: 'Non è ancora Bingo! Manca poco',
    claimTryOtherPlayerBtn: 'Prova con un altro giocatore',
    claimCloseBtn: 'Chiudi e continua a giocare',
    claimManualVerifyOkBtn: 'È OK! (VERDE) - BINGO VALIDO',
    claimManualVerifyFailBtn: 'È SBAGLIATO (ROSSO) - NON È BINGO',
    claimHostVerifyGuide: 'Il responsabile della ruota verifica i numeri nel Tabellone Maestro:',
    claimReviewingWinner: 'Verifica Bingo di',
    claimSearchHint: 'È uscito il numero...?',
    claimIncorrectTitle: '¡Bingo non corretto / Non valido!',
    claimIncorrectDesc: 'Mancano ancora numeri o c’è stato un errore nel chiamare i numeri. Potete continuare a girare la gabbia!',
    claimBackToEdit: 'Modifica nome o modalità',
    claimContinueSpinningBtn: 'Continua a girare la gabbia',
    claimModalStep1: '1. Identifica il Vincitore',
    claimModalStep2: '2. Verifica Numeri',
    claimModalWinnerNameLabel: 'Nome del Vincitore (scrivi o scegli):',
    claimModalWinnerNamePlaceholder: 'Scrivi il nome del vincitore...',
    claimModalSelectQuickChip: 'Oppure scegli partecipante:',
    claimModalModeLabel: 'Modalità chiamata:',
    claimModalCardToVerifyLabel: 'Cartella da verificare:',
    claimModalValidBingo: 'BINGO VALIDO! CONGRATULAZIONI AL CAMPIONE!',
    claimModalNotBingoYet: 'Non è ancora Bingo completo!',
    claimModalMissingNumbers: 'Numeri ancora necessari per vincere:',
    claimModalRecordVictoryBtn: '🏆 Registra Vittoria nel Tabellone',
    claimModalCloseBtn: 'Chiudi',
    claimModalSuccessSaved: 'Vittoria registrata con successo!',

    // Reset & Exit Confirmation Modals
    resetModalTitle: 'Riavviare la partita?',
    resetModalDesc: 'Tutte le palline estratte torneranno nella gabbia 3D per iniziare una nuova partita da capo.',
    resetModalCancel: 'Annulla',
    resetModalConfirm: 'Sì, riavvia',
    exitModalTitle: 'Tornare alla schermata iniziale?',
    exitModalDesc: 'Puoi iniziare una nuova sessione quando desideri. Ogni nuova sessione riparte con un tabellone pulito.',
    exitModalCancel: 'Continua a Giocare',
    exitModalConfirm: 'Esci alla Home',

    // Instructions Modal
    instructionsModalTitle: 'Guida e Istruzioni per il Bingo in Famiglia',
    instructionsModalSubtitle: 'Tutto ciò che serve per organizzare una partita con parenti e amici',
    instructionsShortcutsTitle: 'Scorciatoie Rapide da Tastiera',
    instructionsShortcutSpace: 'Gira la gabbia ed estrai la pallina!',
    instructionsShortcutEnter: 'Dichiara Bingo e verifica!',
    instructionsCloseBtn: 'Ho capito, giochiamo!',
    instructionsModalClose: 'Tutto chiaro, giochiamo!',
    instructionsStep1Title: 'Genera e Stampa Cartelle in PDF',
    instructionsStep1Desc:
      'Vai alla scheda "Stampa Cartelle". Puoi inserire i nomi dei partecipanti (salvati automaticamente), scegliere quante cartelle assegnare a ciascuno (da 1 a 4) e cliccare su "SCARICA PDF CARTELLE". Il PDF include linee guida di taglio con forbici ad alta risoluzione.',
    instructionsStep2Title: 'Gira la Gabbia 3D ed Estrai i Numeri',
    instructionsStep2Desc:
      'Clicca "GIRA ED ESTRAI PALLINA!" o premi la barra Spazio. La gabbia 3D girerà ed estrarrà una delle 75 palline con la lettera B-I-N-G-O e un simpatico soprannome (es. "B-7 Il Razzo"). Puoi anche attivare la Modalità Automatica con timer.',
    instructionsStep3Title: 'Scegli la Modalità di Vittoria',
    instructionsStep3Desc:
      'Prima di iniziare, concordate la regola vincente: Riga Orizzontale (5 numeri consecutivi), Colonna Verticale (5 numeri dall’alto in basso) o Cartella Piena (tutte le caselle per il grande premio finale).',
    instructionsStep4Title: 'Dichiara Bingo e Verifica con Festa',
    instructionsStep4Desc:
      'Quando qualcuno completa la cartella, clicca sul pulsante "Dichiara Bingo!" o premi Invio. Si aprirà la finestra di verifica dove digitare il nome del vincitore e controllare sul Tabellone Maestro con fuochi d’artificio e fanfara.',
    instructionsStep5Title: 'Tabellone Punti e Podio della Sessione',
    instructionsStep5Desc:
      'Confermata la vittoria, il campione viene inserito sul podio della sessione. Avviando una nuova sessione il tabellone riparte da zero, mantenendo ogni incontro fresco e avvincente.',

    // Tips Card
    tipsTitle: 'Consigli per giocare in famiglia e con amici',
    tipsTip1: 'Stampa le cartelle nella scheda "Stampa Cartelle" con le linee di taglio e distribuiscile.',
    tipsTip2: 'Gira la gabbia usando la barra Spazio e dichiara Bingo premendo il tasto Invio.',
    tipsTip3: 'Quando si canta Bingo, scrivi il nome del vincitore per registrarlo sul podio del Tabellone Punti.',
    tipsPrintBtn: 'Vai a Stampa Cartelle',
    tipsGoToPrintBtn: 'Vai a Stampa Cartelle',

    // Footer
    footerCopyright: 'Bingo di Famiglia',
    footerRights: 'Tutti i diritti riservati.',
    footerDevelopedWith: 'Sviluppato con',
    footerBy: 'da',
    footerMitLicense: 'Licenza MIT',
    footerCreatedUnder: 'Rilasciato con',
    footerGithubRepo: 'Repository GitHub',

    // Automatic Draw Mode
    autoModeStart: 'Modalità Automatica',
    autoModePause: 'Pausa Automatica',
    autoModeNextIn: 'Prossima tra',
    autoModeSpeedLabel: 'Pausa tra palline:',

    // Wheel details
    wheelCageBadge: 'Gabbia 3D Three.js',
    wheelRemainingBallsText: 'Rimangono {0} su 75 palline',
    wheelBallNumberPrefix: 'Pallina #',
    wheelColumnPrefix: 'Colonna',
    wheelRangeTo: 'a',
    wheelReadyToPlay: '¡Pronto a giocare!',
    wheelStartHint: 'Premi "¡GIRA ED ESTRAI PALLINA!" o premi la barra Spazio per iniziare la partita.',
    wheelRecentBalls: 'Ultime 5 palline estratte:',
    wheelNoBallsDrawn: 'Nessuna pallina ancora estratta',

    // Master Board details
    masterBoardOrderDrawn: 'Estratta al #',
    masterBoardNotYetDrawn: 'Non ancora estratta',

    // Scoreboard details
    scoreboardPlayersCount: 'giocatori',
    scoreboardModeRowShort: 'Riga',
    scoreboardModeColShort: 'Colonna',
    scoreboardModeFullShort: 'Tutto',
    scoreboardWinSingular: 'Vittoria',
    scoreboardWinPlural: 'Vittorie',
    scoreboardCompletedInBalls: 'Completato in',
    scoreboardBallsWord: 'palline',
    scoreboardDeleteRecordTooltip: 'Elimina registrazione',
    scoreboardRecentTime: 'Recente',

    // Printable Cards details
    printPlayerPrefix: 'Giocatore',
    printRemovePlayerTitle: 'Rimuovi giocatore',
    printEachSuffix: 'cad.',
    printCardSingular: 'cartella',
    printCardPlural: 'cartelle',
    printTotalCardsSummary: 'Totale: {0} cartelle ({1} giocatori × {2})',
    printSheetsSummary: 'Genera {0} fogli nel PDF',
    printColorStyleDesc: 'Bordi e colori vivaci',
    printBwStyleDesc: 'Scala di grigi economica',
    printShuffleGridsDesc: 'Genera nuove combinazioni casuali',
    printSheetPageInfo: 'Pagina {0} di {1} ({2} cartelle per foglio)',
    printCardNumberTitle: 'Cartella #{0} • Bingo di Famiglia!',
    printPdfSuccessNotice: 'PDF generato con successo! File:',
    printPdfErrorNotice: 'Si è verificato un errore durante la generazione del file PDF delle cartelle.',
    printCutHereCenterGuide: '-- Tagliare con le forbici qui --',
    printCutHorizontalGuide: '-- Taglio orizzontale --',
    printBeansCoverHint: 'Copri i numeri con fagioli o gettoni',
    printFreeCenterPdfHint: '* Centro gratuito',
    printPdfTopTitle: 'Bingo di Famiglia - Pagina {0} di {1}',

    // Digital Cards details
    digitalNotDrawnWarning: 'Il numero {0} non è ancora uscito dalla gabbia!',
    digitalLineSingular: 'Riga',
    digitalLinePlural: 'Righe',

    // Bingo Claim Modal details
    claimDefaultChampionName: 'Campione',
    claimManualVerifiedDesc: 'Vittoria manuale verificata',
    claimStep1Subtitle: 'Digita il nome del vincitore per verificare i numeri sul Tabellone Maestro.',
    claimRecordedBadge: 'Registrato nel Tabellone',
    claimHostGuideText: 'Il responsabile della gabbia controllerà i numeri chiamati sul Tabellone Maestro.',
    claimHostCheckNumbersText: 'Chiedi al giocatore di chiamare i suoi numeri e verifica che siano illuminati a colori.',
    claimSearchDrawnBadge: 'ESTRATTO!',
    claimSearchNotDrawnBadge: 'NON ESTRATTO',
    claimBallsDrawnOutOf: 'palline estratte',
    claimMatchesBoardQuestion: 'I numeri chiamati dal giocatore corrispondono al tabellone?',
    claimAchievedWithBalls: 'Raggiunto con {0} palline estratte dalla gabbia',
    claimNoVictoryRecordedNotice: 'Nessuna vittoria registrata nel Tabellone. Potete continuare a giocare normalmente.',
    claimCheckAgainBtn: 'Controlla di nuovo',

    // Version
    versionLabel: 'Versione',
  },
};

export const getGameModeLabel = (mode: GameMode, lang: Language): string => {
  const t = translations[lang];
  switch (mode) {
    case 'full_card':
      return t.modeFullCard;
    case 'line_row':
      return t.modeLineRow;
    case 'line_col':
      return t.modeLineCol;
    default:
      return mode;
  }
};
