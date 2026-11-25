/* Ngân hàng đề Reading — nội dung do FlashAptis tự biên soạn.
   Part 1: điền từ (gap) · Part 2–3: sắp xếp câu (order) · Part 4: ghép ý kiến (opinion) · Part 5: chọn tiêu đề (heading) */
window.FA_READING = [
  {
    id: "r1",
    title: "Đề 1 — Weekend plans",
    hot: true,
    parts: [
      {
        type: "gap",
        title: "Part 1 · Sentence comprehension",
        instr: "Đọc email và chọn từ đúng cho mỗi chỗ trống.",
        text:
          "Hi Lan,\nThanks for your message. I'm sorry I couldn't {0} your call yesterday – I was at the dentist. This weekend I'm going to the {1} with my family because my brother wants to buy new shoes. After that we will have lunch at a small {2} near the river. The weather forecast says it will be {3}, so bring an umbrella if you want to join us. Let me know before Friday so I can {4} a table for you too.\nLove, Mai",
        gaps: [
          { o: ["answer", "speak", "tell"], a: 0, e: "answer a call: nghe máy/trả lời cuộc gọi." },
          { o: ["library", "shopping centre", "hospital"], a: 1, e: "Mua giày → shopping centre (trung tâm mua sắm)." },
          { o: ["restaurant", "station", "office"], a: 0, e: "Ăn trưa → restaurant." },
          { o: ["sunny", "rainy", "dry"], a: 1, e: "Mang ô (umbrella) → trời mưa: rainy." },
          { o: ["book", "write", "take"], a: 0, e: "book a table: đặt bàn." },
        ],
      },
      {
        type: "order",
        title: "Part 2 · Text cohesion",
        instr: "Sắp xếp các câu theo đúng thứ tự để tạo thành đoạn văn hoàn chỉnh. Câu đầu tiên đã cho sẵn.",
        topic: "How to join the city library",
        first: "Joining the city library is quick and completely free.",
        sentences: [
          "First, you need to fill in a short form at the front desk.",
          "On this form, write your full name, address and phone number.",
          "Then the staff will ask you to show a document that proves your address.",
          "After they check it, they will give you a plastic library card.",
          "With this card, you can borrow up to five books at a time.",
        ],
        tip: "Mẹo: tìm từ nối chỉ trình tự (First → Then → After) và đại từ trỏ ngược (this form, it, this card).",
      },
      {
        type: "order",
        title: "Part 3 · Text cohesion",
        instr: "Sắp xếp các câu theo đúng thứ tự để tạo thành câu chuyện hoàn chỉnh. Câu đầu tiên đã cho sẵn.",
        topic: "A lost wallet",
        first: "Last Saturday, Tom went to the market to buy some vegetables.",
        sentences: [
          "When he wanted to pay, he realised that his wallet was missing.",
          "He went back to every stall he had visited, but he could not find it.",
          "Feeling worried, he decided to report the problem to a security guard.",
          "The guard smiled and took a brown wallet out of his pocket.",
          "A kind old lady had found it on the ground and handed it in an hour earlier.",
        ],
        tip: "Mẹo: 'it' trỏ về 'wallet'; 'The guard' phải đứng sau câu nhắc tới 'a security guard'.",
      },
      {
        type: "opinion",
        title: "Part 4 · Opinion matching",
        instr: "Đọc ý kiến của 4 người về việc làm việc tại nhà. Ai có ý kiến nào? Chọn người phù hợp (một người có thể được chọn nhiều lần).",
        topic: "Working from home",
        people: [
          { name: "Anna", text: "I started working from home two years ago and I will never go back. I save almost two hours every day because I don't have to travel. I use that time to exercise, so I feel much healthier. The only thing I don't like is that my kitchen has become my office!" },
          { name: "Ben", text: "Honestly, I find it hard to concentrate at home. My children are always around and the neighbours are noisy. I go to the office three days a week now. I also miss chatting with my colleagues during lunch – video calls are just not the same." },
          { name: "Chloe", text: "For me, the biggest advantage is money. I don't spend anything on petrol or expensive coffees near the office. However, my electricity bills are higher in winter because I need to heat the flat all day." },
          { name: "David", text: "I think it depends on the job. In my team, people who write reports work better at home, but when we need new ideas, we must meet face to face. Our manager lets everyone choose, and I think that is the best solution." },
        ],
        questions: [
          { q: "Who says working from home has improved their health?", a: 0 },
          { q: "Who thinks the best way is to let workers decide?", a: 3 },
          { q: "Who finds it difficult to focus at home?", a: 1 },
          { q: "Who mentions that some bills have increased?", a: 2 },
          { q: "Who misses social contact with co-workers?", a: 1 },
          { q: "Who says a part of their home is now used for work?", a: 0 },
          { q: "Who believes creative work needs people in the same room?", a: 3 },
        ],
      },
      {
        type: "heading",
        title: "Part 5 · Long text comprehension",
        instr: "Đọc bài viết và chọn tiêu đề phù hợp nhất cho mỗi đoạn. Có 1 tiêu đề thừa.",
        topic: "Community gardens",
        headings: [
          "A solution to loneliness",
          "Learning outside the classroom",
          "How it all began",
          "Problems with space and money",
          "Food that travels a short distance",
          "Good for nature, too",
          "Advice for starting your own",
          "Famous gardeners on television",
        ],
        paragraphs: [
          { text: "The first community gardens in many cities appeared during difficult times, when families needed extra food. Local people turned empty land into vegetable plots, and the idea slowly spread from one neighbourhood to the next.", a: 2 },
          { text: "Today, many people join a garden not for the vegetables but for the company. Older residents who live alone say the garden gives them a reason to leave the house and a chance to talk to their neighbours every day.", a: 0 },
          { text: "Schools often bring pupils to these gardens. Children who have never seen a carrot growing learn where their food comes from, and teachers say lessons about plants are much easier to understand when pupils can touch the soil.", a: 1 },
          { text: "Vegetables from a community garden usually go straight from the ground to the kitchen. Because they do not need to be transported across the country, they are fresher and their production creates less pollution.", a: 4 },
          { text: "These green spaces also help wildlife. Bees, butterflies and birds find food and shelter there, and experts say even a small garden in the middle of a city can support dozens of different species.", a: 5 },
          { text: "However, gardens are not always easy to keep. Land in cities is expensive, and some groups have lost their plots when the owner decided to build flats. Others struggle to pay for water and tools.", a: 3 },
          { text: "If you would like to create a garden in your area, start by talking to your local council. Find a few neighbours who are interested, choose a sunny spot, and begin with easy plants such as herbs and lettuce.", a: 6 },
        ],
      },
    ],
  },
  {
    id: "r2",
    title: "Đề 2 — Travel & study",
    parts: [
      {
        type: "gap",
        title: "Part 1 · Sentence comprehension",
        instr: "Đọc tin nhắn và chọn từ đúng cho mỗi chỗ trống.",
        text:
          "Dear Peter,\nI have just {0} in Da Nang and the hotel is lovely. My room is on the fifth {1} and I can see the sea from the window. Tomorrow I'm going to {2} a bike and ride along the coast. The receptionist told me the museum is {3} on Mondays, so I will visit it on Tuesday instead. I'll send you some {4} of the beach later.\nBest wishes, Linh",
        gaps: [
          { o: ["arrived", "reached", "got to"], a: 0, e: "arrive in + địa điểm lớn. 'reached/got to' không đi với 'in'." },
          { o: ["floor", "level", "stair"], a: 0, e: "on the fifth floor: ở tầng 5." },
          { o: ["hire", "lend", "pay"], a: 0, e: "hire a bike: thuê xe đạp." },
          { o: ["open", "closed", "busy"], a: 1, e: "Vì vậy đi thăm vào thứ Ba → thứ Hai bảo tàng đóng cửa (closed)." },
          { o: ["photos", "letters", "tickets"], a: 0, e: "send some photos of the beach: gửi ảnh bãi biển." },
        ],
      },
      {
        type: "order",
        title: "Part 2 · Text cohesion",
        instr: "Sắp xếp các câu theo đúng thứ tự. Câu đầu tiên đã cho sẵn.",
        topic: "Making a cup of tea",
        first: "Making a good cup of tea is easier than many people think.",
        sentences: [
          "To begin with, boil some fresh water in a kettle.",
          "While the water is heating, put a tea bag into your favourite cup.",
          "When the water has boiled, pour it over the tea bag.",
          "Leave it for about three minutes so that the flavour becomes stronger.",
          "Finally, take the bag out and add milk or sugar if you like.",
        ],
        tip: "Mẹo: To begin with → While → When → Leave it → Finally.",
      },
      {
        type: "order",
        title: "Part 3 · Text cohesion",
        instr: "Sắp xếp các câu theo đúng thứ tự. Câu đầu tiên đã cho sẵn.",
        topic: "Maria's language course",
        first: "Maria had always dreamed of studying English abroad.",
        sentences: [
          "Last year, she finally saved enough money to join a summer course in Brighton.",
          "The course lasted six weeks and included lessons every morning.",
          "In the afternoons, the students went on trips to nearby towns and castles.",
          "Thanks to these trips, she made friends from many different countries.",
          "She still keeps in touch with them and they plan to meet again next year.",
        ],
        tip: "Mẹo: 'The course' trỏ về 'a summer course'; 'these trips' trỏ về câu nói về chuyến đi; 'them' = friends.",
      },
      {
        type: "opinion",
        title: "Part 4 · Opinion matching",
        instr: "Đọc ý kiến của 4 người về mạng xã hội. Ai có ý kiến nào?",
        topic: "Social media",
        people: [
          { name: "Emma", text: "I use social media mainly to keep in touch with my cousins in Australia. Without it, I would only hear from them once a year. I'm careful, though – I never post photos of my home or say where I am." },
          { name: "Faisal", text: "I deleted all my accounts last year. I was spending three or four hours a day scrolling and I felt tired all the time. Now I read more books and I sleep better." },
          { name: "Grace", text: "Social media helped me start my small cake business. I post pictures of my cakes and customers order through messages. It costs me nothing to advertise, which is fantastic." },
          { name: "Hugo", text: "I think schools should teach young people how to use social media safely. Many teenagers believe everything they read online. They need to learn how to check if information is true." },
        ],
        questions: [
          { q: "Who uses social media to earn money?", a: 2 },
          { q: "Who protects their privacy online?", a: 0 },
          { q: "Who thinks education about social media is needed?", a: 3 },
          { q: "Who says their sleep has improved?", a: 1 },
          { q: "Who uses it to stay in contact with relatives?", a: 0 },
          { q: "Who mentions that it is a free way to promote something?", a: 2 },
          { q: "Who is worried that young people trust false information?", a: 3 },
        ],
      },
      {
        type: "heading",
        title: "Part 5 · Long text comprehension",
        instr: "Chọn tiêu đề phù hợp nhất cho mỗi đoạn. Có 1 tiêu đề thừa.",
        topic: "The four-day working week",
        headings: [
          "An idea that is not new",
          "Happier and healthier staff",
          "Not suitable for every business",
          "What the trial involved",
          "Benefits for the environment",
          "Customers noticed no difference",
          "What will happen next",
          "Workers who earned more money",
        ],
        paragraphs: [
          { text: "Reducing the number of working days is not a modern idea. As early as the 1950s, some economists predicted that new machines would allow people to work only a few days a week.", a: 0 },
          { text: "Recently, dozens of companies took part in a six-month experiment. Employees worked four days instead of five but received the same salary, and researchers measured their productivity throughout the period.", a: 3 },
          { text: "At the end of the experiment, most employees said they felt less stressed. Many reported sleeping better and having more time for exercise and family, and fewer people took sick days.", a: 1 },
          { text: "Managers were surprised to find that clients were just as satisfied as before. Orders were completed on time and the number of complaints did not rise.", a: 5 },
          { text: "With one less day of travel each week, workers used their cars less often. Offices also used less electricity, which helped the companies reduce their carbon emissions.", a: 4 },
          { text: "However, the system does not work everywhere. Hospitals, shops and restaurants need staff every day, so they would have to employ more people, which could be very expensive.", a: 2 },
          { text: "Most of the companies in the experiment have decided to continue with the four-day week. Several governments are now watching the results closely before deciding whether to support the idea nationally.", a: 6 },
        ],
      },
    ],
  },
  {
    id: "r3",
    title: "Đề 3 — City & technology",
    parts: [
      {
        type: "gap",
        title: "Part 1 · Sentence comprehension",
        instr: "Đọc email và chọn từ đúng cho mỗi chỗ trống.",
        text:
          "Hi Minh,\nThank you for {0} me to your birthday party on Saturday. I would love to come, {1} I might arrive a little late because my train gets in at six. Could you send me your {2} again so I can find your flat easily? Also, let me know if I should {3} any drinks or snacks. I'm really looking {4} to seeing everyone!\nCheers, Alex",
        gaps: [
          { o: ["inviting", "asking", "saying"], a: 0, e: "thank someone for inviting: cảm ơn ai đã mời." },
          { o: ["so", "but", "because"], a: 1, e: "Rất muốn đến, nhưng (but) có thể đến muộn." },
          { o: ["address", "number", "ticket"], a: 0, e: "Gửi lại địa chỉ (address) để tìm được căn hộ." },
          { o: ["bring", "take", "carry"], a: 0, e: "bring drinks or snacks: mang theo đồ uống/đồ ăn nhẹ tới bữa tiệc." },
          { o: ["forward", "ahead", "after"], a: 0, e: "look forward to + V-ing: mong chờ." },
        ],
      },
      {
        type: "order",
        title: "Part 2 · Text cohesion",
        instr: "Sắp xếp các câu theo đúng thứ tự để tạo thành đoạn văn hoàn chỉnh. Câu đầu tiên đã cho sẵn.",
        topic: "Using a public bike-sharing app",
        first: "Many large cities now offer shared bicycles for short journeys.",
        sentences: [
          "To get started, download the bike-sharing app and create an account.",
          "Once you are registered, open the map on your phone to find the nearest bike station.",
          "At the station, scan the QR code on a bicycle to unlock it.",
          "When your ride is finished, park the bike in any official rack until you hear a click.",
          "Finally, check the app to confirm that your trip has ended and see the total cost.",
        ],
        tip: "Mẹo: tìm trình tự thao tác (download → find station → unlock → park → confirm).",
      },
      {
        type: "order",
        title: "Part 3 · Text cohesion",
        instr: "Sắp xếp các câu theo đúng thứ tự để tạo thành câu chuyện hoàn chỉnh. Câu đầu tiên đã cho sẵn.",
        topic: "A power cut during dinner",
        first: "Last Friday evening, our family sat down for dinner when all the lights suddenly went out.",
        sentences: [
          "At first we thought only our flat had a problem, so my father checked the fuse box.",
          "However, looking out of the window, we saw that the entire street was completely dark.",
          "Since our phones still had battery, my mother found a few candles in a kitchen drawer.",
          "By candlelight, we ended up talking and telling jokes for nearly two hours.",
          "When the electricity finally came back at ten o'clock, everyone almost wished it had stayed off longer.",
        ],
        tip: "Mẹo: 'only our flat' → 'However... entire street' → 'candles' → 'By candlelight' → 'finally came back'.",
      },
      {
        type: "opinion",
        title: "Part 4 · Opinion matching",
        instr: "Đọc ý kiến của 4 người về việc không dùng tiền mặt. Ai có ý kiến nào? Chọn người phù hợp.",
        topic: "Cashless payments",
        people: [
          { name: "Claire", text: "I rarely carry notes or coins any more. Paying with my phone takes two seconds, and I don't have to wait for change at the supermarket. Every payment shows up in my banking app automatically, which helps me track my budget." },
          { name: "Ethan", text: "Digital payments are convenient, but they make me spend too much. When I tap a card, it doesn't feel like real money. Since I started taking out a fixed amount of cash every Monday, I have saved noticeably more." },
          { name: "Nadia", text: "Going completely cashless worries me because technology can fail. Last month a payment network crashed for three hours, and people couldn't even buy train tickets. Older relatives of mine also struggle with banking apps." },
          { name: "Sam", text: "As a café owner, I love card and QR payments. Counting cash every evening used to take forty minutes, and there was always a risk of theft. Still, I keep a small cash drawer for tourists or customers whose phones run out of battery." },
        ],
        questions: [
          { q: "Who finds it easier to manage monthly spending with an app?", a: 0 },
          { q: "Who believes paying by card encourages overspending?", a: 1 },
          { q: "Who is concerned about system breakdowns?", a: 2 },
          { q: "Who says digital payments save time at work?", a: 3 },
          { q: "Who thinks some elderly people find apps difficult?", a: 2 },
          { q: "Who mentions feeling safer without large amounts of cash?", a: 3 },
          { q: "Who controls spending by withdrawing cash weekly?", a: 1 },
        ],
      },
      {
        type: "heading",
        title: "Part 5 · Long text comprehension",
        instr: "Đọc bài viết về mái nhà xanh ở đô thị và chọn tiêu đề phù hợp nhất cho mỗi đoạn. Có 1 tiêu đề thừa.",
        topic: "Green roofs in cities",
        headings: [
          "Saving energy inside buildings",
          "What a green roof actually is",
          "Reducing the risk of flooding",
          "Growing food high above the street",
          "High costs and structural limits",
          "Helping birds and insects survive",
          "Government support and future rules",
          "Why traditional roofs last longer",
        ],
        paragraphs: [
          { text: "A green roof is not simply a few potted plants placed on a balcony. It is a specially designed layer of soil and hardy vegetation built directly on top of a flat or gently sloped building roof, with waterproof sheets underneath.", a: 1 },
          { text: "In summer, ordinary dark roofs absorb heat and turn upper floors into ovens. Plants and soil reflect sunlight and cool the air through evaporation, meaning offices and apartments below need far less air conditioning.", a: 0 },
          { text: "Modern cities are covered in concrete, so heavy rain rushes straight into drains and can overwhelm rivers. A green roof acts like a giant sponge, soaking up much of the rainwater and releasing it slowly.", a: 2 },
          { text: "Miles of concrete leave little room for nature. Urban rooftops planted with wildflowers give bees, butterflies and nesting birds safe places to feed and rest away from street traffic.", a: 5 },
          { text: "Some hotels and restaurants go a step further by turning their roofs into mini farms. Chefs walk upstairs before dinner service to pick fresh tomatoes, lettuce and herbs grown right above the kitchen.", a: 3 },
          { text: "Despite these advantages, green roofs are not simple to install on older buildings. Wet soil is heavy, so engineers must first check whether the walls and beams can support the extra weight, and installation fees can be steep.", a: 4 },
          { text: "To encourage adoption, several European and Asian cities now offer tax discounts to developers who add rooftop gardens. In a few places, new commercial buildings above a certain size are legally required to include them.", a: 6 },
        ],
      },
    ],
  },
  {
    "id": "r4",
    "title": "Đề 4 — Music festival",
    "parts": [
      {
        "type": "gap",
        "title": "Part 1 · Sentence comprehension",
        "instr": "Chọn từ đúng cho mỗi chỗ trống.",
        "text": "Hey Lewis,\nI {0} reading books in the library.\nMy bag is a bit {1} for my laptop.\nCan you go to the {2} to buy some milk?\nThere are many {3} in the class.\nMy classmates want to {4} the new library after school.\nLove,\nHelen",
        "gaps": [
          {
            "o": [
              "love",
              "make",
              "run"
            ],
            "a": 0,
            "e": "'love reading books' — thích đọc sách; 'make/run reading' không có nghĩa."
          },
          {
            "o": [
              "mean",
              "small",
              "again"
            ],
            "a": 1,
            "e": "'a bit small for my laptop' — cặp hơi nhỏ, không vừa máy tính."
          },
          {
            "o": [
              "shop",
              "park",
              "sea"
            ],
            "a": 0,
            "e": "'buy some milk' → phải đến cửa hàng (shop) mới mua được sữa."
          },
          {
            "o": [
              "people",
              "birds",
              "trees"
            ],
            "a": 0,
            "e": "'in the class' → trong lớp học có nhiều người (people), không phải chim hay cây."
          },
          {
            "o": [
              "room",
              "visit",
              "fly"
            ],
            "a": 1,
            "e": "Sau 'want to' cần động từ hợp nghĩa: 'visit the new library' — đến thăm thư viện mới."
          }
        ]
      },
      {
        "type": "order",
        "title": "Part 2 · Text cohesion",
        "instr": "Sắp xếp các câu theo đúng thứ tự để tạo thành đoạn văn hoàn chỉnh. Câu đầu tiên đã cho sẵn.",
        "topic": "Music show at the park",
        "first": "The event was fully planned, financed, and supported by local authorities.",
        "sentences": [
          "As a result, entry was free, and around five thousand people attended.",
          "Many attendees arrived early and browsed local shops before the event began.",
          "Despite the busy day, workers finished ahead of schedule and watched the famous singer perform.",
          "The two-hour performance thrilled the audience, leaving everyone in high spirits."
        ],
        "tip": "Mẹo: chính quyền tài trợ ('financed') → 'As a result, entry was free' (kết quả: vào cửa miễn phí); 'attendees' trỏ về 'people attended' và họ ghé cửa hàng 'before the event began' → nhân viên cửa hàng có 'busy day' nhưng vẫn kịp xem ca sĩ biểu diễn → câu kết 'The two-hour performance' nói về chính buổi diễn đó."
      },
      {
        "type": "opinion",
        "title": "Part 3 · Opinion matching",
        "instr": "Đọc ý kiến của 4 người về một lễ hội âm nhạc. Chọn người phù hợp cho mỗi câu hỏi (một người có thể được chọn nhiều lần).",
        "topic": "Music festival",
        "people": [
          {
            "name": "",
            "text": "We were playing in a band, and we finished our performance in the morning. However, I stayed at the festival to meet up with some old bandmates. We talked a lot. However, I didn't like the venue. It was too crowded and not well organized. The road to the tent village was also congested. I think they should choose a better location next year."
          },
          {
            "name": "",
            "text": "I really enjoyed the music at this festival, and I danced to the music. I felt every second of the festival was worth it. I absolutely loved the energy of the performances, and the music was spot on throughout the weekend. However, I have to say the ticket prices were far too high, especially for students. I paid almost double what I did two years ago, and although I enjoyed the music, I'm not sure it offered good value for money. If they don't lower the prices next year, a lot of people might skip it."
          },
          {
            "name": "",
            "text": "I've been to this festival a couple of times in the past. The quality was good the last times I came, but this time was completely different. The sound quality wasn't great, and the whole event just felt disorganized. There weren't enough facilities, and the staff didn't seem prepared to handle the crowd. I couldn't even interact with the band. I don't think I'll be coming back next year. It's simply not worth the money or the time anymore."
          },
          {
            "name": "",
            "text": "This was my first time attending the Music Festival, and to be honest, the weather really didn't cooperate. It rained heavily on the first two days, which made it difficult to enjoy the outdoor activities. I still got wet in the tent. But I didn't let that ruin the experience. On the final day, the skies cleared up and the performances were truly amazing, especially the final act in the evening. That last day made it all worthwhile, and I left with some great memories despite the poor weather."
          }
        ],
        "questions": [
          {
            "q": "Who liked the last performance of the show?",
            "a": 3,
            "e": "D: 'especially the final act in the evening' — đặc biệt thích tiết mục cuối cùng buổi tối."
          },
          {
            "q": "Who was disappointed with the festival?",
            "a": 2,
            "e": "C: 'this time was completely different', 'not worth the money or the time anymore' → thất vọng, không muốn quay lại."
          },
          {
            "q": "Who thought it was too expensive?",
            "a": 1,
            "e": "B: 'the ticket prices were far too high' — giá vé quá cao."
          },
          {
            "q": "Who experienced bad weather?",
            "a": 3,
            "e": "D: 'It rained heavily on the first two days' — mưa to hai ngày đầu."
          },
          {
            "q": "Who liked to meet old friends?",
            "a": 0,
            "e": "A: 'I stayed at the festival to meet up with some old bandmates' — ở lại gặp bạn cũ cùng ban nhạc."
          },
          {
            "q": "Who enjoyed the music throughout the event?",
            "a": 1,
            "e": "B: 'I really enjoyed the music', 'the music was spot on throughout the weekend' — thích âm nhạc suốt cả lễ hội (D chỉ thích ngày cuối)."
          },
          {
            "q": "Who didn't like the venue?",
            "a": 0,
            "e": "A: 'I didn't like the venue. It was too crowded' — không thích địa điểm tổ chức."
          }
        ]
      },
      {
        "type": "heading",
        "title": "Part 4 · Long text comprehension",
        "instr": "Đọc bài viết và chọn tiêu đề phù hợp nhất cho mỗi đoạn.",
        "topic": "The Arrival of the Four-Day Work Week",
        "headings": [
          "Unfair for some people",
          "Alternative solutions worth considering",
          "Unforeseen challenges for employees",
          "Undesirable financial consequences",
          "Benefits for employees",
          "A way of life now out of date",
          "Difficult to change old habits"
        ],
        "paragraphs": [
          {
            "text": "The familiar Monday-to-Friday timetable emerged from an industrial world in which output was closely connected to time spent beside a machine. Much contemporary work is organized differently: teams collaborate across locations, software completes routine tasks, and results can matter more than visible attendance. Keeping the same pattern simply because it is familiar may therefore be inefficient. The current debate asks whether a schedule designed for an earlier economy still suits organizations whose work, technology, and employees have changed substantially.",
            "a": 5,
            "e": "Lịch thứ Hai–thứ Sáu ra đời từ 'an industrial world', 'designed for an earlier economy' → 'A way of life now out of date' (lối sống đã lỗi thời)."
          },
          {
            "text": "An additional non-working day gives staff room to deal with appointments, domestic tasks, and recovery without using annual leave. Some return with greater concentration because they have had enough time to rest rather than spending the weekend catching up on obligations. Families may also coordinate childcare more easily, and staff gain more control over their lives. These improvements can strengthen morale and reduce the temptation to seek another job, even when total pay remains unchanged.",
            "a": 4,
            "e": "Thêm ngày nghỉ giúp nhân viên tập trung hơn, 'gain more control over their lives', 'strengthen morale' → 'Benefits for employees'."
          },
          {
            "text": "A reduced schedule does not automatically reduce the number of customers, patients, or calls that an organization must handle. To maintain coverage, an employer may need overlapping teams, additional recruitment, or overtime payments. Smaller firms with narrow profit margins may find these arrangements difficult to absorb. If wages are cut instead, staff carry the cost; if prices rise, customers do. The model can therefore create expenses that are easy to overlook when attention is focused only on its social appeal.",
            "a": 3,
            "e": "Nói về 'overtime payments', 'narrow profit margins', 'create expenses' → hệ quả tài chính không mong muốn: 'Undesirable financial consequences'."
          },
          {
            "text": "When five days of tasks are compressed into four, the timetable may become more intense rather than more efficient. Meetings are placed closer together, messages accumulate during the extra day off, and delays occur when partner organizations follow a different schedule. Employees who need quiet time for complex work may discover that every available hour has been filled. These effects are not always visible during a short trial, but they can emerge once unusual deadlines, absences, and seasonal demand test the new arrangement.",
            "a": 2,
            "e": "Lịch làm việc 'more intense', 'every available hour has been filled', 'not always visible during a short trial' → khó khăn không lường trước cho nhân viên: 'Unforeseen challenges for employees'."
          },
          {
            "text": "Changing the calendar is easier than changing assumptions about what a committed employee looks like. Some managers continue to trust people they can see at a desk, while workers may feel guilty for leaving after completing their tasks. Families and transport arrangements are also built around familiar hours. Even when evidence supports a new pattern, routines developed over many years can make it feel risky or improper. Successful adoption therefore depends on changing expectations as well as updating contracts.",
            "a": 6,
            "e": "'changing assumptions', 'routines developed over many years' khó thay đổi → 'Difficult to change old habits'."
          },
          {
            "text": "A software company may close on Friday with little disruption, but a hospital, hotel, transport service, or shop cannot simply stop serving the public. Employees in these sectors might receive fewer advantages or be asked to work longer shifts while office staff enjoy an extra day away. Differences also arise between salaried and hourly workers. Unless the policy is carefully designed, a reform presented as progress could widen existing divisions between occupations and employment conditions.",
            "a": 0,
            "e": "Nhân viên bệnh viện, khách sạn 'might receive fewer advantages', 'widen existing divisions' → không công bằng với một số người: 'Unfair for some people'."
          },
          {
            "text": "Organizations do not have to choose between the traditional timetable and one fixed replacement. Some allow staff to select different days away, others shorten each working day, and certain teams alternate their schedules so that services remain available. Seasonal arrangements may also suit businesses whose workload changes during the year. Testing several models can preserve the advantages of greater control and recovery without forcing every workplace to operate according to a pattern that ignores its particular demands.",
            "a": 1,
            "e": "Đưa ra nhiều cách khác: chọn ngày nghỉ, rút ngắn mỗi ngày, 'Testing several models' → 'Alternative solutions worth considering'."
          }
        ]
      }
    ]
  },
  {
    "id": "r5",
    "title": "Đề 5 — Mountain summits",
    "parts": [
      {
        "type": "gap",
        "title": "Part 1 · Sentence comprehension",
        "instr": "Chọn từ đúng cho mỗi chỗ trống.",
        "text": "Hey Lewis,\nMy bedroom is very {0}.\nWe usually {1} at a hotel on vacation.\nThere are many flowers in the {2}.\nSome {3} near my home are very tall.\nMy grandfather is very {4} but still strong.\nLove,\nHelen",
        "gaps": [
          {
            "o": [
              "hungry",
              "small",
              "healthy"
            ],
            "a": 1,
            "e": "Phòng ngủ chỉ có thể 'very small' (rất nhỏ); phòng không thể 'hungry' (đói) hay 'healthy' (khỏe mạnh)."
          },
          {
            "o": [
              "stay",
              "movie",
              "bring"
            ],
            "a": 0,
            "e": "'stay at a hotel' — ở khách sạn khi đi nghỉ."
          },
          {
            "o": [
              "sky",
              "garden",
              "water"
            ],
            "a": 1,
            "e": "Hoa mọc 'in the garden' — trong vườn."
          },
          {
            "o": [
              "cloud",
              "trees",
              "morning"
            ],
            "a": 1,
            "e": "'Some trees ... are very tall' — cây cao; động từ 'are' cần danh từ số nhiều."
          },
          {
            "o": [
              "hot",
              "old",
              "free"
            ],
            "a": 1,
            "e": "'very old but still strong' — rất già nhưng vẫn khỏe (but thể hiện tương phản)."
          }
        ]
      },
      {
        "type": "order",
        "title": "Part 2 · Text cohesion",
        "instr": "Sắp xếp các câu theo đúng thứ tự để tạo thành đoạn văn hoàn chỉnh. Câu đầu tiên đã cho sẵn.",
        "topic": "Workplace evolution",
        "first": "Modern workplaces are adopting more flexible work models.",
        "sentences": [
          "In the past, employees followed strict nine-to-five schedules.",
          "Limited technology also restricted remote work possibilities.",
          "Today, however, companies experiment with shorter workweeks to boost productivity.",
          "In addition, managers now use software to track project progress remotely."
        ],
        "tip": "Mẹo: câu chủ đề nói chung về sự thay đổi → 'In the past' mở phần quá khứ → 'also restricted' bổ sung thêm một hạn chế thời đó → 'Today, however' chuyển sang hiện tại, tương phản với quá khứ → 'In addition ... now' bổ sung thêm một thay đổi hiện nay."
      },
      {
        "type": "opinion",
        "title": "Part 3 · Opinion matching",
        "instr": "Đọc ý kiến của 4 người về việc làm và đào tạo. Chọn người phù hợp cho mỗi câu hỏi (một người có thể được chọn nhiều lần).",
        "topic": "Job and training",
        "people": [
          {
            "name": "",
            "text": "When I first graduated from school, I wasn't sure what to do, so I joined several volunteer programs with different companies and organizations to gain experience. I really enjoyed volunteering because it helped me decide on a career path and gave me many valuable lessons. I also believe I was able to make a difference through my work."
          },
          {
            "name": "",
            "text": "Back in school, I already knew I wanted to become a teacher, so I didn't need to try other jobs. I decided to study education at university, which is free in my country. Last summer, I did some practical training in local schools, and it was extremely helpful for my future career."
          },
          {
            "name": "",
            "text": "When I was young, I used to help my neighbor, a plumber, with simple jobs like measuring pipes, loosening screws, and handling tools. It felt very natural for me to learn that kind of work, so later I studied for two years at university to become an electrician. Now, I've learned that there are shorter courses available in this field, and I regret not choosing that option instead."
          },
          {
            "name": "",
            "text": "After graduating, I found it really difficult to get a job. I applied to many companies, but none accepted me because I lacked experience. Eventually, I found work at a gaming company that allowed me to work from home. It didn't affect my daily schedule – I worked at night while my colleagues worked during the day – and that arrangement suited me perfectly."
          }
        ],
        "questions": [
          {
            "q": "Who likes working with their hands?",
            "a": 2,
            "e": "C: giúp thợ sửa ống nước 'measuring pipes, loosening screws, and handling tools', thấy 'very natural' → thích làm việc tay chân."
          },
          {
            "q": "Who enjoys working during their training?",
            "a": 1,
            "e": "B: 'I did some practical training in local schools, and it was extremely helpful' — thực tập ở trường và thấy rất bổ ích."
          },
          {
            "q": "Who thinks it is very hard to get your first job?",
            "a": 3,
            "e": "D: 'I found it really difficult to get a job', 'none accepted me because I lacked experience' → rất khó tìm việc đầu tiên vì thiếu kinh nghiệm."
          },
          {
            "q": "Who thinks their training was too long?",
            "a": 2,
            "e": "C: học 2 năm đại học rồi biết 'there are shorter courses' và 'regret not choosing that option' → thấy khóa học quá dài."
          },
          {
            "q": "Who did not want to choose another job?",
            "a": 1,
            "e": "B: 'I already knew I wanted to become a teacher, so I didn't need to try other jobs' → đã biết mình muốn làm giáo viên nên không cần thử nghề khác."
          },
          {
            "q": "Who enjoys working in a flexible working environment?",
            "a": 3,
            "e": "D: công ty 'allowed me to work from home', làm ban đêm và 'that arrangement suited me perfectly'."
          },
          {
            "q": "Who thinks they benefited from working for free?",
            "a": 0,
            "e": "A: tham gia 'volunteer programs' (làm tình nguyện = không lương), 'gave me many valuable lessons'."
          }
        ]
      },
      {
        "type": "heading",
        "title": "Part 4 · Long text comprehension",
        "instr": "Đọc bài viết và chọn tiêu đề phù hợp nhất cho mỗi đoạn.",
        "topic": "Mountain summits",
        "headings": [
          "A more intimate relationship",
          "Changing the definition of mountain",
          "The wrong priority",
          "Focus on sustainability",
          "The unique feeling of achievement",
          "A disturbing consequence",
          "Publicity of achievement"
        ],
        "paragraphs": [
          {
            "text": "In the modern consciousness, the definition of a mountain has evolved far beyond its geological description as a massive landform of rock and ice. Historically viewed as sacred barriers or purely natural entities, mountains are increasingly defined by humans as 'vertical arenas' for personal testing. This conceptual shift transforms the mountain from a part of the ecosystem into a commodity – a challenge to be overcome rather than a landscape to be respected.",
            "a": 1,
            "e": "'the definition of a mountain has evolved', 'This conceptual shift' → định nghĩa về núi đang thay đổi: 'Changing the definition of mountain'."
          },
          {
            "text": "This new definition is driven by a powerful psychological reward: the unique feeling of achievement. When a climber pushes their physical limits to reach a summit, the combination of exhaustion and altitude creates a potent cocktail of adrenaline and pride. It is a singular sensation of conquering the impossible, offering a temporary escape from the mundane routines of daily life. This internal 'high' creates a deep-seated desire to return.",
            "a": 4,
            "e": "Cảm giác 'adrenaline and pride', 'conquering the impossible' khi lên đỉnh → 'The unique feeling of achievement'."
          },
          {
            "text": "However, in our hyper-connected era, internal satisfaction is rarely enough; it is the publicity of achievement that now drives the masses. The solitude of the peaks is often broken by the need to document and broadcast the success on social media. The mountain becomes a backdrop for digital validation, where the value of the climb is measured in likes and shares rather than personal growth.",
            "a": 6,
            "e": "'broadcast the success on social media', 'measured in likes and shares' → khoe thành tích công khai: 'Publicity of achievement'."
          },
          {
            "text": "The obsession with public recognition inevitably establishes the wrong priority. Instead of prioritizing safety, skill acquisition, or the appreciation of nature's subtle beauty, many climbers become fixated solely on 'bagging the peak'. This 'summit fever' encourages rushing, dangerous shortcuts, and a lack of preparation. The journey itself is ignored in a frantic race to the top, reducing the majestic experience to a mere checklist item.",
            "a": 2,
            "e": "Người leo núi bỏ qua an toàn, chỉ chăm chăm 'bagging the peak' → ưu tiên sai: 'The wrong priority'."
          },
          {
            "text": "This distorted mindset leads to a disturbing consequence – a troubling reality where our ego directly impacts the environment. As more people flock to the mountains with the wrong priorities, we witness a direct correlation between human traffic and environmental degradation. Trails are eroded, campsites are littered with non-biodegradable waste, and delicate wildlife habitats are disturbed.",
            "a": 5,
            "e": "'a troubling reality where our ego directly impacts the environment': đường mòn xói mòn, rác thải → hệ quả đáng lo ngại: 'A disturbing consequence'."
          },
          {
            "text": "Facing this ecological crisis, the mountaineering community is being forced to shift its focus on sustainability. We are realizing that the mountains are finite resources that cannot withstand endless abuse. This creates a new imperative: implementing stricter limits on climber numbers, enforcing 'leave no trace' policies, and promoting ethical tourism. The goal is shifting from conquering the land to preserving it.",
            "a": 3,
            "e": "'shift its focus on sustainability', 'leave no trace', 'preserving it' → cộng đồng leo núi chuyển sang bảo tồn: 'Focus on sustainability'."
          },
          {
            "text": "Ultimately, this move toward preservation fosters a more intimate relationship with the mountain. When we stop viewing the peak as an enemy to defeat or a trophy to display, we begin to see it as a partner. This new relationship is built on humility, silence, and deep respect for the natural world. We learn to climb not just to stand on the mountain, but to be with the mountain.",
            "a": 0,
            "e": "Coi núi là 'a partner', quan hệ dựa trên 'humility, silence, and deep respect' → 'A more intimate relationship'."
          }
        ]
      }
    ]
  },
  {
    "id": "r6",
    "title": "Đề 6 — Women mathematicians",
    "parts": [
      {
        "type": "gap",
        "title": "Part 1 · Sentence comprehension",
        "instr": "Chọn từ đúng cho mỗi chỗ trống.",
        "text": "Hey Lewis,\nI want to travel to the {0} this summer.\nPlease keep your room {1}.\nWe have English {2} on Monday.\nI like helping {3} people.\nCan you spell these {4} for me?\nLove,\nHelen",
        "gaps": [
          {
            "o": [
              "country",
              "small",
              "big"
            ],
            "a": 0,
            "e": "'travel to the country' — đi du lịch về miền quê/đất nước; 'small/big' là tính từ, phải có danh từ theo sau."
          },
          {
            "o": [
              "green",
              "boring",
              "clean"
            ],
            "a": 2,
            "e": "'keep your room clean' — giữ phòng sạch sẽ; 'green/boring' không hợp nghĩa với yêu cầu giữ phòng."
          },
          {
            "o": [
              "class",
              "lunch",
              "sea"
            ],
            "a": 0,
            "e": "'English class on Monday' — tiết học tiếng Anh; 'English lunch/sea' không tự nhiên."
          },
          {
            "o": [
              "myself",
              "father",
              "other"
            ],
            "a": 2,
            "e": "'helping other people' — giúp đỡ người khác; 'other' đứng trước 'people'."
          },
          {
            "o": [
              "small",
              "bring",
              "words"
            ],
            "a": 2,
            "e": "'spell these words' — đánh vần các từ; 'these' cần danh từ số nhiều."
          }
        ]
      },
      {
        "type": "order",
        "title": "Part 2 · Text cohesion",
        "instr": "Sắp xếp các câu theo đúng thứ tự để tạo thành đoạn văn hoàn chỉnh. Câu đầu tiên đã cho sẵn.",
        "topic": "Company wellness day",
        "first": "This month, the wellness day took place on Friday, focusing on work-life balance.",
        "sentences": [
          "Activities included team yoga, time management seminars, and a group walk.",
          "More than 50 employees participated in these activities, with Mr. Allen leading a workshop on stress relief.",
          "Employees enjoyed healthy snacks and exchanged tips for managing stress.",
          "After the workshops, awards were given for the most creative wellness ideas."
        ],
        "tip": "Mẹo: câu mở đầu giới thiệu ngày hội → 'Activities included...' liệt kê hoạt động → 'participated in these activities' trỏ ngược về các hoạt động đó → 'Employees enjoyed...' nói về trải nghiệm của họ → 'After the workshops, awards...' là phần kết thúc."
      },
      {
        "type": "opinion",
        "title": "Part 3 · Opinion matching",
        "instr": "Đọc ý kiến của 4 người về hoạt động thời gian rảnh. Chọn người phù hợp cho mỗi câu hỏi (một người có thể được chọn nhiều lần).",
        "topic": "Free time activity",
        "people": [
          {
            "name": "",
            "text": "When I was a teenager, I loved recording short stories on an old tape recorder with my cousins. We spent hours coming up with ideas and acting them out just for fun. These days, we make podcasts using modern apps that make editing and publishing much easier and more enjoyable. Even though technology has simplified the process, we still spend a lot of time planning each episode carefully. For me, podcasting is a creative way to express ideas and connect with people on a deeper level."
          },
          {
            "name": "",
            "text": "As a child, I spent many sunny afternoons flying kites in the park with my brothers and sisters. Watching my kite rise high into the sky always filled me with happiness and excitement. Those simple yet meaningful moments taught me patience and coordination. Even now, whenever I see children flying kites, I feel warm memories returning. Those carefree days will always be some of my favorite childhood moments."
          },
          {
            "name": "",
            "text": "When I was little, I was fascinated by doing jigsaw puzzles with my family. Carefully fitting each piece into place was both fun and satisfying. Now that I'm older, I often play strategy-based video games, which feel like a modern version of puzzles. They're not only entertaining but also help me stay focused and think critically. For me, these games bring the same sense of challenge and accomplishment that puzzles once did – just in a more dynamic and interactive way."
          },
          {
            "name": "",
            "text": "I grew up near a beautiful lake, and swimming there with my friends was one of my favorite things to do. It was such a great way to spend time outdoors, though rainy days sometimes left me feeling bored at home. Nowadays, I practice yoga to relax and recharge after long working hours. It has helped me stay calm, balanced, and focused. Yoga has become an important part of my routine and a great way to take care of both my body and mind."
          }
        ],
        "questions": [
          {
            "q": "Who now enjoys video games?",
            "a": 2,
            "e": "C: 'Now that I'm older, I often play strategy-based video games' — hiện nay thường chơi game chiến thuật."
          },
          {
            "q": "Who enjoys podcasting with friends?",
            "a": 0,
            "e": "A: 'we make podcasts' cùng các anh chị em họ ('my cousins'), 'podcasting is a creative way to express ideas' — làm podcast cùng người thân/bạn bè."
          },
          {
            "q": "Who loved swimming as a child?",
            "a": 3,
            "e": "D: 'swimming there with my friends was one of my favorite things to do' — thích bơi ở hồ hồi nhỏ."
          },
          {
            "q": "Who loved puzzles as a child?",
            "a": 2,
            "e": "C: 'I was fascinated by doing jigsaw puzzles with my family' — mê xếp hình khi còn bé."
          },
          {
            "q": "Who now prefers yoga?",
            "a": 3,
            "e": "D: 'Nowadays, I practice yoga to relax and recharge' — hiện nay tập yoga để thư giãn."
          },
          {
            "q": "Who loved kite flying as a child?",
            "a": 1,
            "e": "B: 'I spent many sunny afternoons flying kites in the park' — thích thả diều hồi nhỏ."
          },
          {
            "q": "Who finds modern apps easier to use?",
            "a": 0,
            "e": "A: 'modern apps that make editing and publishing much easier' — ứng dụng hiện đại giúp chỉnh sửa và đăng tải dễ hơn nhiều."
          }
        ]
      },
      {
        "type": "heading",
        "title": "Part 4 · Long text comprehension",
        "instr": "Đọc bài viết và chọn tiêu đề phù hợp nhất cho mỗi đoạn.",
        "topic": "Women mathematicians",
        "headings": [
          "The power of labels",
          "Honoring pioneering women",
          "A long career with lasting impact",
          "Achievements overlooked because of gender bias",
          "The value of diversity",
          "Credit given to the wrong people",
          "The movement for gender balance"
        ],
        "paragraphs": [
          {
            "text": "Achievements often go unnoticed when gender biases come into play. Many groundbreaking contributions from women in science, technology, and other fields are overshadowed by societal expectations, leading to a lack of recognition for their hard work and dedication.",
            "a": 3,
            "e": "'go unnoticed when gender biases come into play', 'lack of recognition' → thành tựu bị bỏ qua do định kiến giới: 'Achievements overlooked because of gender bias'."
          },
          {
            "text": "Recognizing the accomplishments of pioneering women is essential for breaking stereotypes and inspiring future generations. Women like Marie Curie, Ada Lovelace, and Katherine Johnson changed the world with their brilliance, yet their achievements were often marginalized due to their gender.",
            "a": 1,
            "e": "'Recognizing the accomplishments of pioneering women' cùng ví dụ Marie Curie, Ada Lovelace → tôn vinh những phụ nữ tiên phong: 'Honoring pioneering women'."
          },
          {
            "text": "Men are unfairly given credit for work that was often a joint effort or even led by women. History has been shaped by this bias, where the achievements of women were either ignored or misattributed, despite their immense contributions to progress.",
            "a": 5,
            "e": "'Men are unfairly given credit for work', 'misattributed' → công lao bị gán nhầm cho người khác: 'Credit given to the wrong people'."
          },
          {
            "text": "A long career is a testament to one's exceptional abilities. Take the story of a female engineer who spent decades improving infrastructure in underdeveloped regions. Despite her groundbreaking work, she was often overlooked simply because of her gender, but her work left an indelible mark on society.",
            "a": 2,
            "e": "'A long career', 'spent decades', 'left an indelible mark on society' → sự nghiệp lâu dài để lại dấu ấn: 'A long career with lasting impact'."
          },
          {
            "text": "Labels can change perceptions dramatically. The label of 'genius' or 'pioneer' is often reserved for men, but when a woman is labeled in the same way, it challenges stereotypes and forces society to recognize her contributions. This shift in perception is key to breaking down barriers and opening doors for others.",
            "a": 0,
            "e": "'Labels can change perceptions dramatically', 'the label of genius or pioneer' → sức mạnh của danh xưng: 'The power of labels'."
          },
          {
            "text": "Striving to create gender balance in the workplace and society at large has become a movement. Companies and governments are starting to realize that diverse teams lead to better solutions, yet the struggle for equal representation continues. The push for gender balance is not just about fairness but also about enhancing productivity and creativity.",
            "a": 6,
            "e": "'Striving to create gender balance', 'has become a movement', 'The push for gender balance' → phong trào cân bằng giới: 'The movement for gender balance'."
          },
          {
            "text": "Uniformity can be a disadvantage in many settings. When everyone is expected to conform to the same mold, innovation and individuality suffer. The story of a diverse team at a tech startup shows how embracing different perspectives led to creative breakthroughs, proving that diversity is a powerful asset.",
            "a": 4,
            "e": "'diversity is a powerful asset', 'a diverse team... creative breakthroughs' → giá trị của sự đa dạng: 'The value of diversity'."
          }
        ]
      }
    ]
  },
  {
    "id": "r7",
    "title": "Đề 7 — Cultural exchange",
    "parts": [
      {
        "type": "gap",
        "title": "Part 1 · Sentence comprehension",
        "instr": "Chọn từ đúng cho mỗi chỗ trống.",
        "text": "Hey Lewis,\nI want to {0} my grandparents this weekend.\nMy {1} is very clean and bright.\nThe weather is {2} today.\nWe went to the city by {3}.\nI can {4} English very well.\nLove,\nHelen",
        "gaps": [
          {
            "o": [
              "visit",
              "clean",
              "run"
            ],
            "a": 0,
            "e": "'want to visit my grandparents' — muốn thăm ông bà; 'clean/run my grandparents' vô nghĩa."
          },
          {
            "o": [
              "room",
              "sing",
              "soon"
            ],
            "a": 0,
            "e": "'My room is very clean and bright' — phòng sạch và sáng; 'sing' là động từ, 'soon' là trạng từ nên không làm chủ ngữ được."
          },
          {
            "o": [
              "big",
              "hot",
              "small"
            ],
            "a": 1,
            "e": "'The weather is hot today' — thời tiết nóng; thời tiết không thể 'big' hay 'small'."
          },
          {
            "o": [
              "spaceship",
              "pencil",
              "train"
            ],
            "a": 2,
            "e": "'went to the city by train' — đi đến thành phố bằng tàu hỏa; 'spaceship' không thực tế, 'pencil' không phải phương tiện."
          },
          {
            "o": [
              "make",
              "speak",
              "love"
            ],
            "a": 1,
            "e": "'speak English very well' — nói tiếng Anh rất tốt; 'make/love English very well' không đúng nghĩa."
          }
        ]
      },
      {
        "type": "order",
        "title": "Part 2 · Text cohesion",
        "instr": "Sắp xếp các câu theo đúng thứ tự để tạo thành đoạn văn hoàn chỉnh. Câu đầu tiên đã cho sẵn.",
        "topic": "The history of transportation",
        "first": "In the past, long journeys were mainly possible for wealthy people.",
        "sentences": [
          "Later, railways spread across many countries and made travel faster.",
          "Eventually, buses and cheap train tickets made journeys affordable for ordinary families.",
          "These changes made travelling accessible to almost everyone.",
          "Today, buses and trains are among the most common transport options, and planes are popular for very long distances."
        ],
        "tip": "Mẹo: 'In the past' mở đầu → 'Later' (đường sắt phát triển) → 'Eventually' (xe buýt, vé tàu rẻ cho gia đình bình thường) → 'These changes' trỏ về hai câu trước → 'Today' kết thúc ở hiện tại."
      },
      {
        "type": "opinion",
        "title": "Part 3 · Opinion matching",
        "instr": "Đọc ý kiến của 4 người về ký ức tuổi thơ. Chọn người phù hợp cho mỗi câu hỏi (một người có thể được chọn nhiều lần).",
        "topic": "Childhood memories",
        "people": [
          {
            "name": "",
            "text": "When I was a child, I loved sitting by the fireplace listening to my grandfather's folktales. His voice brought every character to life, and those evenings always felt magical – they taught me the power of imagination. Nowadays, I share that same joy with my nieces by reading interactive storybooks on tablets. The animations and sounds make the stories more vivid and exciting for them. Still, I always take care to choose content that's suitable for their age. To me, blending old traditions with modern technology is a beautiful way to keep storytelling alive across generations."
          },
          {
            "name": "",
            "text": "When I was young, I used to ride my bike around the village with my friends almost every afternoon. I can still recall the feeling of the wind brushing against my face, the excitement of racing each other, and the pure sense of freedom it brought. Those simple rides weren't just fun – they taught me what independence and adventure felt like, lessons that stayed with me as I grew up. Nowadays, it's a bit sad to see that many children spend more time indoors, glued to screens instead of exploring outside. Sometimes I find myself missing those carefree afternoons when happiness was as simple as pedaling down a dusty road. Thinking back, I realize those moments helped me develop a love for the outdoors and a lasting appreciation for friendship."
          },
          {
            "name": "",
            "text": "As a kid, I could spend hours drawing animals, trees, and landscapes with my box of crayons and pencils. I loved playing with bright colors and shapes, and I always felt proud showing my drawings to my family. What started as a simple childhood hobby slowly turned into a lifelong passion. Now, I'm a graphic designer, creating digital art for various clients. Modern design tools help me bring my ideas to life with more precision, yet the creative joy I feel is just like it was back then. For me, drawing has always been a way to express myself – and it still fills my days with happiness."
          },
          {
            "name": "",
            "text": "When I was growing up, I loved going on camping trips with my family in the countryside. We pitched our tents, cooked simple meals over a fire, and spent long nights gazing at the stars. Those moments made me feel deeply connected to nature and left me with unforgettable memories. Sometimes, though, rainy weather would ruin our plans, and I always felt a bit sad when we had to stay indoors. These days, my adventures have taken a different form – I enjoy visiting museums and exhibitions instead. Exploring history through artifacts and stories gives me a similar sense of curiosity and wonder, just in a quieter, more comfortable setting. To me, museums are a gentle way to travel through time and appreciate the beauty of the past."
          }
        ],
        "questions": [
          {
            "q": "Who now enjoys graphic design?",
            "a": 2,
            "e": "C: 'Now, I'm a graphic designer, creating digital art for various clients' — hiện là nhà thiết kế đồ họa."
          },
          {
            "q": "Who loved camping as a child?",
            "a": 3,
            "e": "D: 'I loved going on camping trips with my family in the countryside' — thích đi cắm trại cùng gia đình."
          },
          {
            "q": "Who finds modern books more engaging?",
            "a": 0,
            "e": "A: 'interactive storybooks on tablets', 'make the stories more vivid and exciting' — sách tương tác hiện đại sinh động, hấp dẫn hơn."
          },
          {
            "q": "Who loved drawing as a child?",
            "a": 2,
            "e": "C: 'I could spend hours drawing animals, trees, and landscapes' — hồi nhỏ rất thích vẽ."
          },
          {
            "q": "Who now prefers museum visits?",
            "a": 3,
            "e": "D: 'These days, ... I enjoy visiting museums and exhibitions instead' — bây giờ thích đi bảo tàng."
          },
          {
            "q": "Who enjoys storytelling with family?",
            "a": 0,
            "e": "A: nghe chuyện cổ tích của ông ('my grandfather's folktales') và nay kể/đọc truyện cho các cháu: 'keep storytelling alive across generations'."
          },
          {
            "q": "Who loved bike riding as a child?",
            "a": 1,
            "e": "B: 'I used to ride my bike around the village with my friends almost every afternoon' — hay đạp xe quanh làng."
          }
        ]
      },
      {
        "type": "heading",
        "title": "Part 4 · Long text comprehension",
        "instr": "Đọc bài viết và chọn tiêu đề phù hợp nhất cho mỗi đoạn.",
        "topic": "Cultural Exchange",
        "headings": [
          "Building Mutual Respect Among Communities",
          "Focusing on Authentic Cultural Experiences",
          "Encouraging Cross-Cultural Festivals",
          "Redefining Global Cultural Understanding",
          "Promoting Language Exchange Programs",
          "Concerns About Cultural Preservation",
          "Overemphasis on Commercial Tourism"
        ],
        "paragraphs": [
          {
            "text": "In the modern interconnected world, understanding global cultures involves much more than simply learning about customs and traditions. It requires the development of cultural intelligence and awareness. Redefining cultural understanding means moving beyond surface-level knowledge and gaining a deeper appreciation of shared human experiences while still respecting the unique identities of different cultures.",
            "a": 3,
            "e": "'Redefining cultural understanding means moving beyond surface-level knowledge' → định nghĩa lại cách hiểu về văn hóa toàn cầu: 'Redefining Global Cultural Understanding'."
          },
          {
            "text": "Festivals that celebrate multiple cultures play an important role in promoting unity and inclusiveness among diverse communities. Such events create opportunities for different groups to present and celebrate their art, music, food, and cultural heritage while encouraging people to appreciate cultural diversity.",
            "a": 2,
            "e": "'Festivals that celebrate multiple cultures' → lễ hội đa văn hóa: 'Encouraging Cross-Cultural Festivals'."
          },
          {
            "text": "Language exchange programs are among the most effective ways to encourage intercultural communication. By participating in these programs, individuals can better understand cultural subtleties such as humor, idiomatic expressions, and nonverbal communication.",
            "a": 4,
            "e": "'Language exchange programs are among the most effective ways' → chương trình trao đổi ngôn ngữ: 'Promoting Language Exchange Programs'."
          },
          {
            "text": "Although tourism can contribute significantly to economic development, excessive commercialization may weaken genuine cultural exchange. Many well-known destinations face the risk of being turned into commercialized attractions rather than places that reflect authentic cultural values.",
            "a": 6,
            "e": "'excessive commercialization may weaken genuine cultural exchange' → thương mại hóa du lịch quá mức: 'Overemphasis on Commercial Tourism'."
          },
          {
            "text": "The rapid pace of globalization and urban development has increased concerns about the disappearance of intangible cultural heritage. Many traditional elements such as languages, rituals, folk customs, and handicrafts are gradually fading away.",
            "a": 5,
            "e": "'concerns about the disappearance of intangible cultural heritage', 'gradually fading away' → lo ngại về việc bảo tồn văn hóa: 'Concerns About Cultural Preservation'."
          },
          {
            "text": "Successful cultural exchange depends strongly on mutual respect and empathy between communities. Instead of merely tolerating differences, people should aim to develop sincere understanding and appreciation of other cultures.",
            "a": 0,
            "e": "'depends strongly on mutual respect and empathy between communities' → xây dựng sự tôn trọng lẫn nhau: 'Building Mutual Respect Among Communities'."
          },
          {
            "text": "Interest in authentic cultural experiences is steadily increasing. Many travelers now prefer opportunities to interact with local communities, learn traditional skills, and take part in everyday cultural activities.",
            "a": 1,
            "e": "'Interest in authentic cultural experiences is steadily increasing' → tập trung vào trải nghiệm văn hóa chân thực: 'Focusing on Authentic Cultural Experiences'."
          }
        ]
      }
    ]
  },
  {
    "id": "r8",
    "title": "Đề 8 — Work and life balance",
    "parts": [
      {
        "type": "gap",
        "title": "Part 1 · Sentence comprehension",
        "instr": "Chọn từ đúng cho mỗi chỗ trống.",
        "text": "Hey Lewis,\nI go to school by {0}.\nThe buildings in my city are very {1}.\nThere are many green {2} near my home.\nI eat {3} with my family every morning.\nI play {4} to feel relaxed.\nLove,\nHelen",
        "gaps": [
          {
            "o": [
              "spaceship",
              "plane",
              "bicycle"
            ],
            "a": 2,
            "e": "'go to school by bicycle' — đi học bằng xe đạp; không ai đi học bằng tàu vũ trụ hay máy bay."
          },
          {
            "o": [
              "hate",
              "tall",
              "went"
            ],
            "a": 1,
            "e": "'buildings ... very tall' — tòa nhà rất cao; 'hate' và 'went' không phải tính từ phù hợp."
          },
          {
            "o": [
              "road",
              "buy",
              "trees"
            ],
            "a": 2,
            "e": "'green trees' — cây xanh; 'road' (đường) và 'buy' (mua) không đi với 'green ... near my home'."
          },
          {
            "o": [
              "breakfast",
              "lunch",
              "dinner"
            ],
            "a": 0,
            "e": "'every morning' → bữa sáng (breakfast)."
          },
          {
            "o": [
              "games",
              "make",
              "time"
            ],
            "a": 0,
            "e": "'play games to feel relaxed' — chơi trò chơi để thư giãn; 'play make/time' sai nghĩa."
          }
        ]
      },
      {
        "type": "order",
        "title": "Part 2 · Text cohesion",
        "instr": "Sắp xếp các câu theo đúng thứ tự để tạo thành đoạn văn hoàn chỉnh. Câu đầu tiên đã cho sẵn.",
        "topic": "Movies then and now",
        "first": "Movies today are very different from movies in the past.",
        "sentences": [
          "In the old days, films were only in black and white, and sometimes even without sound.",
          "In addition to these technological limits, producers had very low budgets.",
          "Because of the lack of money, actors also earn little money from acting.",
          "Nowadays, everything has changed: actors and producers can earn a lot of money from producing films."
        ],
        "tip": "Mẹo: câu mở đầu nêu phim nay khác phim xưa → 'In the old days' kể phim xưa → 'In addition to these technological limits' bổ sung thêm ý (ngân sách thấp) → 'Because of the lack of money' là hệ quả → 'Nowadays, everything has changed' đối lập với quá khứ, làm câu kết."
      },
      {
        "type": "opinion",
        "title": "Part 3 · Opinion matching",
        "instr": "Đọc ý kiến của 4 người về cân bằng công việc và cuộc sống. Chọn người phù hợp cho mỗi câu hỏi (một người có thể được chọn nhiều lần).",
        "topic": "Work and life balance",
        "people": [
          {
            "name": "",
            "text": "As a child, I loved playing board games with my parents after their long workdays. Now, I play with my own kids, and my four-day workweek gives us more time. Flexible schedules help, but I plan carefully to balance work and family. These moments create lasting memories."
          },
          {
            "name": "",
            "text": "As a kid, I read books about different jobs, dreaming of my future career. They sparked my ambition. Now, I use productivity apps to manage my tasks in a four-day workweek. The apps streamline my work, but the excitement of planning feels familiar."
          },
          {
            "name": "",
            "text": "Growing up, I spent evenings playing tag in the neighborhood with friends. Rainy days kept me indoors, feeling bored. Now, I practice mindfulness to unwind after work. It helps me stay focused and refreshed, especially with a shorter workweek."
          },
          {
            "name": "",
            "text": "When I was young, I set up pretend offices with my friends, using toy phones and notebooks. I enjoyed being the \"boss\" and planning tasks. Those games taught me organization and leadership, and I still smile thinking about our serious meetings."
          }
        ],
        "questions": [
          {
            "q": "Who now enjoys productivity apps?",
            "a": 1,
            "e": "B: 'I use productivity apps to manage my tasks' — dùng ứng dụng năng suất để quản lý công việc."
          },
          {
            "q": "Who loved outdoor play as a child?",
            "a": 2,
            "e": "C: 'playing tag in the neighborhood with friends' — chơi đuổi bắt ngoài trời."
          },
          {
            "q": "Who enjoys family time with board games?",
            "a": 0,
            "e": "A: 'I play with my own kids' (board games) — chơi board game với con."
          },
          {
            "q": "Who loved organizing pretend offices as a child?",
            "a": 3,
            "e": "D: 'I set up pretend offices with my friends' — dựng văn phòng giả."
          },
          {
            "q": "Who finds modern schedules more flexible?",
            "a": 0,
            "e": "A: 'Flexible schedules help' — lịch linh hoạt giúp ích; chỉ A nhắc đến sự linh hoạt."
          },
          {
            "q": "Who loved reading about careers as a child?",
            "a": 1,
            "e": "B: 'I read books about different jobs, dreaming of my future career' — đọc sách về nghề nghiệp."
          },
          {
            "q": "Who now prefers mindfulness practices?",
            "a": 2,
            "e": "C: 'Now, I practice mindfulness to unwind after work' — thực hành chánh niệm để thư giãn."
          }
        ]
      },
      {
        "type": "heading",
        "title": "Part 4 · Long text comprehension",
        "instr": "Đọc bài viết và chọn tiêu đề phù hợp nhất cho mỗi đoạn.",
        "topic": "Technology advances",
        "headings": [
          "Overreliance on Digital Interfaces",
          "Promoting Technology-Based Education Programs",
          "Building Innovative Tech Communities",
          "Focusing on Sustainable Digital Solutions",
          "Boosting Productivity Through Intelligent Automation",
          "Concerns About Disparities in Access to Technology",
          "Redefining Human-Technology Interaction"
        ],
        "paragraphs": [
          {
            "text": "The way people use technology is changing quickly. Today, new devices and apps are easier to use. People can talk to machines, use hand gestures, or even use their face to control them. This helps make technology feel more natural and simple. It also improves how we use technology in our daily life and at work.",
            "a": 6,
            "e": "Nói về cách con người tương tác với máy (giọng nói, cử chỉ, khuôn mặt) → 'Redefining Human-Technology Interaction'."
          },
          {
            "text": "Smart machines and software are now doing boring and repeated tasks in many workplaces. These tools, often powered by artificial intelligence (AI), save time and help workers focus on more important and creative jobs. As a result, companies work better and grow faster in many fields.",
            "a": 4,
            "e": "'doing boring and repeated tasks', 'save time' → tự động hóa tăng năng suất: 'Boosting Productivity Through Intelligent Automation'."
          },
          {
            "text": "More and more schools are using technology in their lessons. They teach students skills like computer coding, robotics, and how to use digital tools. These programs help students prepare for future jobs, and also build creativity and problem-solving skills, which are important in the digital world.",
            "a": 1,
            "e": "Trường học dùng công nghệ trong bài giảng ('schools are using technology in their lessons') → 'Promoting Technology-Based Education Programs'."
          },
          {
            "text": "Using digital devices too much can cause problems. Spending too much time in front of screens can make people feel lonely, stressed, or tired. It can also make it harder to focus or talk with others. That's why it's important to have a good balance between screen time and offline activities like exercise, talking with friends, or enjoying nature.",
            "a": 0,
            "e": "'Using digital devices too much can cause problems' → phụ thuộc quá mức: 'Overreliance on Digital Interfaces'."
          },
          {
            "text": "Not everyone has the same access to technology. Some people don't have fast internet or modern devices, so they miss chances to learn or find jobs. This creates unfair gaps in society. To fix this, we need good plans and community programs to give more people access to the tools they need.",
            "a": 5,
            "e": "Không phải ai cũng được tiếp cận công nghệ như nhau ('Not everyone has the same access', 'unfair gaps') → 'Concerns About Disparities in Access to Technology'."
          },
          {
            "text": "Technology communities are groups of people who love working with tech. They share ideas, help each other, and work together on new projects. These communities support learning and help turn smart ideas into real products or services that can help others.",
            "a": 2,
            "e": "'Technology communities are groups of people' chia sẻ ý tưởng, cùng làm dự án → 'Building Innovative Tech Communities'."
          },
          {
            "text": "As technology grows, people are also thinking about the environment. Many companies are now creating eco-friendly products and using green practices to reduce harm to nature. These actions help protect the Earth and make sure that digital progress is good for our planet in the long term.",
            "a": 3,
            "e": "Sản phẩm thân thiện môi trường, bảo vệ Trái Đất ('eco-friendly products', 'protect the Earth') → 'Focusing on Sustainable Digital Solutions'."
          }
        ]
      }
    ]
  },
  {
    "id": "r9",
    "title": "Đề 9 — Technology & science",
    "parts": [
      {
        "type": "gap",
        "title": "Part 1 · Sentence comprehension",
        "instr": "Chọn từ đúng cho mỗi chỗ trống.",
        "text": "Hey Lewis,\nIs your neighborhood {0}?\nHow do you usually {1} to work?\nWhen did you meet your friend {2}?\nCan you {3} French?\nDo you like going out {4} with your friends?\nLove,\nHelen",
        "gaps": [
          {
            "o": [
              "friendly",
              "hate",
              "quickly"
            ],
            "a": 0,
            "e": "'Is your neighborhood friendly?' — sau 'is' cần tính từ; 'friendly' (thân thiện) hợp nghĩa, 'hate' là động từ, 'quickly' là trạng từ."
          },
          {
            "o": [
              "sleep",
              "walk",
              "buy"
            ],
            "a": 1,
            "e": "'walk to work' — đi bộ đi làm; 'sleep/buy to work' không có nghĩa."
          },
          {
            "o": [
              "first",
              "love",
              "bring"
            ],
            "a": 0,
            "e": "Gặp bạn lần đầu: 'meet your friend first' (first = lần đầu tiên). 'love' và 'bring' không ghép được với 'meet your friend'."
          },
          {
            "o": [
              "speak",
              "big",
              "most"
            ],
            "a": 0,
            "e": "'speak French' — nói tiếng Pháp; sau 'Can you' cần động từ nguyên mẫu."
          },
          {
            "o": [
              "alone",
              "together",
              "morning"
            ],
            "a": 1,
            "e": "'going out together with your friends' — đi chơi cùng bạn bè; 'alone' (một mình) mâu thuẫn với 'with your friends'."
          }
        ]
      },
      {
        "type": "order",
        "title": "Part 2 · Text cohesion",
        "instr": "Sắp xếp các câu theo đúng thứ tự để tạo thành đoạn văn hoàn chỉnh. Câu đầu tiên đã cho sẵn.",
        "topic": "Writing about a place",
        "first": "Before writing about a place, you need to do some research on it.",
        "sentences": [
          "It is important to learn about the people and the history there carefully.",
          "You should also compare that place with your own country.",
          "Such comparisons will make your writing more interesting and meaningful.",
          "In the end, even if you can not visit the place, your writing will still look similar to real experiences."
        ],
        "tip": "Mẹo: câu đầu nêu việc cần nghiên cứu → câu tiếp nói cụ thể cần tìm hiểu gì ('the people and the history') → 'You should also compare' thêm lời khuyên thứ hai → 'Such comparisons' trỏ ngược về việc so sánh nên đứng ngay sau → 'In the end, even if…' là lời kết về lợi ích chung."
      },
      {
        "type": "opinion",
        "title": "Part 3 · Opinion matching",
        "instr": "Đọc ý kiến của 4 người về công nghệ thời thơ ấu. Chọn người phù hợp cho mỗi câu hỏi (một người có thể được chọn nhiều lần).",
        "topic": "Technology in childhood",
        "people": [
          {
            "name": "",
            "text": "When I was a child, I enjoyed building simple circuits with my parents using basic kits. Today, I collaborate on tech projects with my cousins using drag-and-drop coding platforms. These tools make the development process easier, but I always take the time to thoroughly test our creations. It's a wonderful way to foster creativity and work together."
          },
          {
            "name": "",
            "text": "As a kid, I played with programmable toys like robotic pets alongside my friends. I can still recall the excitement of programming their movements. Those toys sparked my interest in logic and curiosity, and I continue to cherish those early experiences with technology."
          },
          {
            "name": "",
            "text": "Growing up, I was fascinated by books about inventors and their innovative creations. Those stories inspired my imagination. Today, I design prototypes using 3D modeling software. The tools are much more precise now, but the joy of creating something new still feels just like the excitement of those childhood books."
          },
          {
            "name": "",
            "text": "I spent many hours as a child exploring my family's old computer, learning basic commands. Rainy days often meant staying indoors and experimenting with different software. Today, I keep up with the latest innovations by listening to tech podcasts. They're not only entertaining but also help me stay connected to the ever-evolving tech world."
          }
        ],
        "questions": [
          {
            "q": "Who now enjoys 3D modeling?",
            "a": 2,
            "e": "C: 'Today, I design prototypes using 3D modeling software' → hiện nay thích làm mô hình 3D."
          },
          {
            "q": "Who finds modern platforms user-friendly?",
            "a": 0,
            "e": "A: 'drag-and-drop coding platforms. These tools make the development process easier' → nền tảng hiện đại dễ dùng."
          },
          {
            "q": "Who loved playing with programmable toys as a child?",
            "a": 1,
            "e": "B: 'I played with programmable toys like robotic pets' → hồi nhỏ thích đồ chơi lập trình được."
          },
          {
            "q": "Who loved exploring early computers as a child?",
            "a": 3,
            "e": "D: 'exploring my family's old computer, learning basic commands' → hồi nhỏ khám phá máy tính đời đầu."
          },
          {
            "q": "Who enjoys creating tech projects with family?",
            "a": 0,
            "e": "A: 'I collaborate on tech projects with my cousins' → làm dự án công nghệ cùng người thân (anh chị em họ)."
          },
          {
            "q": "Who loved reading about inventions as a child?",
            "a": 2,
            "e": "C: 'I was fascinated by books about inventors and their innovative creations' → hồi nhỏ mê sách về phát minh."
          },
          {
            "q": "Who now prefers tech podcasts?",
            "a": 3,
            "e": "D: 'Today, I keep up with the latest innovations by listening to tech podcasts' → hiện nay nghe podcast công nghệ."
          }
        ]
      },
      {
        "type": "heading",
        "title": "Part 4 · Long text comprehension",
        "instr": "Đọc bài viết và chọn tiêu đề phù hợp nhất cho mỗi đoạn.",
        "topic": "Milestones in science and mathematics",
        "headings": [
          "Trailblazing Computer Science",
          "Driving Space Exploration Forward",
          "Transforming Geometry and Motion",
          "Breaking Through Educational Barriers",
          "Encouraging Diversity in STEM",
          "Connecting Symmetry to Physics",
          "Breaking New Ground in Ancient Mathematics"
        ],
        "paragraphs": [
          {
            "text": "Long before modern scientific institutions emerged, certain individuals in ancient history established the foundations of mathematics as we know it. One such pioneer was Hypatia of Alexandria, a famous philosopher and mathematician in the 4th century.",
            "a": 6,
            "e": "Đoạn nói 'in ancient history established the foundations of mathematics' (Hypatia, thế kỷ 4) → khai phá toán học thời cổ đại."
          },
          {
            "text": "The early 20th century saw remarkable advancements in computing, largely propelled by the innovative work of figures like Alan Turing. Turing's concept of a universal machine, capable of performing any computable task, laid the foundation for modern computers.",
            "a": 0,
            "e": "Đoạn nói 'advancements in computing… Alan Turing… laid the foundation for modern computers' → tiên phong ngành khoa học máy tính."
          },
          {
            "text": "Humanity's quest to explore the cosmos has been defined by groundbreaking milestones. From the launch of Sputnik 1 to the Apollo moon landings, each mission has broadened our understanding of space and our place in the universe.",
            "a": 1,
            "e": "Đoạn nói 'quest to explore the cosmos… Sputnik 1… Apollo moon landings' → thúc đẩy khám phá vũ trụ."
          },
          {
            "text": "The study of geometry and motion was irrevocably altered by the works of Isaac Newton and later Albert Einstein. Newton's laws provided the mathematical foundation for understanding motion on Earth and in space, while Einstein's theory of general relativity revolutionized our understanding of gravity.",
            "a": 2,
            "e": "Đoạn nói 'The study of geometry and motion was irrevocably altered' (Newton, Einstein) → thay đổi hình học và chuyển động."
          },
          {
            "text": "One of the most profound ideas in modern physics is the link between symmetry and the laws of nature. Emmy Noether, a brilliant German mathematician, proved a theorem that demonstrated how physical laws are intrinsically linked to symmetrical properties.",
            "a": 5,
            "e": "Đoạn nói 'the link between symmetry and the laws of nature' (định lý của Noether) → nối tính đối xứng với vật lý."
          },
          {
            "text": "Despite advancements in science and technology, many groups remain underrepresented in STEM fields. In recent decades, educators and organizations have worked to foster more inclusive environments, offering scholarships, mentorship, and outreach programs.",
            "a": 4,
            "e": "Đoạn nói 'many groups remain underrepresented in STEM… foster more inclusive environments' → khuyến khích sự đa dạng trong STEM."
          },
          {
            "text": "In many parts of the world, individuals have had to fight for the right to education, particularly in scientific disciplines. A well-known example is the story of 19th-century women who were denied entry to universities.",
            "a": 3,
            "e": "Đoạn nói 'fight for the right to education… women who were denied entry to universities' → vượt qua rào cản giáo dục."
          }
        ]
      }
    ]
  },
  {
    "id": "r10",
    "title": "Đề 10 — Technology in childhood",
    "parts": [
      {
        "type": "gap",
        "title": "Part 1 · Sentence comprehension",
        "instr": "Chọn từ đúng cho mỗi chỗ trống.",
        "text": "Hey Lewis,\nMy brother {0} to a gym near our house.\nWe usually {1} a long walk after dinner.\nHe feels very {2} after exercise.\nI want to {3} more fruit and vegetables.\nPlease call me {4} you are free.\nLove,\nHelen",
        "gaps": [
          {
            "o": [
              "goes",
              "go",
              "going"
            ],
            "a": 0,
            "e": "Chủ ngữ 'My brother' (ngôi thứ ba số ít), thì hiện tại đơn → 'goes'."
          },
          {
            "o": [
              "take",
              "make",
              "break"
            ],
            "a": 0,
            "e": "'take a long walk' — đi dạo một quãng dài; 'make/break a walk' không đúng cách dùng."
          },
          {
            "o": [
              "healthy",
              "health",
              "healthily"
            ],
            "a": 0,
            "e": "Sau 'feels very' cần tính từ → 'healthy' (khỏe mạnh); 'health' là danh từ, 'healthily' là trạng từ."
          },
          {
            "o": [
              "eat",
              "drink",
              "wear"
            ],
            "a": 0,
            "e": "'eat more fruit and vegetables' — ăn thêm trái cây và rau; không thể 'drink' hay 'wear' chúng."
          },
          {
            "o": [
              "when",
              "because",
              "so"
            ],
            "a": 0,
            "e": "'call me when you are free' — gọi cho mình khi bạn rảnh; 'because/so' không hợp nghĩa ở vị trí này."
          }
        ]
      },
      {
        "type": "order",
        "title": "Part 2 · Text cohesion",
        "instr": "Sắp xếp các câu theo đúng thứ tự để tạo thành đoạn văn hoàn chỉnh. Câu đầu tiên đã cho sẵn.",
        "topic": "Workplace evolution",
        "first": "In the past, most workers followed fixed schedules from nine to five.",
        "sentences": [
          "Because technology was limited, working from home was almost impossible.",
          "Modern offices are now moving toward more flexible ways of working.",
          "For example, many companies today are trying shorter workweeks to increase efficiency.",
          "In addition, managers now use digital tools to follow project progress remotely."
        ],
        "tip": "Mẹo: 'In the past' mở đầu bằng quá khứ → 'Because technology was limited' giải thích lý do thời đó khó làm việc tại nhà → 'Modern offices are now…' chuyển sang hiện tại → 'For example' đưa ví dụ cho sự linh hoạt đó → 'In addition' bổ sung thêm một thay đổi nữa."
      },
      {
        "type": "opinion",
        "title": "Part 3 · Opinion matching",
        "instr": "Đọc ý kiến của 4 người về công nghệ thời thơ ấu. Chọn người phù hợp cho mỗi câu hỏi (một người có thể được chọn nhiều lần).",
        "topic": "Technology in childhood",
        "people": [
          {
            "name": "",
            "text": "When I was young, I enjoyed playing simple computer games that my dad had programmed for me. Today, I teach my children to code using easy-to-use platforms like Scratch. These tools make learning programming enjoyable, though I spend time helping them grasp the logic behind it. Working together on coding fosters both creativity and teamwork."
          },
          {
            "name": "",
            "text": "As a child, I loved spending time with my friends, building and controlling toy robots. I'll never forget the thrill of making them move. Those experiences sparked my passion for technology, and I still look back fondly on those moments of discovery."
          },
          {
            "name": "",
            "text": "When I was younger, I was fascinated by science magazines about robots and computers. The articles fueled my curiosity. Now, I develop mobile apps, creating tools for daily life. Thanks to modern software, the development process has become faster, but the excitement of innovation remains the same."
          },
          {
            "name": "",
            "text": "As a kid, I spent rainy days with my siblings watching TV shows about gadgets and inventions. We eagerly awaited each new episode. Today, I prefer taking online courses to stay up-to-date with AI and blockchain. They offer flexibility and are a great way to keep pace with the rapidly changing tech world."
          }
        ],
        "questions": [
          {
            "q": "Who finds modern tools more accessible?",
            "a": 0,
            "e": "A: 'easy-to-use platforms like Scratch' — công cụ dễ dùng, dễ tiếp cận; C chỉ nói phát triển 'faster', D chỉ nói 'flexibility'."
          },
          {
            "q": "Who now enjoys app development?",
            "a": 2,
            "e": "C: 'Now, I develop mobile apps' — hiện giờ phát triển ứng dụng di động."
          },
          {
            "q": "Who loved playing with toy robots as a child?",
            "a": 1,
            "e": "B: 'building and controlling toy robots' — xây và điều khiển robot đồ chơi."
          },
          {
            "q": "Who loved watching tech shows as a child?",
            "a": 3,
            "e": "D: 'watching TV shows about gadgets and inventions' — xem chương trình TV về thiết bị và phát minh."
          },
          {
            "q": "Who now prefers online learning?",
            "a": 3,
            "e": "D: 'I prefer taking online courses' — hiện giờ thích học trực tuyến."
          },
          {
            "q": "Who enjoys coding with family?",
            "a": 0,
            "e": "A: 'Working together on coding fosters both creativity and teamwork' — cùng con học lập trình."
          },
          {
            "q": "Who loved science magazines as a child?",
            "a": 2,
            "e": "C: 'fascinated by science magazines about robots and computers' — mê tạp chí khoa học."
          }
        ]
      },
      {
        "type": "heading",
        "title": "Part 4 · Long text comprehension",
        "instr": "Đọc bài viết và chọn tiêu đề phù hợp nhất cho mỗi đoạn.",
        "topic": "Wellness trend",
        "headings": [
          "Promoting mental health awareness",
          "Encouraging community fitness programs",
          "Overemphasis on trendy diets",
          "Concerns about wellness misinformation",
          "Building supportive health communities",
          "Focusing on sustainable lifestyle changes",
          "Redefining holistic health approaches"
        ],
        "paragraphs": [
          {
            "text": "In recent years, the definition of health has broadened to encompass more than just physical well-being. Holistic approaches emphasize the interconnection of the body, mind, and environment, encouraging individuals to consider emotional balance, mental clarity, nutrition, and lifestyle habits collectively. This more comprehensive view helps people achieve deeper and more sustainable wellness by addressing various aspects of life rather than isolated symptoms.",
            "a": 6,
            "e": "'the definition of health has broadened', 'Holistic approaches' → định nghĩa lại sức khỏe theo hướng toàn diện: 'Redefining holistic health approaches'."
          },
          {
            "text": "Mental health has become a growing priority in public health discussions. Awareness campaigns aim to reduce the stigma surrounding mental health disorders and encourage open conversations about personal struggles. Educating people on recognizing early signs of anxiety, depression, and stress empowers them to seek help sooner. Many organizations also provide support networks and resources to build a more compassionate and understanding society.",
            "a": 0,
            "e": "'Mental health', 'Awareness campaigns' → nâng cao nhận thức về sức khỏe tinh thần: 'Promoting mental health awareness'."
          },
          {
            "text": "Community-based fitness initiatives are becoming more popular as a way to make exercise enjoyable and accessible. By participating in group activities such as yoga, walking clubs, or sports leagues, individuals not only improve their physical health but also form meaningful social connections. These programs foster a sense of belonging and help individuals stay committed to their fitness goals over time, contributing to healthier and happier communities.",
            "a": 1,
            "e": "'Community-based fitness initiatives', yoga, câu lạc bộ đi bộ → 'Encouraging community fitness programs'."
          },
          {
            "text": "Although trendy diets often promise quick weight loss or improved health, relying too heavily on these fads can be problematic. Many popular diets lack scientific support and may eliminate essential nutrients, leading to unbalanced nutrition. Nutrition experts emphasize that sustainable eating should focus on balanced meals, moderation, and individual needs rather than quick fixes. Building a healthy relationship with food is more beneficial than chasing the latest diet trend.",
            "a": 2,
            "e": "'trendy diets', 'relying too heavily on these fads can be problematic' → phê phán việc quá chú trọng chế độ ăn thịnh hành: 'Overemphasis on trendy diets'."
          },
          {
            "text": "The rise of social media and online platforms has led to widespread sharing of health information, but not all of it is accurate or safe. Misinformation about supplements, treatments, and health practices can cause confusion or even harm. It's crucial for individuals to critically assess sources, consult healthcare professionals, and rely on evidence-based guidance when making decisions about their wellness routines.",
            "a": 3,
            "e": "'not all of it is accurate or safe', 'Misinformation' → lo ngại thông tin sai lệch: 'Concerns about wellness misinformation'."
          },
          {
            "text": "Supportive wellness-focused communities play an essential role in helping people maintain healthy lifestyles. Whether online or through local meetups, these groups offer encouragement, share tips, and provide accountability. Members can exchange experiences, celebrate successes, and find motivation during challenges, creating an environment where individuals feel empowered to achieve their health goals.",
            "a": 4,
            "e": "'Supportive wellness-focused communities' → nhóm hỗ trợ lẫn nhau về sức khỏe: 'Building supportive health communities'."
          },
          {
            "text": "Achieving long-term health requires more than temporary diets or exercise bursts. Sustainable wellness involves making gradual changes that can be maintained over time, such as improving sleep habits, managing stress, and incorporating regular physical activity. By setting realistic goals and making incremental adjustments, individuals are more likely to experience lasting benefits and enhance their overall quality of life.",
            "a": 5,
            "e": "'Sustainable wellness involves making gradual changes' → thay đổi lối sống bền vững: 'Focusing on sustainable lifestyle changes'."
          }
        ]
      }
    ]
  },
  {
    "id": "r11",
    "title": "Đề 11 — Music festival",
    "parts": [
      {
        "type": "gap",
        "title": "Part 1 · Sentence comprehension",
        "instr": "Chọn từ đúng cho mỗi chỗ trống.",
        "text": "Hey Lewis,\nWhere is your {0}?\nDo you talk to {1} at work?\nIs the task {2} for you?\nWhat do you {3} in the morning?\nWhat do you like to {4} on TV?\nLove,\nHelen",
        "gaps": [
          {
            "o": [
              "home",
              "sea",
              "park"
            ],
            "a": 0,
            "e": "'Where is your home?' — nhà bạn ở đâu; 'your sea/park' không tự nhiên."
          },
          {
            "o": [
              "customers",
              "bird",
              "chair"
            ],
            "a": 0,
            "e": "'talk to customers at work' — nói chuyện với khách hàng ở chỗ làm; 'bird/chair' là danh từ số ít thiếu mạo từ và không hợp nghĩa."
          },
          {
            "o": [
              "easy",
              "go",
              "bring"
            ],
            "a": 0,
            "e": "'Is the task easy for you?' — cần tính từ sau 'is' → 'easy'."
          },
          {
            "o": [
              "prepare",
              "big",
              "team"
            ],
            "a": 0,
            "e": "Sau 'do you' cần động từ: 'prepare in the morning' — chuẩn bị vào buổi sáng; 'big' là tính từ, 'team' là danh từ."
          },
          {
            "o": [
              "watch",
              "read",
              "take"
            ],
            "a": 0,
            "e": "'watch ... on TV' — xem trên TV; 'read/take on TV' không hợp nghĩa."
          }
        ]
      },
      {
        "type": "order",
        "title": "Part 2 · Text cohesion",
        "instr": "Sắp xếp các câu theo đúng thứ tự để tạo thành đoạn văn hoàn chỉnh. Câu đầu tiên đã cho sẵn.",
        "topic": "The famous singer",
        "first": "He is a famous singer who is loved by many fans.",
        "sentences": [
          "At the age of fifteen, he studied music at a special school.",
          "Before becoming famous, he had to practice very hard every day.",
          "With his unique style and clothes, he soon attracted attention.",
          "Thanks to his talent and personality, he became well-known to a large audience."
        ],
        "tip": "Mẹo: câu giới thiệu nêu ca sĩ nổi tiếng → kể quá khứ theo thời gian: 'At the age of fifteen' (học nhạc) → 'Before becoming famous' (luyện tập chăm chỉ) → 'soon attracted attention' (dần được chú ý) → 'Thanks to his talent' (nhờ tài năng mà nổi tiếng) là kết quả cuối cùng."
      },
      {
        "type": "opinion",
        "title": "Part 3 · Opinion matching",
        "instr": "Đọc ý kiến của 4 người về một lễ hội âm nhạc. Chọn người phù hợp cho mỗi câu hỏi (một người có thể được chọn nhiều lần).",
        "topic": "Music festival",
        "people": [
          {
            "name": "",
            "text": "I stayed until the very last moment of the festival and absolutely loved the grand finale. The stage lit up with dazzling lights and fireworks, creating an unforgettable atmosphere. Although getting there was a hassle due to heavy traffic and packed buses, once I arrived, all those inconveniences faded away. In the end, the final performance made every bit of the struggle worthwhile."
          },
          {
            "name": "",
            "text": "Normally, I steer clear of festivals, but I decided to give this one a try. Unfortunately, I didn't have a great time. The sound quality was poor, the event schedule seemed chaotic, and to top it off, it started raining heavily. The muddy ground made things even worse, and I spent most of the day feeling uncomfortable. Honestly, I didn't think it was worth the trouble. The only highlight for me was the friendly staff at the entrance."
          },
          {
            "name": "",
            "text": "I really enjoyed the lively atmosphere created by the music. One of the bands on the opening night was so amazing that I couldn't help but sing along. However, everything was quite expensive. The tickets were pricey, and the food and drinks were ridiculously overcharged. I ended up spending more than I had planned. Even though the performances were great, I do hope the organizers will bring the prices down next year."
          },
          {
            "name": "",
            "text": "For me, the most memorable part of the festival was its location. The park by the river was vast and picturesque, with plenty of spots to sit and unwind between performances. I enjoyed a nice lunch there, though it was a bit pricey. Some of the shows were enjoyable, but I didn't stay for the entire event. Overall, it was the venue that left the biggest impression on me."
          }
        ],
        "questions": [
          {
            "q": "Who experienced bad weather?",
            "a": 1,
            "e": "B: 'it started raining heavily' — trời mưa to, đất lầy lội."
          },
          {
            "q": "Who loved one of the performances on the opening night?",
            "a": 2,
            "e": "C: 'One of the bands on the opening night was so amazing that I couldn't help but sing along' — mê một ban nhạc đêm khai mạc."
          },
          {
            "q": "Who thought it was too expensive?",
            "a": 2,
            "e": "C: 'everything was quite expensive', 'ridiculously overcharged', 'bring the prices down' — cho rằng quá đắt; D chỉ nhắc bữa trưa 'a bit pricey'."
          },
          {
            "q": "Who found the traffic difficult?",
            "a": 0,
            "e": "A: 'getting there was a hassle due to heavy traffic and packed buses' — đi lại khó khăn vì kẹt xe."
          },
          {
            "q": "Who liked the final performance of the show?",
            "a": 0,
            "e": "A: 'absolutely loved the grand finale', 'the final performance made every bit of the struggle worthwhile' — thích màn kết thúc."
          },
          {
            "q": "Who didn't like the festival overall?",
            "a": 1,
            "e": "B: 'I didn't have a great time', 'I didn't think it was worth the trouble' — không thích lễ hội nhìn chung."
          },
          {
            "q": "Who liked the location?",
            "a": 3,
            "e": "D: 'the most memorable part of the festival was its location', 'The park by the river was vast and picturesque' — thích địa điểm tổ chức."
          }
        ]
      },
      {
        "type": "heading",
        "title": "Part 4 · Long text comprehension",
        "instr": "Đọc bài viết và chọn tiêu đề phù hợp nhất cho mỗi đoạn.",
        "topic": "Digital transformation (Tech Forward)",
        "headings": [
          "Focusing on sustainable digital solutions",
          "Building inclusive digital ecosystems",
          "Over-reliance on digital devices",
          "Building innovative tech communities",
          "Promoting digital skills training",
          "Enhancing productivity through automation",
          "Redefining human-technology interaction"
        ],
        "paragraphs": [
          {
            "text": "The interaction between people and technology is continuously evolving. Modern gadgets and software are designed to be more user-friendly, enabling communication through voice commands, gestures, or even facial recognition. This transformation makes technology more intuitive and accessible, enhancing both personal and professional experiences.",
            "a": 6,
            "e": "'The interaction between people and technology', 'voice commands, gestures' → cách con người tương tác với công nghệ thay đổi: 'Redefining human-technology interaction'."
          },
          {
            "text": "Smart automation tools are revolutionizing workplaces by handling repetitive and time-consuming tasks. These technologies, often powered by AI, enable employees to concentrate on more valuable work, boosting efficiency and fostering innovation across various sectors.",
            "a": 5,
            "e": "'handling repetitive and time-consuming tasks', 'boosting efficiency' → tự động hóa nâng cao năng suất: 'Enhancing productivity through automation'."
          },
          {
            "text": "Educational institutions are increasingly incorporating technology into their curricula to prepare students for future careers. Programs focused on coding, robotics, and digital literacy provide learners with vital skills for the digital age, promoting creativity and enhancing problem-solving abilities.",
            "a": 4,
            "e": "'coding, robotics, and digital literacy' → dạy kỹ năng số trong nhà trường: 'Promoting digital skills training'."
          },
          {
            "text": "Although digital devices offer numerous advantages, over-reliance on screens can lead to negative consequences. Individuals may experience reduced social interactions, trouble concentrating, and higher stress levels. It's crucial to balance digital engagement with offline activities for maintaining mental and physical well-being.",
            "a": 2,
            "e": "'over-reliance on screens can lead to negative consequences' → phụ thuộc quá mức: 'Over-reliance on digital devices' là tiêu đề duy nhất nói về sự lệ thuộc."
          },
          {
            "text": "Not everyone has equal access to technology, which can result in significant social and economic divides. Those without reliable internet or modern devices may miss out on educational and employment opportunities, making it essential to address these inequalities through policies and community-driven efforts.",
            "a": 1,
            "e": "'Not everyone has equal access', 'address these inequalities' → khoảng cách tiếp cận công nghệ, cần hệ sinh thái số bao trùm: 'Building inclusive digital ecosystems'."
          },
          {
            "text": "Tech communities unite individuals passionate about technology to exchange ideas, support projects, and collaborate. These groups encourage innovation and creativity, offering mentorship and resources to help transform new ideas into reality.",
            "a": 3,
            "e": "'Tech communities unite individuals', 'encourage innovation' → cộng đồng công nghệ sáng tạo: 'Building innovative tech communities'."
          },
          {
            "text": "As technology continues to evolve, there is a growing focus on sustainability. Companies are developing eco-friendly products and adopting green practices to reduce environmental impact, ensuring that digital advancements contribute to long-term ecological health.",
            "a": 0,
            "e": "'sustainability', 'eco-friendly products', 'green practices' → giải pháp số bền vững: 'Focusing on sustainable digital solutions'."
          }
        ]
      }
    ]
  },
  {
    "id": "r12",
    "title": "Đề 12 — Extreme sports",
    "parts": [
      {
        "type": "gap",
        "title": "Part 1 · Sentence comprehension",
        "instr": "Chọn từ đúng cho mỗi chỗ trống.",
        "text": "Hey Lewis,\nI always study in the {0} before school.\nMy {1} and I play football after class.\nI always {2} my bag on the chair.\nApples are very {3} for your health.\nWe eat rice and {4} every day.\nLove,\nHelen",
        "gaps": [
          {
            "o": [
              "morning",
              "sea",
              "roof"
            ],
            "a": 0,
            "e": "'study in the morning before school' — học vào buổi sáng trước giờ đi học; 'sea' (biển), 'roof' (mái nhà) không hợp."
          },
          {
            "o": [
              "friends",
              "book",
              "tree"
            ],
            "a": 0,
            "e": "'My friends and I play football' — chơi bóng đá cùng bạn bè; sách hay cái cây không chơi bóng."
          },
          {
            "o": [
              "leave",
              "go",
              "love"
            ],
            "a": 0,
            "e": "'always leave my bag on the chair' — để túi trên ghế; 'go my bag' sai ngữ pháp, 'love my bag on the chair' sai nghĩa."
          },
          {
            "o": [
              "hate",
              "lovely",
              "good"
            ],
            "a": 2,
            "e": "'very good for your health' — cụm 'good for' (tốt cho); 'hate' là động từ, 'lovely for your health' không tự nhiên."
          },
          {
            "o": [
              "vegetables",
              "books",
              "games"
            ],
            "a": 0,
            "e": "'rice and vegetables' — cơm và rau ăn mỗi ngày; 'books', 'games' không ăn được."
          }
        ]
      },
      {
        "type": "order",
        "title": "Part 2 · Text cohesion",
        "instr": "Sắp xếp các câu theo đúng thứ tự để tạo thành đoạn văn hoàn chỉnh. Câu đầu tiên đã cho sẵn.",
        "topic": "Weekend activities",
        "first": "On Saturday morning, the town held a 10 km race for adults.",
        "sentences": [
          "There were 60 participants, in which Ms. Kamus kept the fastest speed and won.",
          "After she received the prize, the following time was for children's activities.",
          "Activities included football, swimming and skipping rope, and the children played together very happily.",
          "After playing, the children were very hungry and ate with their parents."
        ],
        "tip": "Mẹo: câu mở đầu giới thiệu sự kiện ('On Saturday morning… a 10 km race'); tiếp theo là số người tham gia và người thắng ('Ms. Kamus… won'); 'After she received the prize' trỏ ngược về người thắng và chuyển sang hoạt động của trẻ em; sau đó là các hoạt động của trẻ; 'After playing' kết thúc với việc các em đói và ăn cùng bố mẹ."
      },
      {
        "type": "opinion",
        "title": "Part 3 · Opinion matching",
        "instr": "Đọc ý kiến của 4 người về các môn thể thao mạo hiểm. Chọn người phù hợp cho mỗi câu hỏi (một người có thể được chọn nhiều lần).",
        "topic": "Extreme sports",
        "people": [
          {
            "name": "",
            "text": "Before trying any extreme sport, I believe it's absolutely essential to train properly. These kinds of activities are exciting, but they can also be dangerous if you don't know what you're doing. I've seen people get hurt because they didn't prepare well. That's why I always make sure to take a training course and understand the safety rules before I try anything new. With the right preparation, I think extreme sports can be a great experience."
          },
          {
            "name": "",
            "text": "What I love most about extreme sports is how they let me enjoy nature in a different way. Activities like rock climbing or mountain biking allow me to explore amazing places while challenging myself physically and mentally. It's a way to disconnect from daily life and feel completely alive. If I had more time and money, I'd love to do these kinds of sports more often, especially in wild, remote areas."
          },
          {
            "name": "",
            "text": "I've always been more into traditional sports like swimming, running, or playing tennis. They're fun and easy to do regularly. But a few months ago, I went bungee jumping during a holiday, and it was an incredible experience. I didn't expect to enjoy it so much! I still prefer regular sports for everyday fitness, but now I'm definitely more open to trying extreme sports once in a while for the adventure."
          },
          {
            "name": "",
            "text": "I know some people find extreme sports exciting, but for me, they've never been important. I actually avoid them as much as possible. I don't like the idea of putting myself in danger just for fun. There are plenty of safer ways to stay active and enjoy life. I'd rather go for a walk or do yoga than jump out of a plane or climb a mountain. It's just not my thing."
          }
        ],
        "questions": [
          {
            "q": "Who finds extreme sport unimportant?",
            "a": 3,
            "e": "D: 'they've never been important' → thể thao mạo hiểm chưa bao giờ quan trọng."
          },
          {
            "q": "Who finds training before participating is important?",
            "a": 0,
            "e": "A: 'it's absolutely essential to train properly' → huấn luyện trước khi chơi là rất cần thiết."
          },
          {
            "q": "Who still likes extreme sports after playing once?",
            "a": 2,
            "e": "C: 'I went bungee jumping… it was an incredible experience' và 'more open to trying extreme sports' → vẫn thích sau khi thử một lần."
          },
          {
            "q": "Who wants to play more extreme sport?",
            "a": 1,
            "e": "B: 'I'd love to do these kinds of sports more often' → muốn chơi nhiều hơn."
          },
          {
            "q": "Who likes traditional sports like swimming?",
            "a": 2,
            "e": "C: 'more into traditional sports like swimming, running, or playing tennis' → thích các môn truyền thống như bơi lội."
          },
          {
            "q": "Who enjoys nature?",
            "a": 1,
            "e": "B: 'they let me enjoy nature in a different way' → tận hưởng thiên nhiên."
          },
          {
            "q": "Who always avoids playing extreme sport?",
            "a": 3,
            "e": "D: 'I actually avoid them as much as possible' → luôn tránh các môn mạo hiểm."
          }
        ]
      },
      {
        "type": "heading",
        "title": "Part 4 · Long text comprehension",
        "instr": "Đọc bài viết và chọn tiêu đề phù hợp nhất cho mỗi đoạn.",
        "topic": "Four-Day Workweek",
        "headings": [
          "Benefits for employees",
          "A way of life now out of date",
          "Difficult to change old habits",
          "Undesirable financial consequences",
          "Unfair for some people",
          "Alternative solutions worth considering",
          "Unforeseen challenges for employees"
        ],
        "paragraphs": [
          {
            "text": "For many years, a workweek of five or even six days was the standard. However, advancements in technology, evolving social values, and an increasing emphasis on work-life balance are making this traditional schedule less relevant. Both employees and employers are starting to question whether spending the majority of one's week at work is truly necessary or productive.",
            "a": 1,
            "e": "'making this traditional schedule less relevant' → lịch làm việc truyền thống đã lỗi thời → 'A way of life now out of date'."
          },
          {
            "text": "Proponents of a four-day workweek highlight various benefits for workers. With an extra day off, employees gain more time to recharge, connect with family, or explore personal interests. Research shows that shorter workweeks can enhance focus and efficiency, leading to improved job performance and higher levels of job satisfaction.",
            "a": 0,
            "e": "'various benefits for workers' → lợi ích cho người lao động → 'Benefits for employees'."
          },
          {
            "text": "While appealing, a reduced workweek could have financial downsides. Companies might incur higher expenses from the need to hire additional staff or adjust compensation models. For sectors that rely on hourly employees, it may be difficult to maintain profitability, potentially leading to service reductions or job cuts.",
            "a": 3,
            "e": "'financial downsides… higher expenses' → hậu quả tài chính không mong muốn → 'Undesirable financial consequences'."
          },
          {
            "text": "Adapting to a new work schedule can be difficult for some employees. The pressure to complete tasks within a shorter timeframe can lead to stress, and fast-paced industries may face challenges such as missed deadlines or conflicting schedules, complicating the transition to a shorter workweek.",
            "a": 6,
            "e": "'pressure to complete tasks… stress… missed deadlines' → những khó khăn bất ngờ cho nhân viên → 'Unforeseen challenges for employees'."
          },
          {
            "text": "For individuals accustomed to traditional work hours, the shift to a four-day workweek can be challenging. Breaking long-established routines is tough, and some may resist change even when it offers potential benefits. Adapting to a new work pattern often requires time and support.",
            "a": 2,
            "e": "'Breaking long-established routines is tough' → khó thay đổi thói quen cũ → 'Difficult to change old habits'."
          },
          {
            "text": "While a four-day workweek may sound ideal to many, it isn't necessarily fair to all. Essential workers, healthcare providers, and employees in the hospitality industry may not have the option to reduce their hours. This could create disparities among different worker groups and lead to tension within the workforce.",
            "a": 4,
            "e": "'it isn't necessarily fair to all… disparities' → không công bằng với một số người → 'Unfair for some people'."
          },
          {
            "text": "Rather than universally implementing a four-day workweek, experts suggest considering more flexible arrangements. Options such as allowing employees to choose their days off or offering shorter daily hours can provide similar advantages without disrupting industries that depend on a traditional work schedule.",
            "a": 5,
            "e": "'experts suggest considering more flexible arrangements' → đề xuất các giải pháp thay thế → 'Alternative solutions worth considering'."
          }
        ]
      }
    ]
  },
  {
    "id": "r13",
    "title": "Đề 13 — Games & childhood",
    "parts": [
      {
        "type": "gap",
        "title": "Part 1 · Sentence comprehension",
        "instr": "Chọn từ đúng cho mỗi chỗ trống.",
        "text": "1. Where is the train {0} in this town?\n2. The bus {1} here every morning.\n3. The traffic light is {2} so you can go now.\n4. We usually have {3} at 7 p.m.\n5. Do you like watching {4} on weekends?",
        "gaps": [
          {
            "o": [
              "station",
              "school",
              "market"
            ],
            "a": 0,
            "e": "'train station' — ga tàu; 'train school/market' không có nghĩa."
          },
          {
            "o": [
              "swims",
              "stops",
              "flies"
            ],
            "a": 1,
            "e": "'The bus stops here every morning' — xe buýt dừng ở đây mỗi sáng; xe buýt không 'swims' hay 'flies'."
          },
          {
            "o": [
              "red",
              "yellow",
              "green"
            ],
            "a": 2,
            "e": "'so you can go now' — đèn xanh (green) mới được đi."
          },
          {
            "o": [
              "breakfast",
              "lunch",
              "dinner"
            ],
            "a": 2,
            "e": "'at 7 p.m.' — 7 giờ tối thì ăn bữa tối (dinner)."
          },
          {
            "o": [
              "books",
              "movies",
              "hotdog"
            ],
            "a": 1,
            "e": "'watching movies' — xem phim; không 'watch' sách hay hotdog."
          }
        ]
      },
      {
        "type": "order",
        "title": "Part 2 · Text cohesion",
        "instr": "Sắp xếp các câu theo đúng thứ tự để tạo thành đoạn văn hoàn chỉnh. Câu đầu tiên đã cho sẵn.",
        "topic": "Old movies",
        "first": "Old movies were very different from today's movies.",
        "sentences": [
          "That's because the movies were only in black and white, and sometimes without sound.",
          "Besides these technological limitations, the movies also had low budgets.",
          "Due to the lack of money, actors also had few opportunities to earn money through acting.",
          "Now things have changed, actors and filmmakers can earn thousands of dollars from film production."
        ],
        "tip": "Mẹo: câu mở đầu nêu ý chung 'Old movies were very different'; 'That's because' giải thích lý do (đen trắng, không tiếng); 'Besides… also had low budgets' bổ sung hạn chế thứ hai ('these technological limitations'); 'Due to the lack of money' là hệ quả của kinh phí thấp; 'Now things have changed' đối lập với quá khứ nên đứng cuối."
      },
      {
        "type": "opinion",
        "title": "Part 3 · Opinion matching",
        "instr": "Đọc ý kiến của 4 người về trò chơi và giải trí thời thơ ấu. Chọn người phù hợp cho mỗi câu hỏi (một người có thể được chọn nhiều lần).",
        "topic": "Games and childhood",
        "people": [
          {
            "name": "",
            "text": "In the past, I really liked playing board games. Now, to limit the children from using computers, I often spend time playing with them. However, I have struggled with them because the games nowadays have more characters and rules, making us think a lot every time we play. Despite this, my children and I still like it and have a good time together."
          },
          {
            "name": "",
            "text": "When I was a child, I often played soccer with other children of the same age. We usually played in the schoolyard and sometimes in the open spaces of the neighborhood. We divided into small teams and chased the ball until we were all tired."
          },
          {
            "name": "",
            "text": "When I was a child, I didn't like going out to play, so I chose reading books as a form of entertainment. The stories described in the pages of books helped me discover my own world. Later, when I grew up, I started liking modern games with eye-catching interfaces, which help me relax and increase my creativity."
          },
          {
            "name": "",
            "text": "When I was a child, I really liked outdoor activities. I remember that on bad weather days, I was always by the window, glued to it, looking outside and praying for the rain to stop. At those times, my mother often gave me paper and a box of crayons. I really enjoyed that drawing activity and often drew at home when the weather was bad."
          }
        ],
        "questions": [
          {
            "q": "Who finds today's games harder than before?",
            "a": 0,
            "e": "A: 'the games nowadays have more characters and rules, making us think a lot' → trò chơi ngày nay khó hơn."
          },
          {
            "q": "Who enjoyed playing with friends in childhood?",
            "a": 1,
            "e": "B: 'I often played soccer with other children of the same age' → hồi nhỏ chơi bóng cùng bạn bè."
          },
          {
            "q": "Who enjoys playing with their children?",
            "a": 0,
            "e": "A: 'I often spend time playing with them… my children and I still like it' → thích chơi cùng con."
          },
          {
            "q": "Who waited and hoped to go outside?",
            "a": 3,
            "e": "D: 'looking outside and praying for the rain to stop' → chờ và mong được ra ngoài."
          },
          {
            "q": "Who prefers modern games?",
            "a": 2,
            "e": "C: 'I started liking modern games with eye-catching interfaces' → thích trò chơi hiện đại."
          },
          {
            "q": "Who enjoyed arts as a child?",
            "a": 3,
            "e": "D: 'my mother often gave me paper and a box of crayons… I really enjoyed that drawing activity' → hồi nhỏ thích vẽ."
          },
          {
            "q": "Who enjoyed reading books as a child?",
            "a": 2,
            "e": "C: 'I chose reading books as a form of entertainment' → hồi nhỏ thích đọc sách."
          }
        ]
      },
      {
        "type": "heading",
        "title": "Part 4 · Long text comprehension",
        "instr": "Đọc bài viết và chọn tiêu đề phù hợp nhất cho mỗi đoạn.",
        "topic": "Climbing mountains",
        "headings": [
          "Focus on stability",
          "Worrying connections",
          "The mistake of misplaced priorities",
          "Publicity of achievement",
          "The unique feeling of achievement",
          "Changing the definition of mountain",
          "Intimate relationships"
        ],
        "paragraphs": [
          {
            "text": "The term \"mountain\" has evolved over time, reflecting not only physical characteristics but also cultural significance. In contemporary discussions, mountains may symbolize challenges to overcome or destinations for adventure, transcending their geographical attributes.",
            "a": 5,
            "e": "'has evolved over time' → định nghĩa của từ 'mountain' thay đổi → 'Changing the definition of mountain'."
          },
          {
            "text": "Climbing a mountain often leads to a profound sense of accomplishment. It represents not just reaching a physical summit but also conquering personal fears and pushing one's limits, creating memories that last a lifetime.",
            "a": 4,
            "e": "'a profound sense of accomplishment' → cảm giác thành tựu đặc biệt → 'The unique feeling of achievement'."
          },
          {
            "text": "In today's digital age, sharing achievements has become prevalent. Climbing a mountain is frequently documented on social media, turning personal milestones into public spectacles that inspire others while also raising questions about authenticity.",
            "a": 3,
            "e": "'documented on social media… public spectacles' → công khai thành tích → 'Publicity of achievement'."
          },
          {
            "text": "The pursuit of climbing mountains can sometimes lead to misplaced priorities. While seeking adventure and recognition, individuals may neglect personal relationships or responsibilities, emphasizing the need for a balanced approach to life.",
            "a": 2,
            "e": "'misplaced priorities' → đặt sai ưu tiên → 'The mistake of misplaced priorities'."
          },
          {
            "text": "Engaging in extreme sports, such as mountain climbing, can forge strong bonds among participants. However, it may also create worrying connections where individuals prioritize adrenaline over safety, potentially leading to dangerous situations.",
            "a": 1,
            "e": "'create worrying connections' → các mối liên kết đáng lo ngại → 'Worrying connections'."
          },
          {
            "text": "While adventure is thrilling, there is a growing recognition of the importance of stability in life. Balancing the desire for adventure with the need for security is crucial, prompting individuals to reflect on their life choices and long-term goals.",
            "a": 0,
            "e": "'the importance of stability in life' → tầm quan trọng của sự ổn định → 'Focus on stability'."
          },
          {
            "text": "Shared experiences in challenging environments, like mountains, can deepen intimacy in relationships. Couples or friends who navigate the challenges of climbing together often find their bonds strengthened through mutual support and understanding.",
            "a": 6,
            "e": "'deepen intimacy in relationships' → mối quan hệ thân mật hơn → 'Intimate relationships'."
          }
        ]
      }
    ]
  },
];
