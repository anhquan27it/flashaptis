/* Tiêu chí "bám sát câu hỏi" cho từng đề Writing (dùng bởi assets/js/relevance.js).
   Gắn vào window.FA_WRITING theo id đề — đề nào chưa khai báo thì chỉ bị kiểm tra mức tối thiểu.
   - p1: kiểu câu trả lời mỗi câu: name | place | age | time | when | freq | weather | open
   - p2 / p3[k] / p4a / p4b: danh sách [nhãn ý còn thiếu, regex, trọng số?] — bài phải chạm tới mỗi nhóm ý.
     Nhóm "cốt lõi" (đúng chủ đề của đề) có trọng số 2 để bài lạc đề không thể qua nhờ các từ chung chung.
   Thêm đề mới: khai báo một mục cùng id trong REL; samples (trường `s`) của đề phải đạt đủ ý. */
(function () {
  const FEEL = /\b(sad\w*|disappoint\w*|upset|sorry|regret\w*|unfortunate\w*|pity|shame|annoy\w*|surpris\w*|happy|glad|pleased|excit\w*|worr\w*|concern\w*|angry|unhappy|shock\w*|frustrat\w*|terrible|awful|unfair|understand|appreciate|feel\w*|nervous|thrill\w*|delight\w*|relie\w*|dislike|hate|not sure|can't believe|cannot believe)\b/i;
  const SUGG = /\b(suggest\w*|propos\w*|recommend\w*|could|would like|how about|what about|why don't|why not|perhaps|maybe|alternatively|instead|solution\w*|should|idea\w*|option\w*|let's|shall|offer\w*|it would be|we can|consider\w*)\b/i;
  const BECAUSE = /\b(because|since|as|so|reason|due to|that's why)\b/i;
  const OPINION = /\b(yes|no|agree|disagree|think|believe|opinion|prefer|rather|should|better|fair|unfair|depends|both|true|right|wrong|important|definitely|probably)\b/i;

  const REL = {
    w1: {
      p1: ["name", "place", "open", "open", "weather"],
      p2: [
        ["chủ đề du lịch/chuyến đi", /\b(travel\w*|trips?|journeys?|explor\w*|discover\w*|tours?|holidays?|adventures?|abroad|sightsee\w*)\b/i, 2],
        ["lý do bạn thích/quan tâm", /\b(because|since|so that|love|enjoy\w*|interest\w*|fascinat\w*|passion\w*|learn\w*|meet|experience\w*|culture\w*|relax\w*)\b/i],
      ],
      p3: [
        [["chuyến đi tốt nhất của bạn", /\b(trips?|travel\w*|journey|holidays?|vacation|tour|stayed|flew|been to|went to|visited)\b/i, 2], ["bối cảnh (khi nào/ở đâu/với ai)", /\b(was|were|went|visited|stayed|saw|did|took|last|ago|years?|summer|winter|when|once)\b/i], ["vì sao đó là chuyến đi tuyệt vời", /\b(best|amazing|beautiful|great|wonderful|unforgettable|fun|enjoy\w*|loved?|memorable|incredible|fantastic|delicious|relax\w*|exciting|impressive|special|favourite)\b/i]],
        [["bạn thích đi một mình hay đi cùng người khác", /\b(alone|solo|myself|with (my |some |other |a )?(friends?|family|people|others|group|partner|someone)|together|group|company)\b/i, 2], ["lý do (Why?)", /\b(because|since|as|so|reason|safe\w*|cheap\w*|cost\w*|lonely|relax\w*|share\w*|freedom|flexib\w*|boring|dangerous)\b/i]],
        [["lời khuyên cho du khách (should/try/…)", /\b(should|must|try|don't|do not|be careful|remember|make sure|avoid|bring|you can|you could|recommend|suggest|need to|have to)\b/i], ["nội dung về khách du lịch/nước bạn (ăn uống, giao thông, văn hóa…)", /\b(tourists?|visitors?|travell?ers?|vietnam\w*|local|street food|traffic|weather|culture|language|temples?|hotels?|motorbikes?|foreigners?)\b/i, 2]],
      ],
      p4a: [["nhắc tới việc hủy chuyến/chuyến đi leo núi/city tour", /\b(cancel\w*|mountain\w*|city tour|tour|trip)\b/i, 2], ["cảm xúc của bạn về việc hủy chuyến", FEEL], ["ý kiến/đề xuất của bạn", /\b(think|idea|suggest|should|could|why don't|maybe|perhaps|how about|let's|shall|next year|instead|ok)\b/i]],
      p4b: [["nhắc đến việc hủy chuyến leo núi", /\b(cancel\w*|mountain\w*|trip|guides?)\b/i, 2], ["cảm nghĩ về việc hủy chuyến đi", FEEL], ["đề xuất cho chuyến tham quan thành phố", SUGG], ["hoạt động cụ thể cho city tour", /\b(museum|old quarter|market|temple|park|lake|cooking|boat|river|walk\w*|food|restaurants?|garden|bridge|pagoda|caf[eé]|shopping|festival|show|sightseeing|zoo|monument|palace|theatre|theater|bike|cycl\w*)\b/i, 2]],
    },
    w2: {
      p1: ["age", "open", "when", "open", "open"],
      p2: [
        ["nói về một cuốn sách", /\b(books?|novels?|stor(y|ies)|authors?|writers?|chapters?|poems?|comics?|magazines?)\b|['"‘“][^'"’”]{3,}['"’”]/i, 2],
        ["vì sao bạn thích/nội dung cuốn sách", /\b(enjoy\w*|love\w*|interesting|exciting|wonderful|amazing|fascinating|beautiful|funny|touching|moving|inspir\w*|meaningful|reminded|learn\w*)\b/i],
      ],
      p3: [
        [["chọn sách giấy hay e-book", /\b(paper|e-?books?|screens?|kindle|digital|print\w*|physical|tablet|real books?)\b/i, 2], ["lý do (Why?)", BECAUSE]],
        [["ý kiến của bạn (đồng ý/không, nên/không nên)", OPINION], ["nhắc tới trẻ em/trò chơi điện tử", /\b(children|kids?|child|video games?|games?|gaming)\b/i, 2], ["lý do/lợi ích/tác hại", /\b(because|since|as|so|help\w*|improve\w*|vocabulary|health\w*|eyes|imagination|brain|educat\w*|bad|harm\w*|useful|benefit\w*|balance)\b/i]],
        [["một nơi bạn thích đọc sách", /\b(places?|room|library|caf[eé]|park|bed|home|house|garden|bedroom|school|corner|sofa|office|shop|bus|train|beach)\b/i, 2], ["mô tả/thời điểm", /\b(quiet|comfortable|peaceful|usually|often|every|mornings?|evenings?|nights?|weekends?|cosy|cozy|relax\w*|calm)\b/i]],
      ],
      p4a: [["nhắc tới họp online/thư viện/giờ họp", /\b(online|meetings?|library|thursday\w*|video|zoom)\b/i, 2], ["cảm xúc của bạn về thay đổi", FEEL], ["lý do/ý kiến của bạn", /\b(because|but|since|so|however|late|miss\w*|prefer|worried|problem|difficult|hard|convenient)\b/i]],
      p4b: [["nhắc tới việc chuyển họp online/thư viện", /\b(online|library|renovat\w*|9|thursday\w*|video calls?)\b/i, 2], ["cảm nghĩ về thay đổi", FEEL], ["đề xuất giải pháp", SUGG], ["giải pháp cụ thể (địa điểm/giờ/hình thức khác)", /\b(caf[eé]|another|different|earlier|venue|room|hybrid|community|cent(er|re)|rent|saturday|sunday|weekends?|afternoon|7|8|p\.?m|a\.?m)\b/i]],
    },
    w3: {
      p1: ["open", "open", "freq", "time", "open"],
      p2: [
        ["mục tiêu bạn muốn đạt", /\b(want|hope|goals?|achieve\w*|aim\w*|wish|would like|plan\w*|improve\w*|become|lose|gain|fitter|stronger|healthier)\b/i],
        ["liên quan thể thao/sức khỏe/bạn bè trong CLB", /\b(sports?|exercise|fit\w*|health\w*|team|train\w*|weight|strong\w*|muscles?|compet\w*|tournament|swim\w*|football|badminton|gym|run\w*|body|stamina|stress|kilos?|friends?)\b/i, 2],
      ],
      p3: [
        [["các môn thể thao phổ biến", /\b(football|soccer|badminton|volleyball|tennis|basketball|swim\w*|running|jogging|table tennis|cycl\w*|yoga|gym|martial|golf|boxing|aerobics)\b/i, 2], ["mức độ phổ biến ở nước bạn", /\b(popular|common|famous|most|everyone|vietnam\w*|my country|national|especially|favourite|favorite|many people)\b/i]],
        [["ý kiến: VĐV có kiếm quá nhiều không", OPINION], ["nhắc tới vận động viên/lương/tiền", /\b(athletes?|players?|salar(y|ies)|paid|earn\w*|income|wages?|sponsor\w*|contract\w*|footballers?)\b/i, 2], ["lý do", /\b(because|since|as|so|however|but|while|although|short|hard|risk\w*|injur\w*|compar\w*|fair|deserve\w*)\b/i]],
        [["các cách khuyến khích", /\b(should|could|can|must|let's|encourage\w*|offer\w*|build|organi[sz]e\w*|provide\w*|create\w*|promote|campaign\w*|invest\w*)\b/i], ["nội dung về vận động/thể thao", /\b(exercise|sports?|fitness|active|activit\w*|gym|PE|outdoor|swim\w*)\b/i, 2], ["đối tượng giới trẻ/trường học", /\b(young|teenagers?|youth|students?|schools?|children|kids|pupils)\b/i]],
      ],
      p4a: [["nhắc tới phí hội viên/khăn/tăng giá", /\b(fee|prices?|costs?|expensive|towels?|increase\w*|200|350|vnd|afford\w*|membership|rise)\b/i, 2], ["cảm xúc của bạn về thay đổi", FEEL], ["ý kiến/hành động bạn dự định", /\b(think|not sure|can't|cannot|shall|should|maybe|perhaps|let's|another|quit|leave|so|too|almost|double)\b/i]],
      p4b: [["nhắc tới phí hội viên/khăn/tăng giá", /\b(fees?|prices?|costs?|increase\w*|rise|raise\w*|towels?|200|350|vnd|membership|expensive)\b/i, 2], ["ý kiến/lo ngại của bạn", FEEL], ["đề xuất", SUGG], ["giải pháp cụ thể (giảm giá, tăng dần, thuê khăn…)", /\b(discounts?|students?|gradual\w*|instal?ments?|half|monthly|cheaper|lower|reduc\w*|rent\w*|bring|own|packages?|six months|advance|annual|freeze|compromise|limit)\b/i]],
    },
  };

  (window.FA_WRITING || []).forEach((t) => {
    const r = REL[t.id];
    if (!r) return;
    t.p1.questions.forEach((q, k) => (q.t = r.p1[k]));
    t.p2.r = r.p2;
    t.p3.questions.forEach((q, k) => (q.r = r.p3[k]));
    t.p4.informal.r = r.p4a;
    t.p4.formal.r = r.p4b;
  });
})();
