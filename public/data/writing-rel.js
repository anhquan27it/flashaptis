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
    w4: {
      p1: ["open", "open", "open", "open", "open"],
      p2: [
        ["nêu một bức tranh/bức ảnh bạn thích", /\b(paint\w*|photos?|photograph\w*|pictures?|portrait|landscape|artwork|art|image|drawing|mona|picture|scene|sunset|sunrise|lake|mountain|sea|river|flowers?|painter|artist)\b/i, 2],
        ["lý do/cảm nhận (đẹp, màu sắc, gợi cảm xúc…)", /\b(because|since|beautiful|colou?r\w*|calm\w*|peace\w*|relax\w*|feel\w*|makes? me|remind\w*|memor\w*|love|like|enjoy\w*|amazing|lovely|warm|bright|famous|favou?rite)\b/i],
      ],
      p3: [
        [["nêu một món đồ bạn giữ lâu", /\b(have|had|kept|keep|owned?|since|ring|watch|toy|book|box|bag|necklace|bike|bicycle|photo\w*|doll|teddy|gift|guitar|camera|phone|painting|picture|letter\w*|car|pen|clock|diary|hat|scarf|jacket|something|thing)\b/i, 2], ["thời gian giữ/nguồn gốc/lý do quý", /\b(years?|months?|since|ago|when i was|childhood|child|young|grand\w*|mother|father|parents?|friend\w*|gave|given|gift|because|special|memor\w*|remind\w*|sentimental)\b/i]],
        [["lời khuyên có nên học khóa ở trường không", /\b(should|shouldn't|yes|no|definitely|i think|i suggest|i recommend|advice|go for|take the course|join|enrol\w*|sign up|worth|good idea)\b/i, 2], ["lý do/gợi ý cách học (giáo viên, thực hành, video…)", /\b(because|since|teacher\w*|instructor\w*|lessons?|classes?|course\w*|practi[sc]e|learn\w*|online|videos?|tutorials?|books?|feedback|skills?|techniques?|cheap\w*|expensive|time|college|beginners?)\b/i]],
        [["ý kiến đồng ý/không đồng ý về street art", OPINION], ["nhắc tới nghệ thuật đường phố/vẽ lên tường", /\b(street|graffiti|mural\w*|wall\w*|build\w*|paint\w*|art\w*|public)\b/i, 2], ["lý do (đẹp/phá hoại/giấy phép…)", /\b(because|since|beautiful|colou?r\w*|creative\w*|permission|illegal|vandal\w*|damage|dirty|clean\w*|ugly|property|owners?|city|free|brighten\w*|attract\w*|tourists?|expression|allow\w*|rules?)\b/i]],
      ],
      p4a: [["nhắc tới buổi nói chuyện/nghệ sĩ/CLB", /\b(talks?|artists?|painter\w*|speaker|members?|public|event|invite\w*|attention|club)\b/i, 2], ["cảm xúc của bạn", FEEL], ["điều bạn dự định làm (gợi ý nghệ sĩ/chủ đề)", /\b(plan\w*|want|would like|'d like|going to|will|suggest\w*|recommend\w*|propos\w*|invite\w*|ask\w*|contact\w*|topic|could|maybe|let's)\b/i]],
      p4b: [["nhắc tới buổi nói chuyện/thành viên trẻ và lớn tuổi", /\b(talks?|public|members?|young|elderly|old|older|retired|children|students|seniors?|attract\w*|attention|audience|event)\b/i, 2], ["cảm nghĩ của bạn", FEEL], ["đề xuất một nghệ sĩ cụ thể", /\b(artists?|painter\w*|sculptor|photographer|illustrator|designer|mr|mrs|ms|miss|dr|professor|teacher|local)\b/i, 2], ["đề xuất chủ đề buổi nói chuyện", /\b(topics?|subjects?|theme|about|talk about|share|discuss\w*|focus\w*|techniques?|history|inspir\w*|colou?r\w*|painting|techniques)\b/i, 2], ["lý do chủ đề thu hút (SUGG/BECAUSE)", SUGG]],
    },
    w5: {
      p1: ["open", "open", "place", "weather", "open"],
      p2: [
        ["lý do tham gia gắn với nhà cửa/trang trí/thiết kế", /\b(home\w*|house\w*|decorat\w*|design\w*|interior\w*|furniture|garden\w*|beautiful|room\w*|apartment|flat|renovat\w*|architect\w*|style|ideas?|tips?|living)\b/i, 2],
        ["lý do/mong muốn của bạn (because/want/hope…)", /\b(because|since|so that|want\w*|hope|would like|wish|enjoy\w*|love|interest\w*|to (learn|share|meet|make|improve|get|find|build|decorate|design))\b/i],
      ],
      p3: [
        [["nói về quan hệ với hàng xóm", /\b(neighbou?r\w*|next door|building|street|apartment|flat|live next|community)\b/i, 2], ["mô tả mối quan hệ (tốt/xấu, ví dụ)", /\b(good|great|friendly|nice|kind|bad|poor|quiet|noisy|noise|polite|helpful|help\w*|hello|greet\w*|share\w*|talk\w*|chat\w*|relationship|get along|rarely|never|don't know|close)\b/i]],
        [["chọn nhà cũ hay hiện đại", /\b(old|modern|new|traditional|contemporary|classic|ancient|historic\w*|buildings?|houses?|apartments?|prefer)\b/i, 2], ["lý do (Why?)", /\b(because|since|as|so|reason|charm\w*|character|comfort\w*|lifts?|elevators?|security|clean\w*|convenien\w*|history|heritage|cheap\w*|expensive|space|safe\w*|facilit\w*|atmosphere|beautiful|maintain\w*)\b/i]],
        [["ý kiến đồng ý/không đồng ý", OPINION], ["nhắc tới nhà thiết kế thân thiện môi trường", /\b(environment\w*|eco\w*|green|energy|solar|insulat\w*|recycl\w*|pollut\w*|sustainab\w*|nature|planet|climate|natural|save|saving|waste|electricity|water|carbon)\b/i, 2], ["lý do/ví dụ", /\b(because|since|for example|for instance|such as|helps?|reduce\w*|protect\w*|save\w*|bills?|money|future|healthy|cost\w*)\b/i]],
      ],
      p4a: [["nhắc tới đề xuất phá nhà cũ/xây nhà hiện đại", /\b(old buildings?|knock\w*|demolish\w*|destroy\w*|pull\w* down|tear\w* down|modern|blocks?|buildings?|proposal|plan|government|heritage|history)\b/i, 2], ["cảm xúc của bạn", FEEL], ["ý kiến/điều bạn nghĩ", /\b(think|believe|opinion|should|agree|disagree|against|support|oppose|idea|plan|let's|will|want|would like|hope)\b/i]],
      p4b: [["nhắc tới đề xuất phá dỡ nhà cũ/chi phí/không gian", /\b(old buildings?|knock\w*|demolish\w*|destroy\w*|pull\w* down|tear\w* down|modern|blocks?|buildings?|proposal|plan|government|cost\w*|maintenance|space|heritage|history)\b/i, 2], ["cảm nghĩ của bạn", FEEL], ["quan điểm (đồng ý/phản đối) kèm lý do", /\b(agree|disagree|against|support|oppose|in favou?r|because|since|reason|important|worried|concern\w*|think|believe|opinion)\b/i, 2], ["đề xuất điều CLB nên làm", SUGG]],
    },
    w6: {
      p1: ["open", "open", "open", "open", "open"],
      p2: [
        ["nhắc tới việc cần sách/tài liệu nghiên cứu/học tập", /\b(books?|journals?|materials?|research\w*|thesis|study\w*|stud\w*|graduat\w*|library|resources?|documents?|papers?|articles?|reference\w*|final|project|borrow\w*|read\w*)\b/i, 2],
        ["lý do/mong muốn tham gia CLB", /\b(because|since|so that|so|want\w*|hope|would like|wish|need\w*|join\w*|help\w*|access|find|to (borrow|find|get|read|learn|meet|share|research|study))\b/i],
      ],
      p3: [
        [["nêu thời gian đọc sách", /\b(morning|afternoon|evening|night|bed\w*|weekends?|holidays?|lunch|dinner|breakfast|commut\w*|free time|after|before|every|daily|usually|often|sometimes|when|at \d|o'?clock|\d)\b/i, 2], ["nêu địa điểm đọc sách", /\b(home|house|room|bedroom|living room|sofa|library|cafe|coffee|park|garden|bus|train|office|school|bed|desk|balcony|campus|in|at)\b/i, 2]],
        [["gợi ý một cuốn sách/thể loại để tặng", /\b(book\w*|novel\w*|story|stories|fiction|poetry|poems?|biograph\w*|comic\w*|cookbook|dictionary|magazine|series|author|title|classic|self-help|history|memoir\w*|buy|get|give|gift)\b/i, 2], ["lời gợi ý/lý do (suggest/could/because)", /\b(could|should|suggest\w*|recommend\w*|try|how about|why not|maybe|perhaps|if|depends|because|since|likes?|enjoy\w*|interest\w*|favou?rite|good choice|great)\b/i]],
        [["ý kiến về sách điện tử thay thế sách giấy", OPINION], ["nhắc tới sách điện tử/sách giấy", /\b(online|e-?books?|digital|electronic|paper|printed|traditional|physical|kindle|screens?|tablets?|phones?|real books?|books?)\b/i, 2], ["lý do (tiện lợi/chi phí/cảm giác/mắt…)", /\b(because|since|cheap\w*|convenien\w*|easy|easier|portable|carry|light|smell|feel\w*|eyes?|comfort\w*|battery|space|save\w*|prefer\w*|replace\w*|never|fully|still)\b/i]],
      ],
      p4a: [["nhắc tới việc ngừng sách miễn phí/giao hàng chậm", /\b(free books?|free|monthly|delivery|deliver\w*|wait\w*|weeks?|late|slow\w*|delay\w*|orders?|stop\w*|no longer|offer)\b/i, 2], ["cảm xúc của bạn", FEEL], ["điều CLB nên làm", SUGG]],
      p4b: [["nhắc tới việc ngừng sách miễn phí/giao hàng 4–6 tuần", /\b(free books?|free|monthly|delivery|deliver\w*|wait\w*|weeks?|late|slow\w*|delay\w*|orders?|stop\w*|no longer|offer|announcement)\b/i, 2], ["cảm nghĩ của bạn", FEEL], ["đề xuất điều CLB nên làm", SUGG, 2], ["lý do/giải pháp cụ thể", /\b(discount\w*|voucher|coupon|company|courier|bookshop|bookstore|e-?books?|digital|local|every (two|three|few)|borrow\w*|library|refund|compensat\w*|points?|loyal\w*|alternative|replace\w*|instead|because|since)\b/i]],
    },
    w7: {
      p1: ["open", "open", "open", "open", "open"],
      p2: [
        ["nêu khi nào và tần suất xem phim", /\b(\d+|once|twice|times?|every|daily|weekly|monthly|often|sometimes|usually|always|rarely|weekends?|evenings?|nights?|mornings?|afternoons?|saturday|sunday|friday|week|month|year|holidays?|free time)\b/i, 2],
        ["nhắc tới xem phim (rạp, nhà, TV, online…)", /\b(films?|movies?|cinema|theat(er|re)|watch\w*|tv|television|netflix|online|home|screen)\b/i],
      ],
      p3: [
        [["nêu chỗ ngồi bạn thích khi xem phim", /\b(sit\w*|seats?|front|back|middle|centre|center|near|far|row|screen|corner|aisle|close|behind)\b/i, 2], ["ăn/uống trong lúc xem hay không", /\b(eat\w*|drink\w*|popcorn|snacks?|coke|soda|water|food|candy|never|always|usually|sometimes|buy)\b/i]],
        [["nêu thích phim hiện đại hay phim cũ", /\b(modern|new|old|classic|black|white|prefer\w*|older|recent|latest|colou?r\w*)\b/i, 2], ["lý do (Why?)", /\b(because|since|as|so|reason|effects?|stor(y|ies)|acting|actors?|music|boring|exciting|interesting|quality|sound|technology|fun|enjoy\w*)\b/i]],
        [["ý kiến đồng ý/không đồng ý về việc không cần rạp chiếu phim", OPINION], ["nhắc tới rạp/xem ở nhà/TV/online", /\b(cinemas?|theat(er|re)s?|home|tv|television|online|streaming|netflix|screen|films?|movies?)\b/i, 2], ["lý do (âm thanh, trải nghiệm, tiện lợi, giá…)", /\b(because|since|as|so|experience|sound|screen|big|huge|atmosphere|share|friends|comfort\w*|convenient|cheap\w*|expensive|price|ticket\w*|time|distract\w*|special)\b/i]],
      ],
      p4a: [["nhắc tới điện thoại/cấm điện thoại/buổi chiếu phim", /\b(phones?|mobiles?|ban\w*|films?|movies?|cinema|show\w*|club|complaints?|turn off|silent)\b/i, 2], ["đề xuất của bạn", SUGG, 2], ["lý do cho đề xuất", BECAUSE]],
      p4b: [["nhắc tới việc dùng/cấm điện thoại trong buổi chiếu", /\b(phones?|mobiles?|ban\w*|films?|movies?|cinema|show\w*|complaints?|turn\w* off|silent|calls?|texts?|screens?)\b/i, 2], ["ý kiến của bạn về việc cấm điện thoại", OPINION], ["các đề xuất khác", SUGG, 2], ["lý do/giải thích", BECAUSE], ["biện pháp cụ thể (khu vực gọi điện, nhắc nhở, phạt, gửi điện thoại…)", /\b(areas?|rooms?|outside|lobby|reminders?|announce\w*|video|sign\w*|warning\w*|fine\w*|staff|leave|ask\w*|silent|vibrat\w*|lock\w*|box|deposit|emergenc\w*|calls?)\b/i, 2]],
    },
    w8: {
      p1: ["open", "open", "open", "open", "open"],
      p2: [
        ["nêu ngày/giờ có thể học", /\b(\d+|monday|tuesday|wednesday|thursday|friday|saturday|sunday|weekdays?|weekends?|mornings?|afternoons?|evenings?|nights?|o'?clock|a\.?m|p\.?m|days?|times?|after|before|every)\b/i, 2],
        ["nêu môn/khóa muốn học", /\b(study\w*|learn\w*|courses?|subjects?|english|maths?|computer\w*|business|art|music|science|history|cooking|design|languages?|lessons?|classes|would like|want)\b/i, 2],
      ],
      p3: [
        [["nêu khóa học đang theo", /\b(course|study\w*|doing|major|degree|business|english|computer\w*|engineering|art|design|medicine|law|nursing|marketing|management|accounting|science|language\w*|IT|tourism|economics)\b/i, 2], ["lý do chọn khóa học", BECAUSE]],
        [["nêu cảm nhận về trường", FEEL, 2], ["nhận xét về trường (giáo viên, bạn học, cơ sở…)", /\b(college|campus|teachers?|students?|classes|friends?|friendly|helpful|library|facilit\w*|lessons?|courses?|great|good|nice|busy|big|difficult|easy|enjoy\w*|love|kind)\b/i]],
        [["cảm nghĩ/ý kiến về việc CLB thể thao đóng cửa", OPINION], ["nhắc tới thể thao/CLB/trường", /\b(sports?|club|college|close\w*|open|exercise|fitness|team\w*|health\w*|gym|football|students?)\b/i, 2], ["lý do/đề nghị", /\b(because|since|as|so|reason|important|healthy|friends?|fun|should|hope|could|pity|shame|sorry|stress)\b/i]],
      ],
      p4a: [["nhắc tới kỳ thi/lịch thi bị đổi sớm", /\b(exams?|tests?|dates?|earlier|early|schedule\w*|changed?|moved?|7th|21st|time|weeks?)\b/i, 2], ["điều bạn nghĩ trường nên làm", SUGG, 2], ["lý do", BECAUSE]],
      p4b: [["nhắc tới kỳ thi bị dời sớm hơn", /\b(exams?|tests?|dates?|earlier|early|schedule\w*|changed?|moved?|7th|21st|weeks?|notice)\b/i, 2], ["điều trường nên làm (đề xuất)", /\b(should|could|ought|suggest\w*|recommend\w*|propos\w*|would like|ask\w*|request\w*|need\w*|must|offer\w*|allow\w*|provide\w*|give\w*)\b/i, 2], ["giải pháp cụ thể (ôn tập, kéo dài thời gian, thi lại, hỗ trợ…)", /\b(revision|revise|review|extra|classes|lessons?|practice|papers?|support|help|tutor\w*|deadline|postpone\w*|delay\w*|resit|retake|original|extend\w*|more time|prepare|preparation|materials|notes)\b/i, 2], ["lý do/cảm nghĩ", /\b(because|since|as|so|reason|surpris\w*|worr\w*|stress\w*|unfair|concern\w*|disappoint\w*|feel\w*|difficult\w*|less time|not enough time)\b/i]],
    },
    w9: {
      p1: ["open", "open", "weather", "open", "open"],
      p2: [
        ["lý do tham gia gắn với cộng đồng (gặp gỡ, giúp đỡ, tình nguyện…)", /\b(communit\w*|neighbou?r\w*|volunteer\w*|help\w*|local|meet\w*|people|friends?|social\w*|charit\w*|together|support\w*|area)\b/i, 2],
        ["lý do/mong muốn của bạn (because/want/hope…)", /\b(because|since|so that|want\w*|hope|would like|wish|enjoy\w*|love|interest\w*|to (meet|help|learn|make|improve|get|find|support|do))\b/i],
      ],
      p3: [
        [["các cách/phương tiện khác để tới tiệm tóc", /\b(bus\w*|taxi\w*|grab|uber|cab|bike|bicycle|cycl\w*|motorbike|walk\w*|on foot|train|metro|subway|lift|ride|drive|borrow\w*|scooter|tram)\b/i, 2], ["lời gợi ý (could/should/can…)", /\b(could|should|can|suggest\w*|recommend\w*|try|how about|why not|maybe|perhaps|alternatively|options?|best way|easiest)\b/i]],
        [["ý kiến đồng ý/không đồng ý", OPINION], ["nhắc tới hoạt động tình nguyện", /\b(volunteer\w*|charit\w*|helping|communit\w*|non-?profit|orphan\w*|elderly|homeless|donat\w*)\b/i, 2], ["lý do/ví dụ (học được gì, giúp được ai)", /\b(because|since|for example|for instance|learn\w*|skills?|experience\w*|help\w*|team\w*|communicat\w*|confiden\w*|happ\w*|support\w*)\b/i]],
        [["ý kiến đồng ý/không đồng ý", OPINION], ["nhắc tới tình nguyện là một cách học", /\b(volunteer\w*|learn\w*|lessons?|skills?|experience\w*|educat\w*|teach\w*)\b/i, 2], ["lý do (Why?)", /\b(because|since|as|so|reason|for example|for instance|such as|help\w*|make\w*|responsib\w*|confiden\w*)\b/i]],
      ],
      p4a: [["nhắc tới việc CLB cần thêm thành viên/ý tưởng/dự án", /\b(members?|ideas?|projects?|activit\w*|support\w*|help\w*|participat\w*|tasks?)\b/i, 2], ["cảm xúc của bạn", FEEL], ["điều bạn muốn làm", /\b(want|would like|'d like|'d love|plan\w*|going to|will|hope|could|maybe|let's|shall|join\w*|volunteer\w*|organi[sz]\w*|start\w*)\b/i]],
      p4b: [["nhắc tới thành viên/dự án/hoạt động của CLB", /\b(members?|projects?|activit\w*|tasks?|participat\w*|involved|support\w*)\b/i, 2], ["cảm nghĩ của bạn", FEEL], ["đề xuất/điều bạn muốn làm", SUGG], ["ý tưởng hoạt động cụ thể", /\b(class\w*|market|clean-?up|charit\w*|fundrais\w*|festival|workshops?|social media|facebook|events?|competitions?|campaigns?|fair|concerts?|tours?|sports?|garden\w*|food|donat\w*|recycl\w*|plant\w*|elderly|children|teach\w*)\b/i, 2]],
    },
    w10: {
      p1: ["open", "open", "open", "open", "open"],
      p2: [
        ["nêu khi nào dùng máy tính", /\b(\d+|every|daily|always|usually|often|sometimes|mornings?|afternoons?|evenings?|nights?|weekends?|weekdays?|hours?)\b/i, 2],
        ["nêu dùng máy tính ở đâu", /\b(home|office|work|school|college|university|class\w*|library|caf[eé]|room|bedroom|desk|company|house|at|in|everywhere|anywhere|train|bus)\b/i, 2],
      ],
      p3: [
        [["giải pháp giúp bà dùng máy tính (dạy, lớp học…)", /\b(teach\w*|show\w*|help\w*|class\w*|course\w*|lessons?|tutorial\w*|learn\w*|practi[sc]e|train\w*|explain\w*|guide\w*|step|patient\w*|simple|video calls?|tablet|instruct\w*)\b/i, 2], ["lời gợi ý (could/should…)", SUGG]],
        [["nêu lần gần nhất dùng máy tính", /\b(today|yesterday|last|this (morning|afternoon|evening)|tonight|ago|just|recently|used|was|did|had|wrote|checked|sent|searched|watched|played)\b/i, 2], ["mục đích sử dụng (làm việc, học, giải trí…)", /\b(work\w*|study\w*|homework|report\w*|emails?|online|internet|search\w*|watch\w*|games?|play\w*|video\w*|music|chat\w*|research|shopping|assignment\w*|project\w*|write|wrote|read|learn\w*|check\w*|send|sent|design\w*|code|coding|program\w*)\b/i, 2]],
        [["ý kiến đồng ý/không đồng ý", OPINION], ["nhắc tới việc dùng máy tính nhiều/công nghệ", /\b(computers?|laptops?|screens?|technology|internet|online|devices?|too much|a lot|hours?|use\w*|digital)\b/i, 2], ["lý do (hại mắt, lười vận động, hữu ích…)", /\b(because|since|as|so|eyes|health\w*|sitting|sit|back|sleep|addict\w*|waste|useful|helpful|benefit\w*|harm\w*|problem\w*|wisely|balance|exercise|however|but|work|study|convenient)\b/i]],
      ],
      p4a: [["nhắc tới trang web/thành viên mới của CLB", /\b(websites?|sites?|pages?|design\w*|members?|club|online|join\w*|attract\w*|change\w*|new)\b/i, 2], ["cảm xúc của bạn", FEEL], ["đề xuất của bạn", SUGG, 2]],
      p4b: [["nhắc tới việc chỉnh sửa trang web để thu hút thành viên", /\b(websites?|sites?|pages?|design\w*|members?|attract\w*|join\w*|club|plan|online|visitors?)\b/i, 2], ["cảm xúc của bạn về kế hoạch", FEEL], ["đề xuất cải thiện trang web", SUGG, 2], ["đề xuất cụ thể (ảnh, video, form, giao diện, di động…)", /\b(photos?|pictures?|videos?|gallery|forms?|register\w*|registration|sign up|mobile|phones?|layout|design\w*|colou?rs?|menu|content|news|blog|events?|calendar|forum|chat|social media|facebook|search|simple|clear|fast|easy|interface|logo|tutorials?|reviews?|testimonials?)\b/i, 2], ["lý do", BECAUSE]],
    },
    w11: {
      p1: ["open", "open", "open", "open", "open"],
      p2: [
        ["nêu ngày/giờ có thể tham gia", /\b(mondays?|tuesdays?|wednesdays?|thursdays?|fridays?|saturdays?|sundays?|weekends?|weekdays?|mornings?|afternoons?|evenings?|nights?|o'?clock|a\.?m|p\.?m|\d|every|daily|weekly|after (work|school)|free|from|till|until)\b/i, 2],
        ["món ăn/món muốn nấu", /\b(cook\w*|dish\w*|food|recipes?|soup|cake\w*|pasta|noodles?|pho|rice|rolls?|pizza|salad|chicken|beef|fish|pork|bread|bake\w*|dessert\w*|curry|sushi|pancakes?|meals?|cookies|biscuits?|stew|sandwich\w*|burgers?|steak|dumplings?|vietnamese|italian|japanese|french|traditional|learn\w*|make|prepare)\b/i, 2],
      ],
      p3: [
        [["lý do tham gia câu lạc bộ", /\b(because|since|as|so|reason|want\w*|hope|wish|would like|love|enjoy\w*|interest\w*|to (learn|cook|meet|make|improve|try|get))\b/i, 2], ["liên quan đến nấu ăn/bạn bè/học hỏi", /\b(cook\w*|food|recipes?|dish\w*|meals?|friends?|people|learn\w*|skills?|bak\w*|healthy|chef|kitchen|family|new)\b/i]],
        [["nhận xét về mức phí (rẻ/đắt/hợp lý…)", /\b(fee|price\w*|cost\w*|cheap\w*|expensive|reasonable|affordable|worth|pay\w*|money|high|low|fair|too much|good value|budget|dong|dollars?)\b/i, 2], ["ý kiến/lý do", OPINION], ["lý do/so sánh", BECAUSE]],
        [["tần suất đến câu lạc bộ", /\b(once|twice|times?|every|daily|weekly|monthly|often|sometimes|usually|always|rarely|seldom|occasionally|days?|weeks?|months?|weekends?|mondays?|tuesdays?|wednesdays?|thursdays?|fridays?|saturdays?|sundays?|\d)\b/i, 2], ["nhắc tới việc đến câu lạc bộ/lớp", /\b(go|going|attend\w*|visit\w*|come|club|class\w*|session\w*|lessons?|there|meet\w*)\b/i]],
      ],
      p4a: [["nhắc tới việc hủy lớp/giáo viên đi nghỉ/học phí không hoàn", /\b(cancel\w*|class\w*|instructor|teacher|holiday|vacation|fees?|refund\w*|lessons?|announce\w*|next week)\b/i, 2], ["cảm xúc của bạn", FEEL], ["điều bạn dự định làm", /\b(plan\w*|going to|will|want|would like|'d like|'ll|hope|could|maybe|let's|shall|practi[cs]e\w*|cook\w*|ask\w*|wait\w*|instead)\b/i]],
      p4b: [["nhắc tới việc hủy lớp/giáo viên nghỉ/học phí không hoàn lại", /\b(cancel\w*|class\w*|instructor|teacher|holiday|vacation|fees?|refund\w*|lessons?|announce\w*|next week)\b/i, 2], ["suy nghĩ/cảm xúc của bạn", FEEL], ["đề xuất/điều bạn muốn làm", SUGG], ["đề xuất cụ thể (học bù, báo lịch mới, hoàn phí, hoạt động thay thế)", /\b(replace\w*|make up|rearrange\w*|reschedul\w*|new dates?|later|refund\w*|compensat\w*|discount\w*|extra|additional|credit|practi[cs]e|session\w*|volunteer\w*|online|video|recipes?|inform\w*|notify|let us know|schedule\w*)\b/i, 2]],
    },
    w12: {
      p1: ["place", "weather", "open", "open", "open"],
      p2: [
        ["chủ đề hay nói với bạn bè", /\b(talk\w*|chat\w*|discuss\w*|about|topics?|share\w*|speak\w*|tell\w*|gossip\w*)\b/i, 2],
        ["nội dung cụ thể (học tập, phim, âm nhạc, thể thao, tin tức, kế hoạch…)", /\b(stud\w*|school|university|class\w*|work|jobs?|movies?|films?|music|songs?|sports?|football|games?|news|plans?|weekend\w*|hobb\w*|family|life|travel\w*|food|books?|politics|fashion|problems?|future|friends?|exams?|everything|anything)\b/i],
      ],
      p3: [
        [["cách tìm hiểu tin tức/vấn đề thế giới", /\b(news\w*|internet|online|websites?|social|facebook|youtube|tiktok|twitter|television|tv|radio|newspapers?|magazines?|podcasts?|apps?|phone|read\w*|watch\w*|listen\w*|articles?|google|documentar\w*|discuss\w*|talk\w*)\b/i, 2], ["cách/nguồn cụ thể bạn dùng (I + động từ)", /\b(i|my|we|usually|often|mostly|sometimes|learn\w*|follow\w*|check\w*|find\w*)\b/i]],
        [["lời khuyên để gây ấn tượng khi tranh biện", /\b(prepar\w*|practi[cs]e\w*|rehears\w*|confiden\w*|speak\w*|clear\w*|slow\w*|eye contact|smile|research\w*|dress\w*|calm\w*|voice|structure\w*|notes?|polite\w*|listen\w*|relax\w*|argument\w*|evidence|examples?|facts?|audience|body language|posture)\b/i, 2], ["lời gợi ý (should/try/can…)", /\b(should|could|can|try|suggest\w*|recommend\w*|advice|make sure|need|must|remember|important|have to|don't)\b/i]],
        [["ý kiến về việc xem xét cả hai phía", OPINION], ["nhắc tới hai phía/quan điểm/quyết định", /\b(both|sides?|opinions?|views?|viewpoints?|perspectives?|decisions?|choices?|issues?|different|opposite|other|fair|balanced|consider\w*|listen\w*|understand\w*|compare\w*|pros|cons|advantages|disadvantages)\b/i, 2], ["lý do", BECAUSE]],
      ],
      p4a: [["nhắc tới lợi ích của việc học tranh biện/nói trước công chúng", /\b(benefits?|advantages?|debat\w*|public|speaking|speak\w*|confiden\w*|skills?|learn\w*|think\w*|useful|help\w*|improv\w*)\b/i, 2], ["nêu ít nhất hai lợi ích (first/second/also…)", /\b(first\w*|second\w*|two|also|another|and|both|one|other|besides|plus|moreover)\b/i], ["mời bạn tham gia/cảm xúc", /\b(join\w*|come|why don't|should|let's|would like|want|hope|excit\w*|happy|glad|sure|invite\w*|together|try)\b/i]],
      p4b: [["nhắc tới lợi ích của việc học tranh biện/nói trước công chúng", /\b(benefits?|advantages?|debat\w*|public|speaking|speak\w*|confiden\w*|skills?|learn\w*|thinking|useful|help\w*|improv\w*)\b/i, 2], ["lợi ích 1: sự tự tin/kỹ năng nói", /\b(confiden\w*|nervous\w*|fear|anxiety|shy\w*|communicat\w*|speaking skills?|self-?esteem|express\w*|articulat\w*|fluen\w*|presentation\w*|interview\w*)\b/i, 2], ["lợi ích 2: tư duy/lập luận/lắng nghe/nghiên cứu", /\b(think\w*|critical|argument\w*|reason\w*|logic\w*|research\w*|listen\w*|analy[sz]\w*|knowledge|understand\w*|both sides|opinions?|views?|persua\w*|creativ\w*|teamwork|vocabulary|english)\b/i, 2], ["cách thu hút thành viên/đề xuất", SUGG]],
    },
    w13: {
      p1: ["open", "open", "open", "open", "open"],
      p2: [
        ["mục đích dùng internet", /\b(email\w*|mails?|videos?|news|social|facebook|youtube|tiktok|study\w*|learn\w*|search\w*|google|research\w*|chat\w*|messag\w*|shop\w*|online|games?|music|films?|movies?|work|read\w*|watch\w*|listen\w*|stream\w*|banking|information|entertain\w*|communicat\w*|call\w*|browse\w*|surf\w*|download\w*|play\w*)\b/i, 2],
        ["dùng làm gì (use ... to/for)", /\b(use\w*|for|to|mostly|usually|often|mainly)\b/i],
      ],
      p3: [
        [["cách học tiếng Anh", /\b(learn\w*|study\w*|practi[cs]\w*|watch\w*|listen\w*|read\w*|speak\w*|talk\w*|chat\w*|films?|movies?|songs?|music|podcasts?|videos?|apps?|books?|class\w*|course\w*|teacher\w*|vocabulary|subtitles?|youtube|online|friends?|write|writing|memori[sz]\w*|flashcards?)\b/i, 2], ["thói quen của bạn (I + động từ)", /\b(i|my|we|usually|often|every|daily|each|sometimes|mostly|try|tries)\b/i]],
        [["ý kiến đồng ý/không đồng ý về tiếng Anh phổ biến", OPINION], ["nhắc tới tiếng Anh/ngôn ngữ toàn cầu", /\b(english|language\w*|world\w*|global\w*|international\w*|countr\w*|common|spoken|speak\w*|communicat\w*|business|travel\w*|popular|lingua franca|everywhere|worldwide)\b/i, 2], ["lý do/lợi ích", /\b(because|since|as|so|reason|useful|jobs?|careers?|opportunit\w*|business|travel\w*|internet|culture\w*|education|science|communicat\w*|help\w*|important|benefit\w*|allow\w*|lets?)\b/i]],
        [["thời điểm dùng tiếng Anh", /\b(when|at|in the|on|during|every|daily|always|usually|often|sometimes|morning|afternoon|evening|night|weekends?|weekdays?|work|school|university|class\w*|meetings?|travel\w*|holidays?|\d|free time|whenever)\b/i, 2], ["nhắc tới việc dùng tiếng Anh/hoạt động cụ thể", /\b(english|speak\w*|talk\w*|write|writing|email\w*|read\w*|watch\w*|listen\w*|chat\w*|study\w*|use\w*|films?|movies?|work|clients?|friends?|customers?|tourists?|foreigners?|colleagues?|online|internet|abroad)\b/i]],
      ],
      p4a: [["nhắc tới từ/cụm từ mới hoặc quy tắc của ngôn ngữ", /\b(new words?|phrases?|vocabulary|language\w*|words?|rules?|slang|english|grammar|dictionar\w*)\b/i, 2], ["quan điểm của bạn", OPINION], ["lý do vì sao nhiều người phản ứng", /\b(because|since|as|so|reason|why|worr\w*|fear\w*|afraid|traditi\w*|old|young|change\w*|standards?|identity|culture|confus\w*|react\w*|strong\w*|feel\w*|angry|upset|protect\w*|lose|lost|disappear\w*)\b/i]],
      p4b: [["nhắc tới từ/cụm từ mới hoặc quy tắc của ngôn ngữ", /\b(new words?|phrases?|vocabulary|language\w*|words?|rules?|slang|english|grammar|dictionar\w*)\b/i, 2], ["quan điểm của bạn", OPINION], ["giải thích vì sao nhiều người phản ứng mạnh", /\b(because|since|as|so|reason|why|worr\w*|fear\w*|afraid|traditi\w*|identity|culture|confus\w*|react\w*|strong\w*|upset|protect\w*|standards?|lose|lost|disappear\w*|feel like)\b/i, 2], ["nêu hai phía (người chấp nhận / người muốn có quy tắc)", /\b(some|others?|while|whereas|however|on the other hand|both|older|younger|accept\w*|welcome\w*|against|support\w*|rules?|regulat\w*|balance)\b/i], ["đề xuất/giải pháp", SUGG]],
    },
    w14: {
      p1: ["open", "open", "open", "open", "open"],
      p2: [
        ["nói về phim ảnh", /\b(films?|movies?|cinema|actors?|actress\w*|directors?|stor(y|ies)|characters?|scenes?)\b/i, 2],
        ["kể tên/thể loại phim yêu thích", /\b(action|comed(y|ies)|dramas?|romantic|romance|horror|cartoons?|animat\w*|sci-?fi|science fiction|thrillers?|documentar\w*|superhero\w*|fantasy|adventure|musicals?|detective)\b|['"‘“][^'"’”]{3,}['"’”]/i],
        ["lý do thích xem", /\b(because|since|as|reason|that's why|so)\b/i],
      ],
      p3: [
        [["tần suất xem phim", /\b(once|twice|times?|every|daily|weekly|monthly|often|usually|sometimes|always|rarely|never|weekends?|weeks?|months?|days?|nights?|evenings?)\b/i, 2], ["bối cảnh (ở đâu/với ai/vì sao)", /\b(cinema|home|online|netflix|tv|television|laptop|phone|friends?|family|alone|because|busy|relax\w*)\b/i]],
        [["bộ phim đầu tiên bạn xem (tên/khi nào)", /\b(first|films?|movies?|cartoons?|cinema|watched|saw|when i was|years? old|child|kid|ago)\b/i, 2], ["bộ phim đó như thế nào", /\b(funny|exciting|scary|sad|boring|interesting|amazing|beautiful|colou?rful|cried|laughed|loved?|enjoy\w*|remember\w*|frightened|wonderful|great|moving|happy)\b/i]],
        [["điều bạn muốn học/khám phá", /\b(learn\w*|understand\w*|know\w*|find out|skills?|improve\w*|discover\w*|how to|how \w+|techniques?)\b/i], ["nội dung liên quan đến phim ảnh", /\b(films?|movies?|cinema|direct\w*|act\w*|scripts?|stor(y|ies)|camera|editing|review\w*|critic\w*|genres?|music|characters?|making)\b/i, 2]],
      ],
      p4a: [["nhắc tới buổi nói chuyện của James McAvoy bị hủy/dời", /\b(james|mcavoy|mc avoy|actor|talk|guest|cancel\w*|postpon\w*|reschedul\w*|can't come|cannot come|not coming|next year)\b/i, 2], ["cảm xúc của bạn", FEEL], ["điều bạn muốn làm (chọn tháng/đi họp/rủ bạn)", /\b(january|march|prefer|choose|vote|want to|would like|'d like|shall|let's|go to|join|attend|plan\w*|contact|secretary|discussion|internet|online)\b/i]],
      p4b: [["nhắc tới buổi nói chuyện bị hủy/dời", /\b(james|mcavoy|mc avoy|actor|talk|guest|cancel\w*|postpon\w*|reschedul\w*|not be able|next year)\b/i, 2], ["cảm nghĩ của bạn", FEEL], ["đề xuất", SUGG], ["phương án cụ thể (chọn tháng/diễn giả khác/chiếu phim…)", /\b(january|march|invite|another (speaker|guest|actor)|director|online|video call|zoom|screen\w*|show|watch\w*|film night|workshop|record\w*|discuss\w*)\b/i, 2]],
    },
    w15: {
      p1: ["open", "weather", "open", "open", "open"],
      p2: [
        ["nhắc tới việc chạy bộ", /\b(run|ran|running|jog\w*|race|park|track|morning|evening|mile\w*|kilomet\w*|km|minutes?|hour)\b/i, 2],
        ["thời điểm/chi tiết lần chạy gần nhất (hôm qua, tuần trước, ở đâu, cảm giác…)", /\b(last|yesterday|ago|week|weekend|sunday|monday|tuesday|wednesday|thursday|friday|saturday|morning|evening|night|park|street|track|felt|feel\w*|tired|happy|energ\w*|with|alone)\b/i],
      ],
      p3: [
        [["nêu cách bạn thường tập thể dục", /\b(exercis\w*|gym|run\w*|jog\w*|swim\w*|cycl\w*|bike|yoga|walk\w*|workout|work out|sport\w*|football|gym|train\w*|lift\w*|dance|dancing|badminton|tennis)\b/i, 2], ["tần suất/thời gian/cách thực hiện", /\b(usually|often|every|times? a|twice|daily|weekend\w*|morning|evening|afternoon|week|day|hour|minutes?|with|friends?|because)\b/i]],
        [["nêu thói quen/thời điểm tập (sáng hay tối) của bạn", /\b(morning|evening|night|afternoon|early|late|after work|before work|prefer\w*|usually|i exercise|i run|i go|i work out)\b/i, 2], ["lý do", BECAUSE],],
        [["ý kiến đồng ý/không đồng ý", OPINION], ["nhắc tới công nghệ làm con người lười/tập thể dục", /\b(technolog\w*|phones?|apps?|games?|computers?|internet|online|screens?|lazy|laziness|exercis\w*|sitting|sit|active|health\w*|fit\w*|videos?|devices?|machines?)\b/i, 2], ["lý do/ví dụ", /\b(because|since|however|but|although|example|hours|too much|help\w*|easy|easier|fun|waste|sedentary|sit\w*)\b/i]],
      ],
      p4a: [["nhắc tới thiết bị cũ/sự kiện tài trợ/phí thành viên", /\b(equipment|machines?|sponsor\w*|event|fund\w*|money|fee\w*|membership|raise|raising|replace\w*|upgrade\w*|old|club|gym|50)\b/i, 2], ["cảm xúc của bạn", FEEL], ["ý kiến/điều bạn đề xuất", /\b(think|prefer|better|suggest\w*|propos\w*|support|agree|against|rather|instead|plan\w*|want|will|help|would)\b/i]],
      p4b: [["nhắc tới thiết bị cũ/sự kiện tài trợ/phí thành viên", /\b(equipment|machines?|sponsor\w*|event|fund\w*|money|fee\w*|membership|raise|raising|replace\w*|upgrade\w*|old|50)\b/i, 2], ["cảm nghĩ của bạn", FEEL], ["chọn/đề xuất một giải pháp (sự kiện tài trợ hoặc tăng phí)", /\b(sponsor\w*|event|fee\w*|increase\w*|raise|raising|charity|donat\w*|fundrais\w*|auction|support|prefer\w*|against|instead)\b/i, 2], ["lý do cho đề xuất", /\b(because|since|as|so|reason|too much|expensive|afford\w*|cannot|can't|students?|members?|leave|bring|help\w*|benefit\w*|safe\w*|fair)\b/i], ["đề xuất cụ thể/ý tưởng cho sự kiện", SUGG]],
    },
    w16: {
      p1: ["name", "name", "open", "open", "open"],
      p2: [
        ["nêu thời gian ăn (sáng/trưa/tối, giờ nào)", /\b(breakfast|lunch|dinner|supper|morning|noon|midday|evening|night|afternoon|every day|daily|usually|o'clock|\d{1,2}(:\d\d)?\s?(am|pm)?|seven|eight|twelve|six)\b/i, 2],
        ["nêu nơi ăn (nhà, nhà hàng, văn phòng…)", /\b(home|house|kitchen|restaurant|canteen|cafeteria|school|office|work|table|cafe|café|street|living room|dining|with my)\b/i, 2],
      ],
      p3: [
        [["kể một bữa ăn ngon gần đây", /\b(last|yesterday|ago|dinner|lunch|breakfast|meal|restaurant|ate|had|delicious|tasty|wonderful|great|good|dish\w*|food)\b/i, 2], ["chi tiết (ở đâu, với ai, món gì, vì sao ngon)", /\b(with|at|in|family|friends?|birthday|restaurant|home|ate|grilled|fish|chicken|beef|pasta|rice|soup|salad|steak|because|special|tasted|fresh)\b/i]],
        [["gợi ý món ăn ngon của nước bạn", /\b(try|eat|food|dish\w*|pho|noodle\w*|rice|soup|sandwich\w*|banh|spring rolls?|specialit\w*|cuisine|delicious|tasty|local|traditional|famous)\b/i, 2], ["lời gợi ý/lý do", SUGG], ["lý do/mô tả món ăn", /\b(because|since|so|tasty|delicious|cheap|fresh|authentic|spicy|sweet|flavou?r\w*|popular|famous|best)\b/i]],
        [["ý kiến đồng ý/không đồng ý về việc hạn chế pizza", OPINION], ["nhắc tới pizza/ăn uống lành mạnh", /\b(pizza\w*|fast food|junk|health\w*|unhealthy|fat|salt|cheese|calor\w*|diet|weight|eat\w*|treat|limit\w*)\b/i, 2], ["lý do", /\b(because|since|so|fat|salt|cheese|calor\w*|weight|obes\w*|sugar|harm\w*|bad for|occasion\w*|sometimes|treat|balance\w*|moderat\w*|however)\b/i]],
      ],
      p4a: [["nhắc tới buổi talk show/diễn giả/đầu bếp", /\b(talk show|talk|speaker\w*|chef\w*|volunteer\w*|club|guest|topic|speak|present\w*|event)\b/i, 2], ["gợi ý của bạn (muốn làm diễn giả, chủ đề)", /\b(suggest\w*|propos\w*|recommend\w*|topic|would like|want|will|plan\w*|volunteer\w*|speak|talk about|about|idea)\b/i, 2], ["lý do (vì sao)", BECAUSE]],
      p4b: [["nhắc tới buổi talk show với đầu bếp nổi tiếng", /\b(talk show|talk|chef\w*|guest|event|club|volunteer\w*|speaker\w*)\b/i, 2], ["cho biết muốn làm diễn giả", /\b(volunteer\w*|speaker|speak|present\w*|would like|want|happy to|glad to|interested|willing|offer\w*)\b/i, 2], ["đề xuất chủ đề sẽ nói", /\b(topics?|subjects?|theme|about|talk about|share|explain\w*|cook\w*|recipes?|meals?|dish\w*|cuisine|healthy|food|diet)\b/i, 2], ["lý do (vì sao chọn chủ đề/muốn làm diễn giả)", /\b(because|since|as|so|reason|useful|practical|interest\w*|attract\w*|experience|enjoy\w*|passion\w*|benefit\w*|help\w*)\b/i], ["giọng đề xuất lịch sự", SUGG]],
    },
    w17: {
      p1: ["place", "weather", "open", "open", "open"],
      p2: [
        ["nêu lý do tham gia CLB", BECAUSE, 2],
        ["nhắc tới sở thích làm vườn/cây cối/kết bạn", /\b(garden\w*|plants?|flowers?|vegetables?|grow\w*|trees?|learn\w*|hobby|nature|green|friends?|people|meet|relax\w*|fresh|interest\w*|love|like|enjoy\w*|want|hope)\b/i, 2],
      ],
      p3: [
        [["mô tả khu vườn của bạn", /\b(garden|lawn|grass|flowers?|roses?|trees?|plants?|vegetables?|fence|pond|small|big|large|beautiful|pretty|green|colou?rful|bench|yard|balcony|herbs?|have|there is|there are)\b/i, 2], ["chi tiết (cây/hoa gì, kích thước, vị trí…)", /\b(roses?|tomato\w*|flowers?|trees?|herbs?|lawn|grass|small|big|large|behind|front|back|middle|along|corner|fence|bench|pond|colou?r\w*|red|yellow|green|orange|pink|white)\b/i]],
        [["trả lời có/không về việc người dân nước bạn thích làm vườn", OPINION, 2], ["nhắc tới làm vườn/trồng cây ở nước bạn", /\b(garden\w*|plants?|flowers?|grow\w*|vegetables?|balcon\w*|roof\w*|countryside|city|cities|farm\w*|trees?|herbs?|people|families|older|old|young|hobby)\b/i, 2]],
        [["nêu mùa yêu thích", /\b(spring|summer|autumn|fall|winter|rainy|dry|season)\b/i, 2], ["lý do", /\b(because|since|so|as|reason|warm|cool|cold|hot|snow|flowers?|bloom\w*|weather|beautiful|fresh|colou?r\w*|holiday\w*|harvest|sunny|rain\w*|plant\w*|love|enjoy\w*)\b/i]],
      ],
      p4a: [["nhắc tới việc hủy buổi nói chuyện/Mr. Seiko/Mr. Jones", /\b(talk|cancel\w*|slide|seiko|jones|speaker|ill|sick|japan\w*|england|english|garden\w*|club|event|again)\b/i, 2], ["cảm xúc của bạn", FEEL, 2], ["gợi ý của bạn", SUGG]],
      p4b: [["nhắc tới việc hủy buổi nói chuyện/diễn giả bị ốm", /\b(talk|cancel\w*|postpon\w*|seiko|jones|speaker|ill|sick|illness|japan\w*|england|english|garden\w*|slide|show)\b/i, 2], ["cảm xúc/suy nghĩ về việc hủy và việc nghe lại Mr. Jones", FEEL, 2], ["đưa ra gợi ý cụ thể (mời lại Mr. Seiko, thêm nội dung mới…)", SUGG, 2], ["lý do/giải thích cho gợi ý", /\b(because|since|as|so|reason|interesting|new|different|again|already|heard|recover\w*|better|next|month|later|photos?|photograph\w*|film|video|more)\b/i], ["nhắc tới Mr. Jones/bài nói về vườn Anh", /\b(jones|england|english|talk|gardens?)\b/i]],
    },
    w18: {
      p1: ["open", "weather", "open", "open", "open"],
      p2: [
        ["mô tả nơi ở (nhà/căn hộ/thành phố/phòng…)", /\b(live|living|house|home|apartment|flat|room\w*|bedroom\w*|floor|building|street|city|town|village|countryside|garden|kitchen|neighbou?r\w*|area|district|suburb\w*|dormitory|balcony)\b/i, 2],
        ["chi tiết cụ thể (số phòng, kiểu nhà, đặc điểm)", /\b(bedrooms?|living room|kitchen|balcony|floor|garden|small|big|large|quiet|bright|lovely|beautiful|spacious|cozy|comfortable|neighbou?rs?|street|near|next to|close to)\b/i],
      ],
      p3: [
        [["cảm xúc khi ở chung phòng với anh/em", FEEL, 2], ["nhắc tới chia sẻ phòng/anh em/riêng tư", /\b(share\w*|sharing|brother\w*|sibling\w*|room|bedroom|privacy|together|space|alone|get along|annoy\w*|noise|noisy)\b/i], ["lý do", BECAUSE]],
        [["ý kiến đồng ý/không đồng ý", OPINION], ["so sánh thành phố và nông thôn", /\b(city|cities|urban|town|countryside|rural|village|country)\b/i, 2], ["lý do/ví dụ (tiện nghi, không khí, giá…)", /\b(because|since|as|so|convenien\w*|jobs?|schools?|hospitals?|air|quiet|noise|noisy|pollution|traffic|expensive|cheap|cost\w*|peaceful|nature|crowded|facilit\w*|transport\w*)\b/i]],
        [["chọn nhà riêng hay căn hộ", /\b(house|houses|apartment\w*|flat\w*|condo\w*|home)\b/i, 2], ["lý do (Why?)", /\b(because|since|as|so|space|garden|yard|cheap\w*|safe\w*|secur\w*|expensive|price\w*|quiet|neighbou?r\w*|privacy|convenien\w*|spacious|rent|cost\w*|lift|elevator)\b/i], ["sự ưu tiên của bạn", /\b(prefer\w*|rather|better|choose|choice|like|love|would|want|think|believe)\b/i]],
      ],
      p4a: [["nhắc tới các gia đình trẻ/mua nhà/căn hộ", /\b(famil\w*|young|couples?|house\w*|apartments?|flats?|homes?|buy\w*|find\w*|price\w*|expensive)\b/i, 2], ["cảm xúc của bạn", FEEL], ["gợi ý giúp tìm nhà", SUGG]],
      p4b: [["nhắc tới các gia đình trẻ cần mua nhà/căn hộ", /\b(young famil\w*|famil\w*|couples?|buy\w*|house\w*|apartments?|flats?|homes?)\b/i, 2], ["cảm nghĩ của bạn", FEEL], ["đề xuất giúp họ tìm nhà", SUGG], ["gợi ý cụ thể (danh sách nhà, ngân hàng, môi giới, giá rẻ…)", /\b(list\w*|bank\w*|loans?|agents?|real estate|brokers?|websites?|online|cheap\w*|afford\w*|rent\w*|mortgage\w*|talk|seminar\w*|workshop\w*|advice|adviser|advisor|visit\w*|price\w*|developers?|newspaper\w*|social media|contracts?|share\w*)\b/i, 2]],
    },
    w19: {
      p1: ["open", "open", "open", "open", "open"],
      p2: [
        ["lý do tham gia CLB phim (yêu phim, học làm phim, gặp gỡ…)", /\b(movies?|films?|cinema\w*|watch\w*|directing|director\w*|actors?|actress\w*|screen\w*|friends?|people|meet\w*|discuss\w*|learn\w*|making|club)\b/i, 2],
        ["lý do/mong muốn của bạn (because/want/hope…)", /\b(because|since|so that|want\w*|hope|would like|wish|enjoy\w*|love|interest\w*|passion\w*|to (meet|watch|learn|make|share|discuss|improve|get|find))\b/i],
      ],
      p3: [
        [["nêu thời gian xem phim", /\b(\d|o'?clock|weekends?|evenings?|nights?|mornings?|afternoons?|saturdays?|sundays?|fridays?|usually|often|always|sometimes|every|after|before|free time|holidays?)\b/i, 2], ["nêu nơi xem phim", /\b(cinema\w*|home|theat(er|re)s?|laptop|tv|television|phone|tablet|online|living room|bedroom|friends?'? (house|place)|screen\w*|netflix|youtube|computer)\b/i, 2]],
        [["gợi ý cho phim thiếu nhi", /\b(animat\w*|cartoons?|colou?r\w*|stor(y|ies)|characters?|animals?|songs?|music|funny|short|simple|fun|educat\w*|moral|message|lessons?|heroes|magic\w*|fairy|toys?|adventure\w*|children|kids?)\b/i, 2], ["lời gợi ý (should/could/suggest…)", SUGG]],
        [["ảnh hưởng của công nghệ tới cách xem phim", /\b(technolog\w*|stream\w*|online|internet|virtual|vr|3d|screens?|devices?|phones?|laptops?|smart|apps?|digital|netflix|ai|cinemas?|download\w*|special effects|quality|4k|home)\b/i, 2], ["ý kiến/dự đoán tương lai", /\b(will|would|think|believe|may|might|future|more|easier|better|change\w*|affect\w*|improv\w*|popular|convenient|expect\w*|probably|become|become)\b/i]],
      ],
      p4a: [["nhắc tới việc CLB sửa chữa/địa điểm họp thay thế", /\b(repair\w*|renovat\w*|club|meeting\w*|activit\w*|alternative|instead|place|venue|room|hall|home|house)\b/i, 2], ["cảm xúc của bạn", FEEL], ["đề xuất buổi gặp/hoạt động thay thế", SUGG]],
      p4b: [["nhắc tới việc CLB đang sửa chữa", /\b(repair\w*|renovat\w*|club|closed|closure|building|works?)\b/i, 2], ["cảm nghĩ của bạn", FEEL], ["đề xuất thay thế", SUGG], ["địa điểm/hoạt động thay thế cụ thể", /\b(hall|park|cafe|café|library|school|classroom|community|centre|center|home|house|garden|cinema|online|zoom|video call|open-?air|outdoor\w*|picnic|restaurant|movie night|screening|projector\w*|room|host\w*)\b/i, 2]],
    },
    w20: {
      p1: ["open", "freq", "place", "place", "place"],
      p2: [
        ["hoạt động khi nghe nhạc (thư giãn, hát theo, nhảy, làm việc…)", /\b(relax\w*|sing\w*|danc\w*|work\w*|study\w*|homework|clean\w*|cook\w*|exercis\w*|run\w*|jog\w*|walk\w*|drive|driving|sleep\w*|read\w*|draw\w*|paint\w*|play\w*|headphones?|earphones?|lie|lying|sit|sitting|while|dream\w*|think\w*|hum\w*|tap\w*|close)\b/i, 2],
        ["nhắc tới việc nghe nhạc/bài hát", /\b(music|songs?|listen\w*|playlist\w*|singer\w*|band\w*|melod\w*|rhythm\w*|tunes?)\b/i],
      ],
      p3: [
        [["nêu bài hát/thể loại nhạc khiến bạn thư giãn hoặc buồn", /\b(relax\w*|calm\w*|sad\w*|slow|soft|piano|love songs?|classical|ballads?|sentimental|melanchol\w*|cry\w*|emotional|peaceful|soothing|memor\w*|happy)\b/i, 2], ["lý do/ví dụ", /\b(because|since|as|so|remind\w*|help\w*|make\w*|when|after|stress\w*|tired|feel\w*|especially|for example|such as|lyrics)\b/i]],
        [["ý kiến về nhạc ồn ào", /\b(agree|disagree|annoy\w*|loud\w*|noisy|noise|disturb\w*|rude|bother\w*|irritat\w*|inconsiderate|polite|respect\w*|volume|neighbou?r\w*|headphones?)\b/i, 2], ["lý do hoặc giải pháp", /\b(because|since|as|so|sleep\w*|study\w*|should|could|must|use|lower|turn|quiet|consider\w*|others?|people|night|if)\b/i]],
        [["lời khuyên tìm giáo viên dạy nhạc", /\b(teachers?|tutors?|lessons?|class\w*|course\w*|school|academy|centre|center|instructors?|reviews?|trial|online|youtube|apps?|friends?|recommend\w*|ask\w*|search\w*|experienced|qualified|music)\b/i, 2], ["lời khuyên (should/could/recommend…)", SUGG]],
      ],
      p4a: [["lý do muốn làm tình nguyện viên", /\b(volunteer\w*|help\w*|join\w*|because|want\w*|love|enjoy\w*|passion\w*|interest\w*|experience|contribut\w*|support\w*|give back|meet|learn\w*)\b/i, 2], ["đóng góp ý tưởng cho sự kiện", /\b(ideas?|suggest\w*|propos\w*|could|should|how about|let's|invite\w*|band\w*|karaoke|contest\w*|competition\w*|perform\w*|singers?|concert\w*|stage|posters?|tickets?|performance\w*|games?|show\w*|food|decorat\w*)\b/i, 2], ["đề cập sự kiện/buổi tối/rảnh", /\b(event|evenings?|free|available|night|club|music)\b/i]],
      p4b: [["lý do muốn làm tình nguyện viên", /\b(volunteer\w*|because|want\w*|love|enjoy\w*|passion\w*|interest\w*|give back|contribut\w*|support\w*|help\w*|opportunit\w*|experience|learn\w*)\b/i, 2], ["nhắc tới sự kiện/việc rảnh buổi tối", /\b(event|evenings?|free|available|night|club|organi[sz]\w*|prepar\w*)\b/i], ["ý tưởng đóng góp cho sự kiện", /\b(ideas?|suggest\w*|propos\w*|could|should|how about|invite\w*|band\w*|karaoke|contest\w*|competition\w*|perform\w*|singers?|concert\w*|stage|posters?|tickets?|performance\w*|games?|show\w*|food|decorat\w*|charity|workshops?|donat\w*|musicians?|dj)\b/i, 2], ["cách giúp cụ thể", /\b(help\w*|put up|welcome|look after|equipment|prepar\w*|set up|arrang\w*|promot\w*|advertis\w*|social media|sound|lights?|guests?|tasks?|duties|assist\w*)\b/i]],
    },
    w21: {
      p1: ["place", "place", "when", "when", "when"],
      p2: [
        ["nêu thời gian rảnh/sở thích của bạn", /\b(free time|spare time|hobb\w*|read\w*|cycl\w*|hik\w*|music|movies?|photograph\w*|draw\w*|paint\w*|cook\w*|garden\w*|sport\w*|swim\w*|travel\w*|watch\w*|listen\w*|games?|football|guitar|running|jogging|dancing|singing|fishing|camping)\b/i, 2],
        ["chi tiết cụ thể (khi nào, ở đâu, với ai, vì sao)", /\b(because|since|often|usually|sometimes|weekends?|evenings?|afternoons?|park|friends?|family|relax\w*|fun|enjoy\w*|love|favou?rite)\b/i],
      ],
      p3: [
        [["nêu nơi bạn thích đến", /\b(visit\w*|go|going|love|like|enjoy\w*|parks?|forests?|mountains?|beach\w*|lakes?|rivers?|sea|waterfalls?|countryside|gardens?|islands?|bay|caves?|places?|trips?|nature|hik\w*|travel\w*)\b/i, 2], ["lý do/cảm nhận khi đến đó", /\b(because|since|relax\w*|peace\w*|quiet|calm|fresh|beautiful|view\w*|air|fun|friends?|family|feel\w*|enjoy\w*|walk\w*|photos?|scenery|nature)\b/i]],
        [["nêu lý do tham gia câu lạc bộ", /\b(because|since|reason|so that|to meet|to learn|to protect|to join|hope|want|love|like|interest\w*|passion\w*|enjoy\w*|decid\w*)\b/i, 2], ["nhắc tới thiên nhiên/môi trường/bạn bè/hoạt động", /\b(nature|environment\w*|animals?|plants?|trees?|outdoors?|friends?|people|members?|trips?|activit\w*|meet\w*|learn\w*|protect\w*|club|hik\w*|green|planet|clean\w*)\b/i]],
        [["ý kiến đồng ý/không đồng ý về CLB lớn hơn", OPINION], ["nhắc tới câu lạc bộ/quy mô/nhận thức về môi trường", /\b(club\w*|big\w*|large\w*|small\w*|size|members?|people|numbers?|groups?|environment\w*|conscious|aware\w*|green|nature|projects?|activ\w*)\b/i, 2], ["lý do/giải thích", /\b(because|since|however|but|although|so|more|can|depends|not always|reach|influence|action\w*|active|passive|quality)\b/i]],
      ],
      p4a: [["nhắc tới kế hoạch/giới trẻ/ở nhà chơi game", /\b(plan\w*|young|teen\w*|youth|people|games?|gaming|home|club|activit\w*|trip\w*|members?)\b/i, 2], ["cảm xúc của bạn", FEEL], ["điều bạn dự định làm/đề xuất", /\b(plan\w*|want|would like|'d like|going to|will|suggest\w*|recommend\w*|propos\w*|invite\w*|ask\w*|could|maybe|let's|hik\w*|trip|join|come)\b/i]],
      p4b: [["nhắc tới kế hoạch cho giới trẻ thích ở nhà chơi game", /\b(young|teen\w*|youth|people|games?|gaming|home|plans?|club|members?|outside|computers?)\b/i, 2], ["cảm nghĩ của bạn", FEEL], ["đề xuất hoạt động cụ thể", /\b(hik\w*|camp\w*|trips?|tree|plant\w*|clean\w*|cycl\w*|picnic\w*|garden\w*|walks?|sports?|competitions?|photograph\w*|volunteer\w*|events?|activit\w*|outdoor\w*|days?|workshops?|games?|barbecue|festival|clean-?up)\b/i, 2], ["lý do/lợi ích/cách thu hút", SUGG]],
    },
    w22: {
      p1: ["open", "open", "open", "open", "open"],
      p2: [
        ["nêu hoạt động ngoài trời bạn thích", /\b(hik\w*|cycl\w*|bik\w*|camp\w*|running|jogging|swim\w*|climb\w*|football|volleyball|picnic\w*|fishing|kayak\w*|surf\w*|walk\w*|trekking|sports?|outdoor\w*|garden\w*|skating|skiing|boating|beach)\b/i, 2],
        ["lý do bạn thích (Why?)", /\b(because|since|as|so|healthy|health\w*|fresh|relax\w*|fun|friends?|family|nature|exercise|stress|enjoy\w*|beautiful|energy|happy)\b/i],
      ],
      p3: [
        [["nêu hoạt động ngoài trời khi thời tiết xấu", /\b(rain\w*|cold|storm\w*|wind\w*|snow\w*|weather|indoor\w*|inside|umbrella|raincoat|cancel\w*|avoid|climb\w*|gym|swim\w*|pool|walk\w*|stay|hot|bad)\b/i, 2], ["hoạt động/cách xử lý cụ thể", /\b(prefer|usually|still|instead|sometimes|can|could|play\w*|go|do|enjoy\w*|wear|bring|carry|activit\w*|hik\w*|cycl\w*|run\w*)\b/i]],
        [["đưa ra lời khuyên/ý tưởng khi đi bộ đường dài", /\b(hik\w*|trail\w*|trek\w*|mountain\w*|walk\w*|path\w*|boots|shoes|backpack|water|snacks?|map|route|weather|guide|alone|safe\w*|trip)\b/i, 2], ["lời khuyên cụ thể (nên/đừng…)", /\b(should|must|need|advice|suggest\w*|recommend\w*|remember|make sure|don't|never|always|bring|wear|carry|check|choose|take|ideas?|tips?|better)\b/i]],
        [["nêu hoạt động ngoài trời phổ biến ở nước bạn", /\b(popular|common|famous|most|many people|everyone|football|soccer|cycl\w*|bik\w*|jogging|running|swim\w*|badminton|volleyball|hik\w*|camp\w*|picnic\w*|beach|walk\w*|park|sports?|outdoor\w*|fishing|tai chi|yoga|exercise)\b/i, 2], ["thêm chi tiết (ai chơi, ở đâu, khi nào)", /\b(people|family|families|friends?|park|beach|morning|evening|weekends?|after|before|children|young|old|elderly|every|often|usually|because|also|and)\b/i]],
      ],
      p4a: [["nhắc tới chuyến đi mùa hè/núi hoặc biển", /\b(trip\w*|travel\w*|summer|mountains?|coast\w*|beach\w*|sea|seaside|club|holiday|go|visit)\b/i, 2], ["cảm xúc của bạn", FEEL], ["lựa chọn/đề xuất của bạn", /\b(prefer\w*|choose|chose|suggest\w*|recommend\w*|propos\w*|think|plan\w*|want|would like|'d like|going to|will|could|maybe|let's|better|vote)\b/i]],
      p4b: [["nhắc tới chuyến du lịch mùa hè của câu lạc bộ", /\b(trip\w*|travel\w*|summer|club|holiday|plan\w*|organi[sz]\w*|members?|visit)\b/i, 2], ["chọn núi hoặc biển", /\b(mountains?|coast\w*|beach\w*|sea|seaside|shore|hills?|hik\w*|swim\w*)\b/i, 2], ["cảm nghĩ của bạn", FEEL], ["gợi ý phù hợp cho cả người trẻ và người lớn tuổi", /\b(young|elderly|old|older|senior\w*|retired|children|kids?|teen\w*|everyone|all ages|both|grandparents?|adults?|suitable|easy|comfortable|safe\w*)\b/i, 2], ["đề xuất/lý do (SUGG/BECAUSE)", SUGG]],
    },
    w23: {
      p1: ["open", "open", "open", "open", "when"],
      p2: [
        ["nêu lần gần nhất bạn chụp ảnh (khi nào/chụp gì)", /\b(last|yesterday|today|ago|morning|afternoon|evening|night|week|weekend|days?|photograph\w*|took|take|taken|shot|picture|photo|selfie|sunset|sunrise|food|family|friends?|flowers?|beach|park)\b/i, 2],
        ["chi tiết (chụp gì, ở đâu, với ai, cảm nhận)", /\b(because|beautiful|lovely|shared?|phone|camera|friends?|family|sunset|sunrise|food|flowers?|river|park|beach|house|city)\b/i],
      ],
      p3: [
        [["nêu cách để có bức ảnh đẹp", /\b(light\w*|sunlight|sunset|sunrise|angle\w*|composition|focus\w*|subject|camera|steady|frame|framing|background|editing|colou?r\w*|lens|tripod|practi[sc]e|settings?|flash|natural|shoot\w*|tips?)\b/i, 2], ["lời khuyên cụ thể (nên làm gì)", /\b(should|need|must|try|choose|use|keep|make sure|important|best|good|advice|tip|suggest\w*|first|also|always)\b/i]],
        [["nêu cách bạn lưu ảnh", /\b(save\w*|stor\w*|keep|kept|copy|copied|upload\w*|backup|back up|print\w*|album|cloud|drive|phone|laptop|computer|folder\w*|hard drive|usb|google|files?|memory card)\b/i, 2], ["chi tiết (ở đâu, bao lâu một lần, vì sao)", /\b(because|since|every|usually|often|always|weekly|daily|safe\w*|lose|lost|share|family|friends?|favou?rite|best|also|and)\b/i]],
        [["nêu kỹ năng cần để chụp ảnh đẹp", /\b(skills?|understand\w*|learn\w*|know\w*|light\w*|composition|focus\w*|edit\w*|patience|patient|creativ\w*|practi[sc]e|camera|settings?|angles?|eye|technique\w*|photoshop|lightroom|frame|framing|timing)\b/i, 2], ["giải thích/ví dụ", /\b(because|since|important|need|should|must|help\w*|better|good|best|also|finally|first|so|make\w*)\b/i]],
      ],
      p4a: [["nhắc tới triển lãm ảnh/thành viên/ảnh của bạn", /\b(exhibition\w*|photos?|photograph\w*|pictures?|display\w*|club|members?|show|gallery|theme|send|submit)\b/i, 2], ["cảm xúc của bạn", FEEL], ["điều bạn dự định làm/gợi ý", /\b(plan\w*|want|would like|'d like|going to|will|suggest\w*|recommend\w*|propos\w*|send|submit|choose|bring|could|maybe|let's|theme)\b/i]],
      p4b: [["nhắc tới triển lãm ảnh của câu lạc bộ", /\b(exhibition\w*|photos?|photograph\w*|pictures?|display\w*|gallery|club|members?|show|visitors?|event)\b/i, 2], ["cảm nghĩ của bạn", FEEL], ["gợi ý phù hợp cho cả người trẻ và người lớn tuổi", /\b(young|elderly|old|older|senior\w*|retired|children|kids?|teen\w*|everyone|all ages|both|grandparents?|adults?|suitable|easy|comfortable|large|big|letters|chairs?|read)\b/i, 2], ["đề xuất cụ thể (chủ đề, cách trưng bày…)", /\b(theme\w*|topics?|subject\w*|layout|display\w*|label\w*|captions?|guided|tours?|workshops?|prizes?|competition\w*|music|food|refreshments?|space|lighting|chairs?|hang\w*|invite\w*|explain\w*|share)\b/i, 2], ["lý do (SUGG/BECAUSE)", SUGG]],
    },
    w24: {
      p1: ["open", "open", "open", "open", "open"],
      p2: [
        ["lý do thích khoa học (khoa học, thí nghiệm, khám phá…)", /\b(scien\w*|experiment\w*|discover\w*|invent\w*|physics|chemi\w*|biolog\w*|research\w*|laborator\w*|technolog\w*|nature|world|universe|understand\w*|curious\w*|explain\w*|learn\w*)\b/i, 2],
        ["lý do/mong muốn của bạn (because/enjoy/hope…)", /\b(because|since|so that|want\w*|hope|would like|wish|enjoy\w*|love|interest\w*|fascinat\w*|fun|exciting|to (understand|learn|discover|know|find|explain|make))\b/i],
      ],
      p3: [
        [["lý do tham gia CLB khoa học", /\b(because|since|so that|want\w*|wish|hope|interest\w*|curious\w*|passion\w*|love|enjoy\w*|learn\w*|meet|friends?|science|experiment\w*|join\w*)\b/i, 2], ["tần suất đến CLB", /\b(once|twice|times?|every|daily|weekly|weekends?|week|month|often|sometimes|usually|always|days?|monday|tuesday|wednesday|thursday|friday|saturday|sunday|\d|one|two|three|four)\b/i, 2]],
        [["nhớ lại điều đã học về khoa học ở trường", /\b(remember\w*|recall\w*|learn\w*|learnt|learned|lesson\w*|class\w*|teacher\w*|experiment\w*|physics|chemi\w*|biolog\w*|science|school|studied|taught|once|used to)\b/i, 2], ["chi tiết cụ thể về điều đó", /\b(about|how|why|electricity|water|plants?|chemical\w*|atoms?|planets?|space|body|energy|light|gravity|cells?|experiment\w*|reaction|volcano|magnet\w*|because|when)\b/i]],
        [["nêu tên nhà phát minh/nhà khoa học", /\b(scientists?|inventors?|physicist\w*|chemist\w*|einstein|newton|edison|curie|tesla|darwin|galileo|pasteur|bell|hawking|nobel|discover\w*|invent\w*|my favou?rite)\b/i, 2], ["lý do (Why?)", /\b(because|since|as|admire\w*|inspir\w*|great|brilliant|genius|changed|important|helped|courage|hard work|discover\w*|invent\w*|so)\b/i]],
      ],
      p4a: [["nhắc tới triển lãm khoa học/ý tưởng/vé", /\b(exhibition|science|ideas?|tickets?|event|participants?|activit\w*|experiment\w*|young|elderly|old)\b/i, 2], ["cảm xúc của bạn", FEEL], ["ý tưởng/ý kiến về vé hoặc hoạt động", /\b(tickets?|free|price|charge|sell\w*|experiment\w*|demonstrat\w*|display\w*|show\w*|suggest\w*|think|should|could|idea\w*|help\w*|let's)\b/i]],
      p4b: [["nhắc tới triển lãm khoa học và đối tượng tham gia", /\b(exhibition|science|event|participants?|visitors?|young|elderly|older|children|adults?|everyone|all ages)\b/i, 2], ["cảm nghĩ của bạn", FEEL], ["ý tưởng/đề xuất cho sự kiện", SUGG], ["ý kiến về việc phát hành vé", /\b(tickets?|free of charge|free entry|admission|entry fee|price\w*|charge\w*|sell\w*|issue\w*|cost\w*)\b/i, 2]],
    },
    w25: {
      p1: ["weather", "open", "open", "open", "open"],
      p2: [
        ["nói về người bạn thân (tên, tính cách, quen nhau thế nào…)", /\b(friends?|friendship|best|classmate\w*|known|met|childhood|school|kind|funny|honest|helpful|loyal|clever|nice|friendly|caring|reliable|name\w*|called|she|he)\b/i, 2],
        ["mô tả/lý do (tính cách, hoạt động chung)", /\b(because|since|kind|funny|honest|helpful|loyal|friendly|caring|always|together|share\w*|listen\w*|talk\w*|like\w*|love|enjoy\w*|trust\w*)\b/i],
      ],
      p3: [
        [["hoạt động khi đi chơi với bạn bè", /\b(go\w*|visit\w*|watch\w*|eat\w*|coffee|caf[eé]|cinema|movies?|shopping|mall|park|walk\w*|chat\w*|talk\w*|play\w*|sing\w*|karaoke|restaurant\w*|dinner|lunch|picnic|drink\w*|hang out|travel\w*|sports?|football|photos?)\b/i, 2]],
        [["trả lời về việc người trẻ dễ có bạn hơn không", /\b(yes|no|easier|easy|harder|difficult|agree|disagree|think|believe|opinion|true|not always|depends)\b/i, 2], ["lý do (trường học, hoạt động, thời gian…)", /\b(because|since|as|school|university|class\w*|activit\w*|time|free|work|busy|family|social|meet\w*|more|fewer|chances?|opportunit\w*|friends?)\b/i]],
        [["ý kiến đồng ý/không đồng ý", OPINION], ["nhắc tới máy tính/điện thoại/mạng xã hội để kết bạn", /\b(computers?|phones?|mobile\w*|smartphones?|internet|online|social media|facebook|zalo|instagram|app\w*|technolog\w*|messag\w*|chat\w*|web\w*|network\w*)\b/i, 2], ["lý do (Why/why not)", /\b(because|since|as|so|reason|however|but|although|real|face to face|shallow|convenient|easy|easier|world|anywhere|connect\w*)\b/i]],
      ],
      p4a: [["nhắc tới buổi gặp mặt hàng tháng/gợi ý", /\b(meetings?|meet\w*|monthly|month|face to face|suggest\w*|club|together|gather\w*)\b/i, 2], ["cảm xúc của bạn", FEEL], ["thời gian/địa điểm bạn muốn", /\b(saturday|sunday|weekends?|weekday\w*|evening|afternoon|morning|monday|tuesday|wednesday|thursday|friday|library|cafe|caf[eé]|park|centre|center|restaurant|club|house|hall)\b/i]],
      p4b: [["nhắc tới buổi gặp mặt hàng tháng", /\b(meetings?|meet\w*|monthly|month|face to face|gather\w*|get-?together)\b/i, 2], ["cảm nghĩ của bạn", FEEL], ["đề xuất thời gian cụ thể", /\b(saturday|sunday|weekends?|weekday\w*|evenings?|afternoons?|mornings?|monday|tuesday|wednesday|thursday|friday|first|last|second|week|o'?clock|a\.?m|p\.?m|\d)\b/i, 2], ["đề xuất địa điểm cụ thể", /\b(library|cafe|caf[eé]|park|centre|center|restaurant|club ?house|hall|room|garden|hotel|school|community|venue|place|location)\b/i, 2], ["lý do (cả người trẻ và lớn tuổi)", /\b(because|since|as|reason|so that|convenient\w*|easy|easily|older|elderly|young|everyone|accessible|suit\w*|free|quiet)\b/i]],
    },
    w26: {
      p1: ["open", "open", "open", "open", "open"],
      p2: [
        ["lý do tham gia CLB thể thao (sức khỏe, thể thao, bạn bè…)", /\b(sports?|health\w*|fit\w*|exercis\w*|strong\w*|weight|football|badminton|swim\w*|run\w*|tennis|basketball|gym|train\w*|team\w*|match\w*|friends?|club|play\w*|active|energy|stress)\b/i, 2],
        ["lý do/mong muốn của bạn (because/want/hope…)", /\b(because|since|so that|want\w*|hope|would like|wish|enjoy\w*|love|interest\w*|decid\w*|to (stay|be|get|become|meet|make|play|improve|keep|lose|learn))\b/i],
      ],
      p3: [
        [["thời điểm chơi thể thao gần nhất", /\b(last|yesterday|ago|today|this|morning|afternoon|evening|night|weekends?|week|month|monday|tuesday|wednesday|thursday|friday|saturday|sunday|\d|recently|days?)\b/i, 2], ["môn/hoạt động đã chơi", /\b(play\w*|football|soccer|badminton|tennis|basketball|swim\w*|run\w*|jogg\w*|volleyball|gym|yoga|cycl\w*|table tennis|sports?|match\w*|game\w*|exercis\w*)\b/i, 2]],
        [["trả lời về thói quen của bạn (chơi/xem thể thao)", /\b(also|too|play\w*|watch\w*|sports?|football|badminton|tennis|basketball|swim\w*|run\w*|match\w*|games?|tv|television|friends?|usually|often|sometimes|prefer\w*|like|love|enjoy\w*)\b/i, 2], ["chi tiết/lý do", /\b(because|since|as|so|weekends?|every|week|fun|healthy|relax\w*|team\w*|together|learn\w*|stress|exciting|ideas?|favou?rite)\b/i]],
        [["ý kiến về chơi thể thao với bạn hay một mình", /\b(alone|together|with (a )?friends?|team\w*|by yourself|by myself|on (my|your) own|solo|group|partner|both|prefer\w*|better|opinion|think|agree|depends)\b/i, 2], ["lý do/ví dụ", /\b(because|since|as|so|reason|for example|for instance|such as|fun|motivat\w*|freedom|relax\w*|competitive|enjoy\w*|time|learn\w*|run\w*|swim\w*)\b/i]],
      ],
      p4a: [["nhắc tới giải thi đấu thể thao cho thành viên trẻ", /\b(competitions?|tournament\w*|sports?|young|members?|match\w*|games?|event|suggest\w*|organi[sz]\w*|football|badminton)\b/i, 2], ["cảm xúc của bạn", FEEL], ["ý tưởng/điều bạn muốn làm", /\b(should|could|can|will|would|want|plan\w*|suggest\w*|idea\w*|help\w*|organi[sz]\w*|join\w*|let's|maybe|prizes?|medals?|teams?|football|badminton|tournament)\b/i]],
      p4b: [["nhắc tới giải thi đấu thể thao cho thành viên trẻ", /\b(competitions?|tournament\w*|sports?|young|members?|match\w*|games?|event|contest\w*)\b/i, 2], ["cảm nghĩ của bạn", FEEL], ["đề xuất tổ chức", SUGG], ["ý tưởng cụ thể (môn thi, thời gian, địa điểm, giải thưởng…)", /\b(football|badminton|tennis|basketball|volleyball|table tennis|swim\w*|running|race\w*|teams?|prizes?|medals?|certificates?|trophy|trophies|stadium|sports (centre|center|hall|ground)|courts?|schedule|weekend|sunday|saturday|referee\w*|rules?|registration|sponsor\w*|t-?shirts?)\b/i, 2]],
    },
    w27: {
      p1: ["open", "open", "open", "open", "open"],
      p2: [
        ["dùng laptop làm gì (học, làm việc, xem phim, giải trí…)", /\b(study\w*|homework|work\w*|watch\w*|videos?|movies?|music|games?|gam\w*|chat\w*|internet|brows\w*|email\w*|read\w*|writ\w*|type|typing|online|social|surf\w*|design\w*|programm\w*|cod\w*|shop\w*|learn\w*|research|presentations?|documents?|films?|youtube|facebook)\b/i, 2],
        ["nêu thói quen/mục đích (usually, also, to…)", /\b(usually|often|mostly|mainly|always|also|sometimes|every|use|for|to)\b/i],
      ],
      p3: [
        [["chọn xem phim trên laptop hay ra rạp", /\b(laptops?|computers?|theat(er|re)s?|cinemas?|home|screens?|movies?|films?|big screen|tickets?)\b/i, 2], ["tần suất/lý do (often, because…)", /\b(because|since|as|so|usually|often|sometimes|rarely|never|always|cheaper|comfortabl\w*|sound|prefer\w*|only|once|twice|weekends?)\b/i]],
        [["kể lại một sự cố máy tính (hỏng, mất dữ liệu, virus…)", /\b(crash\w*|broke\w*|broken|stopp\w*|shut\w*|froze\w*|freez\w*|lost|lose|virus\w*|slow|error|died|dead|deleted?|failed|problem|damag\w*|hack\w*|restart\w*|blue screen|battery|spilled?|fell|dropped?|data|files?|work|document|report)\b/i, 2], ["kể chuyện đã xảy ra (last, once, when, ago…)", /\b(last|once|when|ago|yesterday|one day|a few|years?|months?|weeks?|before|while|then|had|was|were|lost|did)\b/i], ["cảm xúc/hậu quả/bài học", /\b(angry|upset|sad|frustrat\w*|annoy\w*|worr\w*|panic\w*|stress\w*|terrible|awful|bad|disappoint\w*|learn\w*|now|since|back ?up|save\w*|never|lesson|so|because)\b/i]],
        [["ý kiến về việc công nghệ làm cuộc sống dễ hơn", OPINION], ["nhắc tới công nghệ/cuộc sống dễ dàng hơn", /\b(technolog\w*|easier|easy|convenien\w*|saves?|faster|quick\w*|time|internet|phones?|computers?|online|communicat\w*|life|lives|improv\w*|devices?|machines?|apps?|useful|helps?|efficien\w*)\b/i, 2], ["lý do/ví dụ", /\b(because|since|as|so|for example|for instance|such as|can|help\w*|save\w*|however|but|too much|depend\w*)\b/i]],
      ],
      p4a: [["nhắc tới bình luận tiêu cực/website/việc xác định người bình luận", /\b(comments?|post\w*|website|site|names?|rude|negativ\w*|identif\w*|anonymous|members?|polite\w*|online|club|real name|email)\b/i, 2], ["cảm xúc của bạn", FEEL], ["ý kiến của bạn về đề xuất đổi website", /\b(think|opinion|believe|agree|disagree|idea|good|bad|should|could|suggest\w*|sensible|fair|unfair|better|support\w*|against|worried|useful|important)\b/i]],
      p4b: [["nhắc tới bình luận tiêu cực/website/việc xác định người bình luận", /\b(comments?|post\w*|website|site|names?|rude|negativ\w*|identif\w*|anonymous|members?|polite\w*|online|real name|register\w*|account\w*)\b/i, 2], ["cảm nghĩ của bạn", FEEL], ["ý kiến/đề xuất của bạn", SUGG], ["giải pháp cụ thể để khắc phục", /\b(rules?|moderat\w*|delete\w*|remov\w*|warn\w*|report\w*|block\w*|ban\w*|filter\w*|policy|guidelines?|login|log in|register\w*|account\w*|verify|verif\w*|real names?|identif\w*|punish\w*|penalt\w*|admin\w*|monitor\w*|respect\w*|polite\w*|behaviou?r)\b/i, 2]],
    },
    w28: {
      p1: ["open", "open", "place", "open", "open"],
      p2: [
        ["nói có xem TV không (TV, television, watch…)", /\b(tv|television|watch\w*|programs?|programmes?|shows?|news|series|channels?|cartoons?|dramas?|screen)\b/i, 2],
        ["tần suất/thời điểm xem hoặc lý do", /\b(usually|often|sometimes|always|never|rarely|every|evening|night|weekends?|daily|hours?|seldom|hardly|because|relax\w*|after|before)\b/i],
      ],
      p3: [
        [["việc bạn thích làm khi xem TV", /\b(eat\w*|snacks?|drink\w*|tea|coffee|sofa|couch|bed|sit\w*|lie|lying|relax\w*|talk\w*|chat\w*|phone|family|friends?|laugh\w*|cook\w*|knit\w*|fold\w*|popcorn|comfortabl\w*|blanket|cry|sing|comment\w*|discuss\w*|enjoy\w*|read\w*|sleep|rest)\b/i, 2], ["tả cách/hoàn cảnh (when, usually, with…)", /\b(when|usually|often|sometimes|always|while|with|during|and|also)\b/i]],
        [["chọn xem một mình hay cùng người khác", /\b(alone|myself|on my own|by myself|with|others?|family|friends?|together|parents|brother|sister|husband|wife|people|company)\b/i, 2], ["lý do (because…)", /\b(because|since|as|so|reason|enjoy\w*|prefer\w*|share\w*|laugh\w*|talk\w*|discuss\w*|quiet|noise|focus|concentrat\w*|fun|lonely|opinions?)\b/i]],
        [["ý kiến: xem TV nhiều có tốt cho trẻ không", OPINION], ["nhắc tới trẻ em/xem TV nhiều", /\b(children|kids?|child|young|TV|television|programs?|programmes?|screens?|cartoons?|watch\w*|hours?|too much|a lot)\b/i, 2], ["lý do/lợi hại (mắt, học tập, ngủ…)", /\b(because|since|as|so|eyes|sight|sleep|study\w*|homework|health\w*|lazy|violen\w*|educat\w*|learn\w*|outside|play\w*|exercise|bad|harm\w*|good|useful|benefit\w*|limit\w*|time|brain|creativ\w*|attention|obes\w*|social)\b/i]],
      ],
      p4a: [["nhắc tới sự kiện/địa điểm/người nước ngoài", /\b(events?|places?|venues?|foreign\w*|visitors?|guests?|tourists?|international|party|festival|location|hall|centre|center|theat(er|re)|club)\b/i, 2], ["cảm xúc của bạn", FEEL], ["gợi ý sự kiện hoặc địa điểm", /\b(suggest\w*|think|could|should|idea|how about|why not|let's|shall|maybe|perhaps|propos\w*|recommend\w*|hold|organi[sz]\w*|at the|in the|would be|good place|best)\b/i]],
      p4b: [["nhắc tới sự kiện/người nước ngoài tham dự", /\b(events?|foreign\w*|visitors?|guests?|tourists?|international|attend\w*|welcome\w*|overseas|other countries|party|festival|evening)\b/i, 2], ["cảm nghĩ của bạn", FEEL], ["đề xuất của bạn", SUGG], ["địa điểm cụ thể và lý do chọn", /\b(cent(er|re)s?|hall|theat(er|re)s?|cinemas?|hotels?|restaurants?|park|cafe|caf[eé]|museum|library|stadium|studio|school|university|club|garden|place|venue|location|central|downtown|city|convenient|easy to (find|reach|get)|bus|station|transport|parking|close to|near)\b/i, 2], ["hoạt động/chương trình cho sự kiện", /\b(film|movie|show|screening|quiz|game|music|food|snacks?|drinks?|guide\w*|subtitles?|translat\w*|interpret\w*|performance|talk|workshop|competition|party|dance|traditional|cultur\w*)\b/i]],
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
