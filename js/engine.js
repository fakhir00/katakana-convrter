/**
 * English → Katakana Conversion Engine
 * Zero-cost, no-API, phoneme-based converter
 * Uses multi-stage pipeline: Normalize → G2P → Phoneme→Katakana → Post-process
 */
(function (global) {
  'use strict';

  /* ========================================
   * LOANWORD EXCEPTION DICTIONARY
   * Words where standard katakana differs from pure phonetic rules
   * ======================================== */
  const LOANWORD_DICT = {
    'coffee': 'コーヒー', 'computer': 'コンピュータ', 'chocolate': 'チョコレート',
    'internet': 'インターネット', 'hamburger': 'ハンバーガー', 'television': 'テレビジョン',
    'restaurant': 'レストラン', 'christmas': 'クリスマス', 'volunteer': 'ボランティア',
    'algorithm': 'アルゴリズム', 'energy': 'エネルギー', 'vitamin': 'ビタミン',
    'virus': 'ウイルス', 'alcohol': 'アルコール', 'allergic': 'アレルギー',
    'antenna': 'アンテナ', 'banana': 'バナナ', 'butter': 'バター',
    'calendar': 'カレンダー', 'catalogue': 'カタログ', 'category': 'カテゴリー',
    'cement': 'セメント', 'center': 'センター', 'channel': 'チャンネル',
    'cheese': 'チーズ', 'circle': 'サークル', 'class': 'クラス',
    'climate': 'クライメート', 'code': 'コード', 'content': 'コンテンツ',
    'control': 'コントロール', 'cookie': 'クッキー', 'copy': 'コピー',
    'cream': 'クリーム', 'curtain': 'カーテン', 'data': 'データ',
    'database': 'データベース', 'design': 'デザイン', 'digital': 'デジタル',
    'dollar': 'ドル', 'drama': 'ドラマ', 'dress': 'ドレス',
    'driver': 'ドライバー', 'engine': 'エンジン', 'error': 'エラー',
    'event': 'イベント', 'fashion': 'ファッション', 'file': 'ファイル',
    'film': 'フィルム', 'filter': 'フィルター', 'flash': 'フラッシュ',
    'football': 'フットボール', 'forum': 'フォーラム', 'game': 'ゲーム',
    'glass': 'グラス', 'global': 'グローバル', 'goal': 'ゴール',
    'green': 'グリーン', 'group': 'グループ', 'guitar': 'ギター',
    'hotel': 'ホテル', 'humor': 'ユーモア', 'icon': 'アイコン',
    'image': 'イメージ', 'jacket': 'ジャケット', 'juice': 'ジュース',
    'keyboard': 'キーボード', 'kitchen': 'キッチン', 'label': 'ラベル',
    'laptop': 'ラップトップ', 'leader': 'リーダー', 'level': 'レベル',
    'link': 'リンク', 'list': 'リスト', 'machine': 'マシン',
    'manager': 'マネージャー', 'manner': 'マナー', 'manual': 'マニュアル',
    'marathon': 'マラソン', 'mask': 'マスク', 'master': 'マスター',
    'media': 'メディア', 'member': 'メンバー', 'memory': 'メモリー',
    'menu': 'メニュー', 'message': 'メッセージ', 'method': 'メソッド',
    'micro': 'マイクロ', 'milk': 'ミルク', 'mirror': 'ミラー',
    'mission': 'ミッション', 'mobile': 'モバイル', 'model': 'モデル',
    'monitor': 'モニター', 'motor': 'モーター', 'network': 'ネットワーク',
    'news': 'ニュース', 'note': 'ノート', 'number': 'ナンバー',
    'office': 'オフィス', 'online': 'オンライン', 'open': 'オープン',
    'option': 'オプション', 'orange': 'オレンジ', 'organ': 'オルガン',
    'package': 'パッケージ', 'page': 'ページ', 'panel': 'パネル',
    'partner': 'パートナー', 'party': 'パーティー', 'pattern': 'パターン',
    'percent': 'パーセント', 'piano': 'ピアノ', 'pink': 'ピンク',
    'pizza': 'ピザ', 'plastic': 'プラスチック', 'player': 'プレーヤー',
    'pocket': 'ポケット', 'point': 'ポイント', 'poster': 'ポスター',
    'power': 'パワー', 'present': 'プレゼント', 'price': 'プライス',
    'print': 'プリント', 'process': 'プロセス', 'professional': 'プロフェッショナル',
    'program': 'プログラム', 'project': 'プロジェクト', 'radio': 'ラジオ',
    'random': 'ランダム', 'record': 'レコード', 'remote': 'リモート',
    'report': 'レポート', 'robot': 'ロボット', 'rocket': 'ロケット',
    'routine': 'ルーティン', 'rule': 'ルール', 'sample': 'サンプル',
    'sandwich': 'サンドイッチ', 'schedule': 'スケジュール', 'screen': 'スクリーン',
    'search': 'サーチ', 'season': 'シーズン', 'section': 'セクション',
    'security': 'セキュリティ', 'server': 'サーバー', 'service': 'サービス',
    'session': 'セッション', 'shirt': 'シャツ', 'shock': 'ショック',
    'shopping': 'ショッピング', 'signal': 'シグナル', 'simple': 'シンプル',
    'single': 'シングル', 'site': 'サイト', 'size': 'サイズ',
    'skill': 'スキル', 'smart': 'スマート', 'soccer': 'サッカー',
    'software': 'ソフトウェア', 'source': 'ソース', 'space': 'スペース',
    'speed': 'スピード', 'sport': 'スポーツ', 'staff': 'スタッフ',
    'stage': 'ステージ', 'standard': 'スタンダード', 'star': 'スター',
    'start': 'スタート', 'station': 'ステーション', 'status': 'ステータス',
    'step': 'ステップ', 'stock': 'ストック', 'stop': 'ストップ',
    'store': 'ストア', 'story': 'ストーリー', 'strategy': 'ストラテジー',
    'stress': 'ストレス', 'strike': 'ストライク', 'strong': 'ストロング',
    'studio': 'スタジオ', 'style': 'スタイル', 'supply': 'サプライ',
    'support': 'サポート', 'surprise': 'サプライズ', 'switch': 'スイッチ',
    'symbol': 'シンボル', 'system': 'システム', 'table': 'テーブル',
    'talent': 'タレント', 'target': 'ターゲット', 'taxi': 'タクシー',
    'team': 'チーム', 'technology': 'テクノロジー', 'test': 'テスト',
    'text': 'テキスト', 'theme': 'テーマ', 'ticket': 'チケット',
    'timer': 'タイマー', 'title': 'タイトル', 'tool': 'ツール',
    'top': 'トップ', 'total': 'トータル', 'tour': 'ツアー',
    'tower': 'タワー', 'track': 'トラック', 'trade': 'トレード',
    'training': 'トレーニング', 'trouble': 'トラブル', 'tunnel': 'トンネル',
    'type': 'タイプ', 'unique': 'ユニーク', 'unit': 'ユニット',
    'update': 'アップデート', 'user': 'ユーザー', 'version': 'バージョン',
    'video': 'ビデオ', 'vision': 'ビジョン', 'volume': 'ボリューム',
    'website': 'ウェブサイト', 'zero': 'ゼロ', 'zone': 'ゾーン',
    'faakhir': 'ファーキル',
    'bus': 'バス', 'camera': 'カメラ', 'pen': 'ペン', 'cup': 'カップ',
    'car': 'カー', 'beer': 'ビール', 'cake': 'ケーキ', 'wine': 'ワイン',
    'door': 'ドア', 'mail': 'メール', 'map': 'マップ', 'net': 'ネット',
    'pet': 'ペット', 'pin': 'ピン', 'ring': 'リング', 'set': 'セット',
    'shop': 'ショップ', 'sign': 'サイン', 'song': 'ソング', 'trip': 'トリップ',
    'john': 'ジョン', 'smith': 'スミス', 'james': 'ジェームズ',
    'michael': 'マイケル', 'david': 'デイビッド', 'robert': 'ロバート',
    'william': 'ウィリアム', 'mary': 'メアリー', 'joseph': 'ジョセフ',
    'thomas': 'トーマス', 'charles': 'チャールズ', 'christopher': 'クリストファー',
    'daniel': 'ダニエル', 'matthew': 'マシュー', 'anthony': 'アンソニー',
    'donald': 'ドナルド', 'mark': 'マーク', 'paul': 'ポール',
    'steven': 'スティーブン', 'andrew': 'アンドリュー', 'kenneth': 'ケネス',
    'joshua': 'ジョシュア', 'kevin': 'ケビン', 'brian': 'ブライアン',
    'george': 'ジョージ', 'edward': 'エドワード', 'ronald': 'ロナルド',
    'timothy': 'ティモシー', 'jason': 'ジェイソン', 'jeffrey': 'ジェフリー',
    'ryan': 'ライアン', 'jacob': 'ジェイコブ', 'gary': 'ゲイリー',
    'nicholas': 'ニコラス', 'eric': 'エリック', 'jonathan': 'ジョナサン',
    'stephen': 'スティーブン', 'larry': 'ラリー', 'justin': 'ジャスティン',
    'scott': 'スコット', 'brandon': 'ブランドン', 'benjamin': 'ベンジャミン',
    'samuel': 'サミュエル', 'gregory': 'グレゴリー', 'alexander': 'アレクサンダー',
    'patrick': 'パトリック', 'frank': 'フランク', 'raymond': 'レイモンド',
    'jack': 'ジャック', 'dennis': 'デニス', 'jerry': 'ジェリー',
    'tyler': 'タイラー', 'aaron': 'アーロン', 'jose': 'ホセ',
    'adam': 'アダム', 'nathan': 'ネイサン', 'henry': 'ヘンリー',
    'douglas': 'ダグラス', 'zachary': 'ザカリー', 'peter': 'ピーター',
    'kyle': 'カイル', 'ethan': 'イーサン', 'walter': 'ウォルター',
    'noah': 'ノア', 'jeremy': 'ジェレミー', 'christian': 'クリスチャン',
    'keith': 'キース', 'roger': 'ロジャー', 'terry': 'テリー',
    'austin': 'オースティン', 'sean': 'ショーン', 'gerald': 'ジェラルド',
    'carl': 'カール', 'harold': 'ハロルド', 'dylan': 'ディラン',
    'arthur': 'アーサー', 'lawrence': 'ローレンス', 'jordan': 'ジョーダン',
    'jesse': 'ジェシー', 'bryan': 'ブライアン', 'billy': 'ビリー',
    'joe': 'ジョー', 'bruce': 'ブルース', 'gabriel': 'ガブリエル',
    'logan': 'ローガン', 'alan': 'アラン', 'juan': 'フアン',
    'wayne': 'ウェイン', 'ralph': 'ラルフ', 'roy': 'ロイ',
    'eugene': 'ユージーン', 'randy': 'ランディ', 'vincent': 'ヴィンセント',
    'russell': 'ラッセル', 'louis': 'ルイス', 'philip': 'フィリップ',
    'bobby': 'ボビー', 'johnson': 'ジョンソン', 'williams': 'ウィリアムズ',
    'brown': 'ブラウン', 'jones': 'ジョーンズ', 'miller': 'ミラー',
    'davis': 'デイビス', 'garcia': 'ガルシア', 'martinez': 'マルティネス',
    'anderson': 'アンダーソン', 'taylor': 'テイラー', 'moore': 'ムーア',
    'martin': 'マーティン', 'lee': 'リー', 'thompson': 'トンプソン',
    'white': 'ホワイト', 'harris': 'ハリス', 'clark': 'クラーク',
    'lewis': 'ルイス', 'robinson': 'ロビンソン', 'walker': 'ウォーカー',
    'young': 'ヤング', 'allen': 'アレン', 'king': 'キング',
    'wright': 'ライト', 'torres': 'トーレス', 'nguyen': 'グエン',
    'hill': 'ヒル', 'green': 'グリーン', 'adams': 'アダムズ',
    'baker': 'ベイカー', 'nelson': 'ネルソン', 'carter': 'カーター',
    'mitchell': 'ミッチェル', 'perez': 'ペレス', 'turner': 'ターナー',
    'parker': 'パーカー', 'evans': 'エバンズ', 'edwards': 'エドワーズ',
    'collins': 'コリンズ', 'stewart': 'スチュワート', 'morris': 'モリス',
    'rogers': 'ロジャース', 'reed': 'リード', 'cook': 'クック',
    'morgan': 'モーガン', 'bell': 'ベル', 'murphy': 'マーフィー',
    'bailey': 'ベイリー', 'rivera': 'リベラ', 'cooper': 'クーパー',
    'richardson': 'リチャードソン', 'cox': 'コックス', 'ward': 'ウォード',
    'peterson': 'ピーターソン', 'gray': 'グレイ', 'ramirez': 'ラミレス',
  };

  /* ========================================
   * HELPER UTILITIES
   * ======================================== */
  const VOWELS = new Set('aeiou');
  const CONSONANTS = new Set('bcdfghjklmnpqrstvwxyz');
  function isVowel(ch) { return VOWELS.has(ch); }
  function isConsonant(ch) { return CONSONANTS.has(ch); }

  /* ========================================
   * STEP 1 — NORMALIZATION
   * ======================================== */
  function normalize(input) {
    const cleaned = input.toLowerCase().replace(/[^a-z\s]/g, '').trim();
    return cleaned.split(/\s+/).filter(function (w) { return w.length > 0; });
  }

  /* ========================================
   * STEP 2 — GRAPHEME-TO-PHONEME (G2P)
   * Rule-based, ordered, context-sensitive
   * ======================================== */

  function hasSilentFinalE(word) {
    var len = word.length;
    if (len < 4) return false;
    if (word[len - 1] !== 'e') return false;
    if (!isConsonant(word[len - 2])) return false;
    // Exceptions: -ce, -ge, -se after vowel are not always silent-e words
    // but the 'e' IS silent phonetically
    return true;
  }

  function isMagicE(word, vowelPos) {
    // VCe pattern: vowel at vowelPos, single consonant, then 'e' at end
    var len = word.length;
    if (word[len - 1] !== 'e') return false;
    if (vowelPos !== len - 3) return false;
    if (!isConsonant(word[len - 2])) return false;
    return true;
  }

  function graphemeToPhoneme(word) {
    var phonemes = [];
    var i = 0;
    var len = word.length;
    var silentE = hasSilentFinalE(word);
    var effectiveLen = silentE ? len - 1 : len;

    while (i < effectiveLen) {
      var remaining = effectiveLen - i;
      var matched = false;

      // === 4-CHARACTER PATTERNS ===
      if (remaining >= 4) {
        var p4 = word.substring(i, i + 4);
        if (p4 === 'tion') { phonemes.push('SH', 'AH', 'N'); i += 4; matched = true; }
        else if (p4 === 'sion') { phonemes.push('ZH', 'AH', 'N'); i += 4; matched = true; }
        else if (p4 === 'ture') { phonemes.push('CH', 'ER'); i += 4; matched = true; }
        else if (p4 === 'ight') { phonemes.push('AY', 'T'); i += 4; matched = true; }
        else if (p4 === 'eigh') { phonemes.push('EY'); i += 4; matched = true; }
        else if (p4 === 'ough') { phonemes.push('AO'); i += 4; matched = true; }
        else if (p4 === 'augh') { phonemes.push('AO'); i += 4; matched = true; }
      }
      if (matched) continue;

      // === 3-CHARACTER PATTERNS ===
      if (remaining >= 3) {
        var p3 = word.substring(i, i + 3);
        if (p3 === 'tch') { phonemes.push('CH'); i += 3; matched = true; }
        else if (p3 === 'dge') { phonemes.push('JH'); i += 3; matched = true; }
        else if (p3 === 'sch') { phonemes.push('SH'); i += 3; matched = true; }
        else if (p3 === 'ght') { phonemes.push('T'); i += 3; matched = true; }
        else if (p3 === 'air') { phonemes.push('EH', 'R'); i += 3; matched = true; }
        else if (p3 === 'ear') { phonemes.push('IH', 'R'); i += 3; matched = true; }
        else if (p3 === 'oor') { phonemes.push('AO', 'R'); i += 3; matched = true; }
        else if (p3 === 'our') { phonemes.push('AW', 'R'); i += 3; matched = true; }
        else if (p3 === 'ous') { phonemes.push('AH', 'S'); i += 3; matched = true; }
        else if (p3 === 'all') { phonemes.push('AO', 'L'); i += 3; matched = true; }
        else if (p3 === 'ore') { phonemes.push('AO', 'R'); i += 3; matched = true; }
        else if (p3 === 'ire') { phonemes.push('AY', 'R'); i += 3; matched = true; }
        else if (p3 === 'are') { phonemes.push('EH', 'R'); i += 3; matched = true; }
        else if (p3 === 'ure') { phonemes.push('UH', 'R'); i += 3; matched = true; }
        else if (p3 === 'ble' && i + 3 === len) { phonemes.push('B', 'AH', 'L'); i += 3; matched = true; }
        else if (p3 === 'ple' && i + 3 === len) { phonemes.push('P', 'AH', 'L'); i += 3; matched = true; }
        else if (p3 === 'tle' && i + 3 === len) { phonemes.push('T', 'AH', 'L'); i += 3; matched = true; }
        else if (p3 === 'dle' && i + 3 === len) { phonemes.push('D', 'AH', 'L'); i += 3; matched = true; }
        else if (p3 === 'ess' && i + 3 >= effectiveLen) { phonemes.push('EH', 'S'); i += 3; matched = true; }
        else if (p3 === 'ing') { phonemes.push('IH', 'NG'); i += 3; matched = true; }
        else if (p3 === 'ank') { phonemes.push('AE', 'NG', 'K'); i += 3; matched = true; }
        else if (p3 === 'ang') { phonemes.push('AE', 'NG'); i += 3; matched = true; }
        else if (p3 === 'ong') { phonemes.push('AO', 'NG'); i += 3; matched = true; }
        else if (p3 === 'ung') { phonemes.push('AH', 'NG'); i += 3; matched = true; }
      }
      if (matched) continue;

      // === 2-CHARACTER PATTERNS ===
      if (remaining >= 2) {
        var p2 = word.substring(i, i + 2);
        // Consonant digraphs
        if (p2 === 'ph') { phonemes.push('F'); i += 2; matched = true; }
        else if (p2 === 'th') { phonemes.push('TH'); i += 2; matched = true; }
        else if (p2 === 'sh') { phonemes.push('SH'); i += 2; matched = true; }
        else if (p2 === 'ch') { phonemes.push('CH'); i += 2; matched = true; }
        else if (p2 === 'ck') { phonemes.push('K'); i += 2; matched = true; }
        else if (p2 === 'wh') { phonemes.push('W'); i += 2; matched = true; }
        else if (p2 === 'qu') { phonemes.push('K', 'W'); i += 2; matched = true; }
        else if (p2 === 'ng' && (i + 2 >= effectiveLen || !isVowel(word[i + 2]))) {
          phonemes.push('NG'); i += 2; matched = true;
        }
        else if (p2 === 'kn' && i === 0) { phonemes.push('N'); i += 2; matched = true; }
        else if (p2 === 'wr' && i === 0) { phonemes.push('R'); i += 2; matched = true; }
        else if (p2 === 'gn' && i === 0) { phonemes.push('N'); i += 2; matched = true; }
        else if (p2 === 'ps' && i === 0) { phonemes.push('S'); i += 2; matched = true; }
        else if (p2 === 'mb' && i + 2 >= effectiveLen) { phonemes.push('M'); i += 2; matched = true; }
        else if (p2 === 'kh') { phonemes.push('K'); i += 2; matched = true; }
        // Double consonants (signal for geminate ッ)
        else if (p2[0] === p2[1] && isConsonant(p2[0]) && p2[0] !== 'h') {
          phonemes.push('Q', p2[0].toUpperCase()); i += 2; matched = true;
          // Q is a gemination marker
        }
        // Vowel digraphs (including doubled vowels for transliterated words)
        else if (p2 === 'aa') { phonemes.push('AA'); i += 2; matched = true; }
        else if (p2 === 'ii') { phonemes.push('IY'); i += 2; matched = true; }
        else if (p2 === 'uu') { phonemes.push('UW'); i += 2; matched = true; }
        else if (p2 === 'oo') { phonemes.push('UW'); i += 2; matched = true; }
        else if (p2 === 'ee') { phonemes.push('IY'); i += 2; matched = true; }
        else if (p2 === 'ea') { phonemes.push('IY'); i += 2; matched = true; }
        else if (p2 === 'ai') { phonemes.push('EY'); i += 2; matched = true; }
        else if (p2 === 'ay') { phonemes.push('EY'); i += 2; matched = true; }
        else if (p2 === 'oi') { phonemes.push('OY'); i += 2; matched = true; }
        else if (p2 === 'oy') { phonemes.push('OY'); i += 2; matched = true; }
        else if (p2 === 'ou') { phonemes.push('AW'); i += 2; matched = true; }
        else if (p2 === 'ow') {
          // "ow" at end or before n/l/er → OW; otherwise AW
          if (i + 2 >= effectiveLen || 'nlr'.indexOf(word[i + 2]) >= 0) {
            phonemes.push('OW'); i += 2; matched = true;
          } else {
            phonemes.push('AW'); i += 2; matched = true;
          }
        }
        else if (p2 === 'au') { phonemes.push('AO'); i += 2; matched = true; }
        else if (p2 === 'aw') { phonemes.push('AO'); i += 2; matched = true; }
        else if (p2 === 'ew') { phonemes.push('UW'); i += 2; matched = true; }
        else if (p2 === 'oa') { phonemes.push('OW'); i += 2; matched = true; }
        else if (p2 === 'ie') {
          if (i + 2 >= effectiveLen) { phonemes.push('IY'); }
          else { phonemes.push('IY'); }
          i += 2; matched = true;
        }
        else if (p2 === 'ei') { phonemes.push('EY'); i += 2; matched = true; }
        else if (p2 === 'ey') { phonemes.push('IY'); i += 2; matched = true; }
        else if (p2 === 'ue') { phonemes.push('UW'); i += 2; matched = true; }
        // Consonant+vowel with r-coloring
        else if (p2 === 'ar') { phonemes.push('AA', 'R'); i += 2; matched = true; }
        else if (p2 === 'er') { phonemes.push('ER'); i += 2; matched = true; }
        else if (p2 === 'ir') { phonemes.push('ER'); i += 2; matched = true; }
        else if (p2 === 'or') { phonemes.push('AO', 'R'); i += 2; matched = true; }
        else if (p2 === 'ur') { phonemes.push('ER'); i += 2; matched = true; }
      }
      if (matched) continue;

      // === SINGLE CHARACTER RULES ===
      var ch = word[i];

      if (ch === 'a') {
        if (silentE && isMagicE(word, i)) {
          phonemes.push('EY'); i++; continue;
        }
        if (i + 1 < effectiveLen && word[i + 1] === 'l') {
          phonemes.push('AO');
        } else {
          phonemes.push('AE');
        }
      } else if (ch === 'e') {
        if (silentE && isMagicE(word, i)) {
          phonemes.push('IY'); i++; continue;
        }
        phonemes.push('EH');
      } else if (ch === 'i') {
        if (silentE && isMagicE(word, i)) {
          phonemes.push('AY'); i++; continue;
        }
        if (i + 1 < effectiveLen && isConsonant(word[i + 1]) &&
            i + 2 < effectiveLen && isVowel(word[i + 2])) {
          phonemes.push('AY');
        } else {
          phonemes.push('IH');
        }
      } else if (ch === 'o') {
        if (silentE && isMagicE(word, i)) {
          phonemes.push('OW'); i++; continue;
        }
        if (i + 1 < effectiveLen && word[i + 1] === 'n' &&
            i + 2 < effectiveLen && isConsonant(word[i + 2])) {
          phonemes.push('AH');
        } else {
          phonemes.push('AA');
        }
      } else if (ch === 'u') {
        if (silentE && isMagicE(word, i)) {
          phonemes.push('UW'); i++; continue;
        }
        phonemes.push('AH');
      } else if (ch === 'y') {
        if (i === 0) {
          phonemes.push('Y');
        } else if (i === effectiveLen - 1) {
          phonemes.push('IY');
        } else if (isConsonant(word[i - 1]) && (i + 1 >= effectiveLen || isConsonant(word[i + 1]))) {
          phonemes.push('IH');
        } else {
          phonemes.push('IY');
        }
      }
      // Consonants
      else if (ch === 'b') { phonemes.push('B'); }
      else if (ch === 'c') {
        if (i + 1 < effectiveLen && 'eiy'.indexOf(word[i + 1]) >= 0) {
          phonemes.push('S');
        } else {
          phonemes.push('K');
        }
      }
      else if (ch === 'd') { phonemes.push('D'); }
      else if (ch === 'f') { phonemes.push('F'); }
      else if (ch === 'g') {
        if (i + 1 < effectiveLen && 'eiy'.indexOf(word[i + 1]) >= 0 && word.substring(i, i + 3) !== 'get' && word.substring(i, i + 4) !== 'give' && word.substring(i, i + 4) !== 'girl' && word.substring(i, i + 3) !== 'gif') {
          phonemes.push('JH');
        } else {
          phonemes.push('G');
        }
      }
      else if (ch === 'h') { phonemes.push('HH'); }
      else if (ch === 'j') { phonemes.push('JH'); }
      else if (ch === 'k') { phonemes.push('K'); }
      else if (ch === 'l') { phonemes.push('L'); }
      else if (ch === 'm') { phonemes.push('M'); }
      else if (ch === 'n') { phonemes.push('N'); }
      else if (ch === 'p') { phonemes.push('P'); }
      else if (ch === 'q') { phonemes.push('K'); }
      else if (ch === 'r') { phonemes.push('R'); }
      else if (ch === 's') {
        // 's' between vowels → Z
        if (i > 0 && i + 1 < effectiveLen && isVowel(word[i - 1]) && isVowel(word[i + 1])) {
          phonemes.push('Z');
        } else {
          phonemes.push('S');
        }
      }
      else if (ch === 't') { phonemes.push('T'); }
      else if (ch === 'v') { phonemes.push('V'); }
      else if (ch === 'w') { phonemes.push('W'); }
      else if (ch === 'x') { phonemes.push('K', 'S'); }
      else if (ch === 'z') { phonemes.push('Z'); }
      else {
        // Unknown character, skip
      }
      i++;
    }
    return phonemes;
  }

  /* ========================================
   * STEP 3 — PHONEME TO KATAKANA MAPPING
   * ======================================== */

  // Vowel phoneme → katakana vowel character
  var VOWEL_PHONEMES = {
    'AA': 'アー', 'AE': 'ア', 'AH': 'ア', 'AO': 'オー',
    'AW': 'アウ', 'AY': 'アイ', 'EH': 'エ', 'ER': 'アー',
    'EY': 'エイ', 'IH': 'イ', 'IY': 'イー', 'OW': 'オー',
    'OY': 'オイ', 'UH': 'ウ', 'UW': 'ウー'
  };

  // Consonant+Vowel → katakana syllable (C mapped to Japanese vowel index)
  // Index: 0=a, 1=i, 2=u, 3=e, 4=o
  var CV_TABLE = {
    'K':  ['カ', 'キ', 'ク', 'ケ', 'コ'],
    'G':  ['ガ', 'ギ', 'グ', 'ゲ', 'ゴ'],
    'S':  ['サ', 'シ', 'ス', 'セ', 'ソ'],
    'Z':  ['ザ', 'ジ', 'ズ', 'ゼ', 'ゾ'],
    'T':  ['タ', 'チ', 'ツ', 'テ', 'ト'],
    'D':  ['ダ', 'ディ', 'ドゥ', 'デ', 'ド'],
    'N':  ['ナ', 'ニ', 'ヌ', 'ネ', 'ノ'],
    'HH': ['ハ', 'ヒ', 'フ', 'ヘ', 'ホ'],
    'B':  ['バ', 'ビ', 'ブ', 'ベ', 'ボ'],
    'P':  ['パ', 'ピ', 'プ', 'ペ', 'ポ'],
    'M':  ['マ', 'ミ', 'ム', 'メ', 'モ'],
    'R':  ['ラ', 'リ', 'ル', 'レ', 'ロ'],
    'L':  ['ラ', 'リ', 'ル', 'レ', 'ロ'],
    'W':  ['ワ', 'ウィ', 'ウ', 'ウェ', 'ウォ'],
    'Y':  ['ヤ', 'イ', 'ユ', 'イェ', 'ヨ'],
    'F':  ['ファ', 'フィ', 'フ', 'フェ', 'フォ'],
    'V':  ['ヴァ', 'ヴィ', 'ヴ', 'ヴェ', 'ヴォ'],
    'SH': ['シャ', 'シ', 'シュ', 'シェ', 'ショ'],
    'CH': ['チャ', 'チ', 'チュ', 'チェ', 'チョ'],
    'JH': ['ジャ', 'ジ', 'ジュ', 'ジェ', 'ジョ'],
    'TH': ['サ', 'シ', 'ス', 'セ', 'ソ'],
    'DH': ['ザ', 'ジ', 'ズ', 'ゼ', 'ゾ'],
    'ZH': ['ジャ', 'ジ', 'ジュ', 'ジェ', 'ジョ'],
    'NG': ['ンガ', 'ンギ', 'ング', 'ンゲ', 'ンゴ'],
  };

  // Epenthetic vowel for consonant without following vowel
  var EPENTHETIC = {
    'K': 'ク', 'G': 'グ', 'S': 'ス', 'Z': 'ズ',
    'T': 'ト', 'D': 'ド', 'N': 'ン', 'HH': 'フ',
    'B': 'ブ', 'P': 'プ', 'M': 'ム', 'R': 'ル',
    'L': 'ル', 'W': 'ウ', 'Y': 'イ',
    'F': 'フ', 'V': 'ヴ', 'SH': 'シュ', 'CH': 'チ',
    'JH': 'ジ', 'TH': 'ス', 'DH': 'ズ', 'ZH': 'ジュ',
    'NG': 'ング',
  };

  // Map vowel phoneme to the 5-vowel Japanese index (a=0, i=1, u=2, e=3, o=4)
  function vowelToIndex(vp) {
    switch (vp) {
      case 'AA': case 'AE': case 'AH': case 'AW': case 'AY': case 'ER': return 0;
      case 'IH': case 'IY': return 1;
      case 'UH': case 'UW': return 2;
      case 'EH': case 'EY': return 3;
      case 'AO': case 'OW': case 'OY': return 4;
      default: return 0;
    }
  }

  // Check if a phoneme is a vowel type
  function isVowelPhoneme(ph) {
    return VOWEL_PHONEMES.hasOwnProperty(ph);
  }

  // Check if a phoneme is a consonant type
  function isConsonantPhoneme(ph) {
    return CV_TABLE.hasOwnProperty(ph) || ph === 'Q';
  }

  // Get long vowel extension for certain vowel phonemes
  function getVowelExtension(vp) {
    switch (vp) {
      case 'AA': case 'AO': case 'IY': case 'UW': case 'OW': case 'ER': return 'ー';
      case 'AY': return 'イ';
      case 'EY': return 'イ';
      case 'AW': return 'ウ';
      case 'OY': return 'イ';
      default: return '';
    }
  }

  function phonemeToKatakana(phonemes) {
    var result = '';
    var i = 0;
    var len = phonemes.length;

    while (i < len) {
      var ph = phonemes[i];

      // Gemination marker
      if (ph === 'Q') {
        result += 'ッ';
        i++;
        continue;
      }

      // N before consonant or at end → ン
      if (ph === 'N' && (i + 1 >= len || isConsonantPhoneme(phonemes[i + 1]))) {
        result += 'ン';
        i++;
        continue;
      }

      // M before B, P, or at end → ン
      if (ph === 'M' && (i + 1 >= len || (isConsonantPhoneme(phonemes[i + 1]) && phonemes[i + 1] !== 'Q'))) {
        result += 'ン';
        i++;
        continue;
      }

      // Consonant phoneme
      if (isConsonantPhoneme(ph)) {
        if (i + 1 < len && isVowelPhoneme(phonemes[i + 1])) {
          // Consonant + Vowel → syllable
          var vp = phonemes[i + 1];
          var vi = vowelToIndex(vp);
          var kana = CV_TABLE[ph] ? CV_TABLE[ph][vi] : '';
          result += kana;
          result += getVowelExtension(vp);
          i += 2;
        } else {
          // Consonant alone → epenthetic vowel
          result += EPENTHETIC[ph] || '';
          i++;
        }
        continue;
      }

      // Vowel phoneme alone
      if (isVowelPhoneme(ph)) {
        result += VOWEL_PHONEMES[ph];
        i++;
        continue;
      }

      // Unknown phoneme, skip
      i++;
    }
    return result;
  }

  /* ========================================
   * STEP 5 — POST-PROCESSING
   * ======================================== */
  function postProcess(katakana) {
    var result = katakana;
    // Normalize consecutive identical vowels to long vowel mark
    result = result.replace(/アア/g, 'アー');
    result = result.replace(/イイ/g, 'イー');
    result = result.replace(/ウウ/g, 'ウー');
    result = result.replace(/エエ/g, 'エー');
    result = result.replace(/オオ/g, 'オー');
    // Remove double long vowel marks
    result = result.replace(/ーー+/g, 'ー');
    // Remove ー at the very start
    result = result.replace(/^ー/, '');
    // Ensure only katakana and ー ッ ・ remain
    result = result.replace(/[^\u30A0-\u30FFー・]/g, '');
    return result;
  }

  /* ========================================
   * MAIN CONVERT FUNCTION
   * ======================================== */
  function convertWord(word, rulesOnly) {
    // Check dictionary first (unless rules-only mode)
    if (!rulesOnly && LOANWORD_DICT[word]) {
      return {
        word: word,
        katakana: LOANWORD_DICT[word],
        phonemes: ['[dictionary]'],
        source: 'dictionary'
      };
    }
    // G2P Pipeline
    var phonemes = graphemeToPhoneme(word);
    var katakana = phonemeToKatakana(phonemes);
    katakana = postProcess(katakana);
    return {
      word: word,
      katakana: katakana,
      phonemes: phonemes,
      source: 'rules'
    };
  }

  function convert(input, options) {
    options = options || {};
    var rulesOnly = options.rulesOnly || false;
    var words = normalize(input);
    var results = words.map(function (w) {
      return convertWord(w, rulesOnly);
    });
    return {
      katakana: results.map(function (r) { return r.katakana; }).join('・'),
      details: results,
      input: input
    };
  }

  /* ========================================
   * EXPORT
   * ======================================== */
  global.KatakanaEngine = {
    normalize: normalize,
    graphemeToPhoneme: graphemeToPhoneme,
    phonemeToKatakana: phonemeToKatakana,
    postProcess: postProcess,
    convert: convert,
    _dict: LOANWORD_DICT
  };

})(typeof window !== 'undefined' ? window : this);
