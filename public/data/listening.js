/* Ngân hàng đề Listening — nội dung do FlashAptis tự biên soạn.
   Âm thanh được đọc bằng giọng máy của trình duyệt (Web Speech API).
   s: 'm' giọng nam, 'f' giọng nữ; who: định danh người nói. hl: câu chốt đáp án (tô sáng trong transcript). */
window.FA_LISTENING = [
  {
    id: "l1",
    title: "Đề 1",
    hot: true,
    parts: [
      {
        type: "mcq",
        title: "Part 1 · Câu 1–13",
        instr: "Nghe đoạn ngắn và chọn đáp án đúng. Mỗi đoạn nghe tối đa 2 lần.",
        items: [
          { q: "What time does the train leave?", o: ["8:15", "8:50", "9:15"], a: 1, e: "Tàu lúc 8:15 bị hoãn 35 phút → 8:50.",
            script: [{ s: "f", t: "Excuse me, is the train to Manchester still at a quarter past eight?" }, { s: "m", t: "I'm afraid it's delayed by thirty-five minutes.", hl: 1 }, { s: "f", t: "Oh, so it leaves at ten to nine. Thanks." }] },
          { q: "What does the man want to buy?", o: ["A jacket", "A pair of shoes", "A scarf"], a: 0, e: "Anh ấy định mua giày nhưng rồi chọn áo khoác vì trời lạnh.",
            script: [{ s: "m", t: "I came in to look at shoes, but actually it's getting so cold. I think I need a warm jacket more.", hl: 1 }, { s: "f", t: "Good idea. The jackets are on the second floor." }] },
          { q: "Where is the woman's phone?", o: ["In her bag", "On the kitchen table", "In the car"], a: 2, e: "Không có trong túi, không ở bàn bếp → để quên trong xe.",
            script: [{ s: "f", t: "Have you seen my phone? It isn't in my bag." }, { s: "m", t: "It was on the kitchen table this morning." }, { s: "f", t: "No, I took it with me... Oh, I remember now! I left it in the car.", hl: 1 }] },
          { q: "How much does the man pay?", o: ["£12", "£15", "£20"], a: 1, e: "Hai vé £10 = £20, giảm 25% cho học sinh → £15.",
            script: [{ s: "m", t: "Two tickets, please. How much is that?" }, { s: "f", t: "They're ten pounds each, but with your student card you get twenty-five percent off. So that's fifteen pounds in total.", hl: 1 }] },
          { q: "What is the weather going to be like tomorrow?", o: ["Sunny", "Windy", "Rainy"], a: 1, e: "Không mưa, có nắng nhẹ buổi sáng nhưng gió rất mạnh cả ngày.",
            script: [{ s: "f", t: "And now the weather for tomorrow. The rain will finally stop tonight. There'll be a little sun early in the morning, but strong winds will blow all day, so hold on to your hats!", hl: 1 }] },
          { q: "Why is the woman calling?", o: ["To cancel an appointment", "To change an appointment", "To make a complaint"], a: 1, e: "Cô ấy muốn chuyển lịch sang thứ Năm chứ không hủy.",
            script: [{ s: "f", t: "Hello, this is Sarah Jones. I have an appointment with Doctor Smith on Tuesday, but I can't come. Could I move it to Thursday instead?", hl: 1 }] },
          { q: "What does the man do in his free time?", o: ["He plays football", "He goes swimming", "He paints"], a: 2, e: "Từng chơi bóng đá, giờ thích vẽ tranh.",
            script: [{ s: "f", t: "Do you still play football at the weekend?" }, { s: "m", t: "Not any more. I hurt my knee. These days I spend my free time painting. I find it really relaxing.", hl: 1 }] },
          { q: "How will they travel to the airport?", o: ["By taxi", "By bus", "By train"], a: 0, e: "Xe buýt quá chậm, tàu không chạy sớm → đi taxi.",
            script: [{ s: "m", t: "The bus takes almost two hours." }, { s: "f", t: "And there are no trains that early in the morning." }, { s: "m", t: "Then let's book a taxi. It's more expensive but much easier.", hl: 1 }] },
          { q: "What is the speaker's job?", o: ["A teacher", "A nurse", "A chef"], a: 1, e: "Làm ca đêm ở bệnh viện, chăm sóc bệnh nhân → y tá.",
            script: [{ s: "f", t: "I usually work night shifts at the city hospital. I look after patients after their operations and make sure they take their medicine.", hl: 1 }] },
          { q: "What does the woman think of the film?", o: ["It was too long", "It was frightening", "It was funny"], a: 0, e: "Diễn viên hay nhưng phim dài 3 tiếng → quá dài.",
            script: [{ s: "m", t: "So, did you enjoy the film?" }, { s: "f", t: "The actors were great, but three hours is just too long. I almost fell asleep at the end.", hl: 1 }] },
          { q: "Which room is the meeting in?", o: ["Room 104", "Room 140", "Room 401"], a: 2, e: "Phòng 104 đang sửa → chuyển sang 401.",
            script: [{ s: "m", t: "Attention please. Today's meeting will not be in room one oh four because it is being painted. Please go to room four oh one on the fourth floor instead.", hl: 1 }] },
          { q: "What will the woman cook tonight?", o: ["Fish", "Chicken", "Pasta"], a: 2, e: "Định nấu cá nhưng siêu thị hết, không thích gà → nấu mì Ý.",
            script: [{ s: "f", t: "I wanted to make fish tonight, but the supermarket had none left. You don't like chicken, so I'll just make pasta with tomato sauce.", hl: 1 }, { s: "m", t: "Sounds perfect." }] },
          { q: "When is the man's birthday party?", o: ["Friday", "Saturday", "Sunday"], a: 1, e: "Sinh nhật vào Chủ nhật nhưng tổ chức tiệc tối thứ Bảy.",
            script: [{ s: "m", t: "My birthday is on Sunday, but most of my friends work on Monday, so I'm having the party on Saturday evening.", hl: 1 }] },
        ],
      },
      {
        type: "speakers",
        title: "Part 2 · Câu 14",
        instr: "Bốn người nói về việc học ngoại ngữ. Chọn câu mô tả đúng nhất mỗi người. Có 2 lựa chọn thừa.",
        options: [
          "learns mainly by watching films",
          "studies with a private teacher",
          "learned the language for work",
          "finds grammar the hardest part",
          "uses a mobile app every day",
          "stopped studying for a long time",
        ],
        speakers: [
          { a: 4, script: [{ s: "f", who: "A", t: "I don't have time for classes, so I practise for fifteen minutes on my phone every morning on the bus. The app reminds me if I forget, and I haven't missed a single day this year." }] },
          { a: 2, script: [{ s: "m", who: "B", t: "My company opened an office in Spain, and my boss told me I would need Spanish for meetings. That's why I started. Now I can talk to clients without a translator." }] },
          { a: 5, script: [{ s: "f", who: "C", t: "I studied French at school, then I didn't touch it for nearly twenty years. Last year I decided to start again, and I was surprised how much I still remembered." }] },
          { a: 0, script: [{ s: "m", who: "D", t: "Honestly, my best teacher is the cinema. I watch Korean movies with subtitles every night and I write down useful phrases. My listening has improved a lot." }] },
        ],
      },
      {
        type: "conv",
        title: "Part 3 · Câu 15",
        instr: "Nghe hai người thảo luận về du lịch một mình. Ai bày tỏ ý kiến sau: người đàn ông (Man), người phụ nữ (Woman), hay cả hai (Both)?",
        script: [
          { s: "m", t: "I'm thinking of travelling alone this summer. It means I can do exactly what I want every day." },
          { s: "f", t: "That's true, and I think you meet more local people when you're on your own. When I travel with friends, we just talk to each other." },
          { s: "m", t: "Mm, maybe. But I'm a bit worried it will be expensive. Hotels charge the same for one person as for two." },
          { s: "f", t: "That's the problem, isn't it? Single travellers always pay more. Still, I think it's a great way to become more confident." },
          { s: "m", t: "Yes, I agree. Solving problems by yourself in a foreign country really helps you grow up." },
        ],
        statements: [
          { q: "Travelling alone gives you freedom to choose your activities.", a: "Man" },
          { q: "You talk to local people more when you travel alone.", a: "Woman" },
          { q: "Travelling alone costs more money.", a: "Both" },
          { q: "Travelling alone builds confidence.", a: "Both" },
        ],
      },
      {
        type: "mono",
        title: "Part 4 · Câu 16–17",
        instr: "Nghe bài nói và trả lời 2 câu hỏi cho mỗi bài.",
        talks: [
          {
            topic: "A talk about a museum",
            script: [{ s: "f", t: "Welcome to the City Science Museum. Most visitors start on the ground floor with our dinosaur exhibition, but today I recommend going straight to the top floor. Our new space gallery opened last week, and it gets very crowded after lunch. Please remember that photos are allowed everywhere, but you must not use a flash in the space gallery because it can damage the old instruments. The café closes at four, half an hour before the museum.", hl: 1 }],
            questions: [
              { q: "Why does the speaker suggest visiting the top floor first?", o: ["It has the most famous exhibition", "It becomes busy later in the day", "It closes earlier than other floors"], a: 1, e: "'it gets very crowded after lunch' → buổi chiều đông." },
              { q: "What are visitors not allowed to do in the space gallery?", o: ["Take any photographs", "Touch the instruments", "Use a camera flash"], a: 2, e: "'you must not use a flash in the space gallery'." },
            ],
          },
          {
            topic: "A radio interview about sleep",
            script: [{ s: "m", t: "Many people believe they need eight hours of sleep, but our research shows it varies a lot from person to person. What matters more is going to bed at the same time every night. The biggest problem we found was phones. People who used their phones in bed fell asleep forty minutes later on average. So my advice is simple: leave your phone in another room and buy an old-fashioned alarm clock.", hl: 1 }],
            questions: [
              { q: "According to the speaker, what is most important for good sleep?", o: ["Sleeping exactly eight hours", "Having a regular bedtime", "Going to bed early"], a: 1, e: "'What matters more is going to bed at the same time every night'." },
              { q: "What does the speaker recommend?", o: ["Keeping phones out of the bedroom", "Turning off notifications", "Reading before sleep"], a: 0, e: "'leave your phone in another room'." },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "l2",
    title: "Đề 2",
    parts: [
      {
        type: "mcq",
        title: "Part 1 · Câu 1–13",
        instr: "Nghe đoạn ngắn và chọn đáp án đúng. Mỗi đoạn nghe tối đa 2 lần.",
        items: [
          { q: "What is the woman's phone number?", o: ["0794 315 862", "0794 351 862", "0749 315 826"], a: 0, e: "Đọc từng số: oh seven nine four, three one five, eight six two.",
            script: [{ s: "m", t: "Can I have your number, please?" }, { s: "f", t: "Sure. It's oh seven nine four, three one five, eight six two.", hl: 1 }] },
          { q: "Where are the speakers?", o: ["In a bank", "In a post office", "In a library"], a: 1, e: "Gửi bưu kiện đi Pháp, mua tem → bưu điện.",
            script: [{ s: "f", t: "I'd like to send this parcel to France, please. And can I have six stamps as well?", hl: 1 }, { s: "m", t: "Of course. Put it on the scale for me." }] },
          { q: "What did the man lose?", o: ["His keys", "His glasses", "His wallet"], a: 1, e: "Ví và chìa khóa vẫn còn; không đọc được thực đơn vì mất kính.",
            script: [{ s: "m", t: "My wallet and keys are here, but I can't read this menu at all. I must have left my glasses at the office.", hl: 1 }] },
          { q: "How long is the course?", o: ["Six weeks", "Eight weeks", "Ten weeks"], a: 2, e: "Ban đầu 8 tuần, giờ kéo dài thêm 2 tuần → 10 tuần.",
            script: [{ s: "f", t: "The cooking course used to be eight weeks long, but this year we've added two extra weeks on baking.", hl: 1 }] },
          { q: "What does the woman want to drink?", o: ["Coffee", "Orange juice", "Tea"], a: 2, e: "Không uống cà phê buổi tối, hết nước cam → trà.",
            script: [{ s: "m", t: "Coffee?" }, { s: "f", t: "Not this late, or I won't sleep. Is there any orange juice?" }, { s: "m", t: "Sorry, we finished it." }, { s: "f", t: "Then a cup of tea would be lovely.", hl: 1 }] },
          { q: "Why was the man late?", o: ["He missed the bus", "There was heavy traffic", "His alarm didn't ring"], a: 0, e: "Ngủ quên? Không — báo thức có kêu; anh ấy lỡ xe buýt vì dừng mua cà phê.",
            script: [{ s: "f", t: "You're late again! Did your alarm not go off?" }, { s: "m", t: "No, it did. But I stopped to buy a coffee and the bus left without me.", hl: 1 }] },
          { q: "Which sport does the woman do?", o: ["Tennis", "Yoga", "Running"], a: 1, e: "Từng chạy bộ và tennis, giờ tập yoga vì đau lưng.",
            script: [{ s: "f", t: "I used to run and play tennis, but my back started to hurt, so now I do yoga twice a week. It's much gentler.", hl: 1 }] },
          { q: "What will the man do this evening?", o: ["Go to the gym", "Study for a test", "Meet a friend"], a: 1, e: "Muốn gặp bạn nhưng phải ôn thi ngày mai.",
            script: [{ s: "f", t: "Do you want to meet Tom tonight?" }, { s: "m", t: "I'd love to, but I've got a maths test tomorrow. I need to stay home and revise.", hl: 1 }] },
          { q: "How does the woman get to work?", o: ["By bike", "On foot", "By car"], a: 0, e: "Đã bán ô tô, nhà quá xa để đi bộ → đạp xe.",
            script: [{ s: "f", t: "I sold my car last year. It's too far to walk, so I cycle every day. It's great exercise.", hl: 1 }] },
          { q: "What does the man say about the hotel?", o: ["The room was small", "The staff were unfriendly", "The breakfast was poor"], a: 0, e: "Nhân viên thân thiện, bữa sáng ngon nhưng phòng nhỏ.",
            script: [{ s: "m", t: "The staff were really helpful and breakfast was delicious. My only complaint is that the room was tiny – I could hardly open my suitcase.", hl: 1 }] },
          { q: "What is the main purpose of the announcement?", o: ["To advertise a sale", "To say the shop is closing soon", "To find a lost child"], a: 1, e: "'The store will close in fifteen minutes'.",
            script: [{ s: "f", t: "Good evening, shoppers. The store will close in fifteen minutes. Please take your items to the checkout. Thank you for shopping with us.", hl: 1 }] },
          { q: "What present will they buy for Anna?", o: ["A book", "A plant", "Some flowers"], a: 1, e: "Hoa nhanh tàn, sách cô ấy có nhiều rồi → mua cây cảnh.",
            script: [{ s: "m", t: "Flowers for Anna?" }, { s: "f", t: "They die so quickly. And she has too many books already. What about a plant for her new flat?", hl: 1 }, { s: "m", t: "Perfect." }] },
          { q: "What is the problem with the woman's laptop?", o: ["The screen is broken", "The battery doesn't charge", "It is very slow"], a: 1, e: "Màn hình ổn, chạy nhanh, nhưng pin không sạc được.",
            script: [{ s: "f", t: "The screen is fine and it's quite fast, but the battery won't charge any more. It only works when it's plugged in.", hl: 1 }] },
        ],
      },
      {
        type: "speakers",
        title: "Part 2 · Câu 14",
        instr: "Bốn người nói về nơi họ sống. Chọn câu mô tả đúng nhất mỗi người. Có 2 lựa chọn thừa.",
        options: [
          "wants to move to the countryside",
          "enjoys the public transport",
          "complains about the noise",
          "likes the friendly neighbours",
          "thinks rent is too expensive",
          "has lived there all their life",
        ],
        speakers: [
          { a: 3, script: [{ s: "m", who: "A", t: "The building is old and the lift often breaks, but I wouldn't leave. Everyone here says hello, and when I was ill last winter, the lady upstairs brought me soup every day." }] },
          { a: 4, script: [{ s: "f", who: "B", t: "I love the area – there are great cafés and parks. But half my salary goes to my landlord every month. I can't save anything at all." }] },
          { a: 1, script: [{ s: "m", who: "C", t: "I don't need a car here. The metro station is two minutes from my door and trains come every three minutes, even late at night." }] },
          { a: 2, script: [{ s: "f", who: "D", t: "My flat is above a bar, and on Fridays and Saturdays the music doesn't stop until three in the morning. I have to wear earplugs to sleep." }] },
        ],
      },
      {
        type: "conv",
        title: "Part 3 · Câu 15",
        instr: "Nghe hai người thảo luận về đọc sách giấy và sách điện tử. Ai bày tỏ ý kiến sau?",
        script: [
          { s: "f", t: "I've started reading on an e-reader. I can carry hundreds of books when I travel." },
          { s: "m", t: "I suppose that's useful. But for me, nothing beats the feeling of a real book in my hands." },
          { s: "f", t: "I know what you mean, and paper books do look lovely on a shelf. But e-books are usually cheaper." },
          { s: "m", t: "Are they? I didn't know that. Anyway, I find that looking at a screen for too long hurts my eyes." },
          { s: "f", t: "Actually, mine too, especially at night. I agree with you there." },
        ],
        statements: [
          { q: "E-readers are convenient when travelling.", a: "Woman" },
          { q: "Holding a paper book is a special experience.", a: "Man" },
          { q: "E-books cost less money.", a: "Woman" },
          { q: "Reading on a screen can be bad for your eyes.", a: "Both" },
        ],
      },
      {
        type: "mono",
        title: "Part 4 · Câu 16–17",
        instr: "Nghe bài nói và trả lời 2 câu hỏi cho mỗi bài.",
        talks: [
          {
            topic: "A message from a sports centre",
            script: [{ s: "m", t: "Hello members. From next Monday, the swimming pool will be closed for two weeks while we repair the heating system. During this time, the gym will stay open as usual, and we are offering free yoga classes every evening. If you have already paid for swimming lessons, you can either get your money back or move your lessons to next month. Just speak to the staff at reception.", hl: 1 }],
            questions: [
              { q: "Why will the pool be closed?", o: ["To clean the water", "To fix the heating", "To build a new pool"], a: 1, e: "'repair the heating system'." },
              { q: "What can people who paid for swimming lessons do?", o: ["Join yoga classes for half price", "Get a refund or change the date", "Use the pool at another centre"], a: 1, e: "'get your money back or move your lessons to next month'." },
            ],
          },
          {
            topic: "A teacher talks about homework",
            script: [{ s: "f", t: "Parents often ask me whether children should get more homework. In my experience, the amount is not the key point. Ten minutes of reading every day is far more useful than two hours of worksheets at the weekend. What I really want is for children to be curious, so I sometimes give homework like interviewing a grandparent about their childhood. The children love it, and families end up talking more.", hl: 1 }],
            questions: [
              { q: "What is the teacher's opinion about homework?", o: ["Children need much more of it", "Short regular tasks work best", "It should only be given at weekends"], a: 1, e: "'Ten minutes of reading every day is far more useful than two hours...'." },
              { q: "What is one result of the interview homework?", o: ["Children get higher marks", "Families communicate more", "Grandparents visit the school"], a: 1, e: "'families end up talking more'." },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "l3",
    title: "Đề 3",
    parts: [
      {
        type: "mcq",
        title: "Part 1 · Câu 1–13",
        instr: "Nghe đoạn ngắn và chọn đáp án đúng. Mỗi đoạn nghe tối đa 2 lần.",
        items: [
          { q: "What time does the library open on Sunday?", o: ["9:00", "10:00", "11:00"], a: 1, e: "Thứ Hai–thứ Bảy mở 9 giờ, Chủ nhật mở muộn hơn 1 tiếng → 10 giờ.",
            script: [{ s: "m", t: "Hello, City Library. We are open from nine to six Monday to Saturday, and on Sunday we open one hour later, at ten o'clock.", hl: 1 }] },
          { q: "What did the woman forget to pack?", o: ["Her charger", "Her sunglasses", "Her passport"], a: 0, e: "Hộ chiếu và kính râm đều có trong túi, nhưng để quên dây sạc ở nhà.",
            script: [{ s: "f", t: "Let me check my bag. Passport, check. Sunglasses, check. Oh no, I left my phone charger plugged in next to my bed!", hl: 1 }] },
          { q: "How much will the man pay for parking?", o: ["£4", "£6", "£8"], a: 1, e: "2 tiếng đầu giá £4, thêm 1 tiếng nữa cộng £2 → tổng £6.",
            script: [{ s: "m", t: "How much is parking for three hours?" }, { s: "f", t: "It's four pounds for the first two hours, and two pounds for each extra hour. So three hours comes to six pounds.", hl: 1 }] },
          { q: "Where will they have lunch?", o: ["At an Italian restaurant", "In the park", "At a café"], a: 1, e: "Nhà hàng Ý đóng cửa sửa, quán cà phê quá đông → mua bánh mì ra công viên ăn.",
            script: [{ s: "m", t: "Shall we go to Luigi's Italian place?" }, { s: "f", t: "It's closed for painting, and the café next door is full. Why don't we grab sandwiches and sit in the park?", hl: 1 }, { s: "m", t: "Great idea." }] },
          { q: "What is the woman's new hobby?", o: ["Photography", "Gardening", "Baking"], a: 1, e: "Tháng trước còn chụp ảnh, giờ thuê mảnh vườn nhỏ để trồng rau.",
            script: [{ s: "m", t: "Are you still taking photos every weekend?" }, { s: "f", t: "Not really. I rented a small plot last month and now I spend all my free time growing vegetables and flowers.", hl: 1 }] },
          { q: "Why is the flight delayed?", o: ["Heavy fog", "A technical problem", "Late crew"], a: 0, e: "Máy bay ổn, phi hành đoàn đã có mặt, nhưng sương mù dày làm tầm nhìn kém.",
            script: [{ s: "f", t: "Attention passengers on flight BA two zero four. Our aircraft and crew are ready, but thick fog at the airport means we have to delay take-off by forty minutes.", hl: 1 }] },
          { q: "What colour coat does the man buy?", o: ["Black", "Blue", "Grey"], a: 1, e: "Định lấy màu đen nhưng hết size, màu xám hơi sáng → chọn xanh đậm.",
            script: [{ s: "m", t: "I wanted the black coat, but you don't have my size. The grey one is a bit too light, so I'll take the dark blue one.", hl: 1 }] },
          { q: "Who is calling?", o: ["A delivery driver", "A dentist's receptionist", "A neighbour"], a: 0, e: "Đang đứng trước cổng giao bưu kiện.",
            script: [{ s: "m", t: "Hi, this is Tom from Express Parcels. I'm outside your gate with a large box, but nobody answered the bell.", hl: 1 }] },
          { q: "How does the woman feel about her new job?", o: ["Excited", "Nervous", "Disappointed"], a: 0, e: "Hơi bận nhưng đồng nghiệp thân thiện và cô ấy rất háo hức.",
            script: [{ s: "m", t: "How was your first week at the design studio?" }, { s: "f", t: "Really busy! Everyone was so welcoming, and I'm honestly thrilled to be working on real projects already.", hl: 1 }] },
          { q: "Which platform does the train to Oxford leave from?", o: ["Platform 2", "Platform 5", "Platform 7"], a: 2, e: "Bình thường đi ở sân ga số 5 nhưng hôm nay đổi sang số 7.",
            script: [{ s: "f", t: "The eleven fifteen service to Oxford normally departs from platform five, but please note that today it will leave from platform seven.", hl: 1 }] },
          { q: "What does the man need to buy for dinner?", o: ["Onions", "Rice", "Cheese"], a: 2, e: "Gạo và hành tây vẫn còn đủ trong tủ, chỉ thiếu phô mai.",
            script: [{ s: "f", t: "Can you stop by the shop? We've got plenty of rice and onions, so we just need some cheese for the pasta.", hl: 1 }] },
          { q: "When will the repair person arrive?", o: ["Tuesday morning", "Wednesday afternoon", "Thursday morning"], a: 1, e: "Thứ Ba kín lịch, sáng thứ Tư bận → chiều thứ Tư lúc 2 giờ.",
            script: [{ s: "m", t: "I'm fully booked on Tuesday and Wednesday morning. Is two o'clock on Wednesday afternoon okay to fix your washing machine?", hl: 1 }] },
          { q: "What did the man do on Saturday night?", o: ["Watched a football match", "Went to a concert", "Stayed home and read"], a: 2, e: "Định đi xem ca nhạc nhưng bị đau đầu nên ở nhà đọc sách.",
            script: [{ s: "f", t: "How was the rock concert on Saturday?" }, { s: "m", t: "I didn't go in the end. I had a terrible headache, so I stayed in bed and finished my novel.", hl: 1 }] },
        ],
      },
      {
        type: "speakers",
        title: "Part 2 · Câu 14",
        instr: "Bốn người nói về thói quen buổi sáng. Chọn câu mô tả đúng nhất mỗi người. Có 2 lựa chọn thừa.",
        options: [
          "goes for a run before breakfast",
          "avoids checking their phone",
          "prepares lunch the night before",
          "drinks several cups of coffee",
          "listens to podcasts while commuting",
          "wakes up much earlier than necessary",
        ],
        speakers: [
          { a: 1, script: [{ s: "f", who: "A", t: "I leave my phone charging in the living room overnight. For the first hour after I wake up, I don't read any messages or news. It keeps my mind calm." }] },
          { a: 0, script: [{ s: "m", who: "B", t: "My alarm rings at six, and ten minutes later I'm out in the park jogging for half an hour. Only after a shower do I sit down for eggs and toast." }] },
          { a: 4, script: [{ s: "f", who: "C", t: "My train ride to the office takes forty-five minutes. I put my headphones on and catch up on science and history shows, so the journey flies by." }] },
          { a: 2, script: [{ s: "m", who: "D", t: "I hate rushing in the morning, so every evening I pack my salad and fruit into boxes and leave them in the fridge ready to grab." }] },
        ],
      },
      {
        type: "conv",
        title: "Part 3 · Câu 15",
        instr: "Nghe hai đồng nghiệp nói về việc làm việc từ xa (remote work). Ai bày tỏ ý kiến sau: Man, Woman, hay Both?",
        script: [
          { s: "f", t: "Since our company allowed remote work two days a week, I get so much more done at home because nobody interrupts me." },
          { s: "m", t: "Really? I actually focus better at the office. At home I end up doing laundry or checking the fridge every twenty minutes." },
          { s: "f", t: "Haha, I get that. Still, skipping the morning bus saves me an hour and a half every day." },
          { s: "m", t: "Oh, definitely! Not sitting in traffic is the best part for me too. What I worry about is that new staff don't get enough help when everyone works from home." },
          { s: "f", t: "You're right. When you're new, it's hard to ask quick questions over chat instead of tapping someone on the shoulder." },
        ],
        statements: [
          { q: "Working from home increases personal productivity.", a: "Woman" },
          { q: "It is easier to get distracted at home.", a: "Man" },
          { q: "Avoiding daily travel saves valuable time.", a: "Both" },
          { q: "New employees may struggle without face-to-face support.", a: "Both" },
        ],
      },
      {
        type: "mono",
        title: "Part 4 · Câu 16–17",
        instr: "Nghe bài nói và trả lời 2 câu hỏi cho mỗi bài.",
        talks: [
          {
            topic: "An announcement about a city park",
            script: [{ s: "f", t: "Good morning, park visitors. Starting this Saturday, the lakeside path will be closed for three weeks while we plant new trees and install solar lights. All playgrounds and the picnic lawn remain open as normal. We also invite volunteers to join our weekend clean-up at nine o'clock near the main gate — gloves and bags will be provided, and everyone gets a free hot drink afterwards.", hl: 1 }],
            questions: [
              { q: "Why will the lakeside path be closed?", o: ["To repair the lake bridge", "To add trees and lighting", "To host a weekend festival"], a: 1, e: "'while we plant new trees and install solar lights'." },
              { q: "What do weekend volunteers need to bring?", o: ["Nothing, equipment is provided", "Their own gloves and bags", "A ticket from the main gate"], a: 0, e: "'gloves and bags will be provided'." },
            ],
          },
          {
            topic: "A talk about learning a musical instrument",
            script: [{ s: "m", t: "Many adults think they are too old to learn an instrument like the guitar or piano. In fact, adults often progress faster than children at the beginning because they understand rhythm and know how to concentrate. The biggest obstacle is impatience: adults expect to sound great after two weeks and give up when their fingers hurt. If you practise just fifteen minutes a day, you will be amazed after three months.", hl: 1 }],
            questions: [
              { q: "Why can adults learn faster than children at first?", o: ["They have better concentration", "They have more free time", "Their fingers are stronger"], a: 0, e: "'because they understand rhythm and know how to concentrate'." },
              { q: "Why do many adults quit early?", o: ["Lessons are too expensive", "They expect quick results", "They don't like reading music"], a: 1, e: "'The biggest obstacle is impatience: adults expect to sound great after two weeks'." },
            ],
          },
        ],
      },
    ],
  },
  {
    "id": "l4",
    "title": "Đề 4 — Daily life and environment",
    "parts": [
      {
        "type": "mcq",
        "title": "Part 1 · Câu 1–13",
        "instr": "Nghe đoạn ngắn và chọn đáp án đúng. Mỗi đoạn nghe tối đa 2 lần.",
        "items": [
          {
            "q": "What is not original?",
            "o": [
              "Furniture",
              "Home",
              "Bicycle"
            ],
            "a": 0,
            "e": "Sàn gỗ và kiến trúc là nguyên bản, nhưng 'the furniture you see isn’t original' → đồ nội thất không phải nguyên bản.",
            "script": [
              {
                "s": "f",
                "t": "Welcome! I’m so glad you are interested in this beautiful property."
              },
              {
                "s": "f",
                "t": "This house was built in the 1920s and has maintained much of its original charm."
              },
              {
                "s": "f",
                "t": "The hardwood floors you see here are completely original, and they’ve been carefully preserved over the years."
              },
              {
                "s": "f",
                "t": "The same goes for the architecture - those high ceilings and detailed mouldings are a testament to the craftsmanship of that era."
              },
              {
                "s": "f",
                "t": "However, the furniture you see isn’t original. It was replaced a few years ago to give the home a more modern, functional feel.",
                "hl": 1
              },
              {
                "s": "f",
                "t": "But don’t worry, the updates blend well with the classic features, giving you the best of both worlds - historic charm with modern comfort."
              }
            ]
          },
          {
            "q": "What did she advise for people who lack motivation at work?",
            "o": [
              "Attend a time management workshop",
              "Request a transfer",
              "Take on additional responsibilities"
            ],
            "a": 1,
            "e": "'One option is to ask for a transfer to another branch' → xin chuyển sang chi nhánh khác.",
            "script": [
              {
                "s": "f",
                "t": "Many people feel unhappy at work, and often, they think a higher salary or less work will fix it. But that’s not always the solution."
              },
              {
                "s": "f",
                "t": "Sometimes, the problem is the work environment. A change of place can help improve how we feel at work."
              },
              {
                "s": "f",
                "t": "However, looking for a new job can be stressful and take time."
              },
              {
                "s": "f",
                "t": "One option is to ask for a transfer to another branch within the same company. This can offer the same benefits as getting a new job, without the challenges of starting over somewhere new.",
                "hl": 1
              }
            ]
          },
          {
            "q": "What time do they meet?",
            "o": [
              "6.30pm",
              "8.00pm",
              "7.00pm"
            ],
            "a": 0,
            "e": "'Are we still on for 6:30?' → gặp lúc 6 giờ 30 tối.",
            "script": [
              {
                "s": "m",
                "t": "Hey, I was just checking in to confirm what time we’re meeting up tonight. I know we’ve been talking about hanging out, but I wanted to make sure."
              },
              {
                "s": "m",
                "t": "Are we still on for 6:30? That time works great for me, so I just wanted to double-check if it’s good for you too.",
                "hl": 1
              },
              {
                "s": "m",
                "t": "Alright, looking forward to it. See you then!"
              }
            ]
          },
          {
            "q": "Where does she go shopping?",
            "o": [
              "at a new shopping mall",
              "at a department store",
              "at a local market"
            ],
            "a": 2,
            "e": "'I go to the local market near my house' → cô ấy đi chợ địa phương.",
            "script": [
              {
                "s": "f",
                "t": "I don’t really like big shopping malls because they are crowded and noisy, and department stores are far too expensive for me."
              },
              {
                "s": "f",
                "t": "So every weekend I go to the local market near my house, where I can buy fresh fruit and vegetables at good prices.",
                "hl": 1
              }
            ]
          },
          {
            "q": "What is her favorite thing to do in her spare time?",
            "o": [
              "watching a movie at home",
              "going to the theatre",
              "playing sports"
            ],
            "a": 1,
            "e": "'my favorite thing is going to the theatre' → thích đi xem kịch nhất.",
            "script": [
              {
                "s": "f",
                "t": "In my spare time I enjoy a few different things. Watching a movie at home is relaxing, and I sometimes play sports with friends."
              },
              {
                "s": "f",
                "t": "But my favorite thing is going to the theatre. I love watching live plays and musicals.",
                "hl": 1
              }
            ]
          },
          {
            "q": "Which sports is she good at?",
            "o": [
              "Running",
              "Swimming",
              "Football"
            ],
            "a": 2,
            "e": "'football is the one she’s really good at' → giỏi bóng đá.",
            "script": [
              {
                "s": "f",
                "t": "She’s always enjoyed sports, and football is the one she’s really good at.",
                "hl": 1
              },
              {
                "s": "f",
                "t": "She has great control over the ball and is quick on her feet, whether she’s playing with friends or in a competitive setting."
              }
            ]
          },
          {
            "q": "The woman is discussing her new exercise routine. How much time does she spend cycling?",
            "o": [
              "45 minutes",
              "35 minutes",
              "60 minutes"
            ],
            "a": 1,
            "e": "Đi bộ 15 phút, rồi 'cycle for 35 minutes' → đạp xe 35 phút.",
            "script": [
              {
                "s": "f",
                "t": "Lately, I’ve started a new routine that I’m really enjoying! I decided to involve more exercise into my life."
              },
              {
                "s": "f",
                "t": "So, I began by walking for about 15 minutes every day, just to get moving. After that, I hop on my bike and cycle for 35 minutes.",
                "hl": 1
              },
              {
                "s": "f",
                "t": "It’s been refreshing! I love how it helps me clear my mind after a busy day. I’m thinking of sticking with this habit for the long run!"
              }
            ]
          },
          {
            "q": "When do they meet each other?",
            "o": [
              "On Thursday morning",
              "On Wednesday morning",
              "On Monday morning"
            ],
            "a": 0,
            "e": "Thứ Ba không hợp, thứ Năm chiều bị trùng lớp → 'we settled on Thursday morning at 10 AM'.",
            "script": [
              {
                "s": "m",
                "t": "Hi Professor Smith, this is John calling about our meeting for the assignment. I wanted to confirm our appointment time. I know we discussed a few options earlier."
              },
              {
                "s": "m",
                "t": "At first, I thought we agreed on Tuesday morning, but then I remembered that doesn’t work with your schedule. Then I considered Thursday afternoon, but I have another class then."
              },
              {
                "s": "m",
                "t": "So, I’m pretty sure we settled on Thursday morning at 10 AM in your office. That’s what I have written down.",
                "hl": 1
              },
              {
                "s": "m",
                "t": "I’ll bring my draft and notes for the project. If I’ve got the day or time wrong, or if you need me to bring anything else, please let me know. Looking forward to discussing the assignment with you. Have a great day!"
              }
            ]
          },
          {
            "q": "A woman is calling her son. What time will the mother meet the son?",
            "o": [
              "Six o’clock",
              "Two o’clock",
              "Three o'clock"
            ],
            "a": 2,
            "e": "'we’ll meet at 3 o’clock when you finish school' → gặp lúc 3 giờ (4 giờ là câu lạc bộ, 5 giờ là bữa tối).",
            "script": [
              {
                "s": "f",
                "t": "Hi, sweetheart! I just wanted to tell you that we’ll meet at 3 o’clock when you finish school.",
                "hl": 1
              },
              {
                "s": "f",
                "t": "After that, I can take you to your soccer club at 4 o’clock. If you need anything, just let me know, and I can pick it up for you."
              },
              {
                "s": "f",
                "t": "Then, we can head out to dinner at 5 o’clock. Looking forward to seeing you!"
              }
            ]
          },
          {
            "q": "Jack is calling to invite a friend to his house. What color is Jack’s house?",
            "o": [
              "Black",
              "Red",
              "Green"
            ],
            "a": 1,
            "e": "Nhà hàng xóm nhiều màu tím, xanh, trắng, nhưng 'My house is big and red!' → nhà màu đỏ.",
            "script": [
              {
                "s": "m",
                "t": "Hey! It’s Jack. I just moved to a new house in this busy neighborhood, and it’s really cool!"
              },
              {
                "s": "m",
                "t": "There are so many houses here in different colors - purple, blue, and white. My house is big and red!",
                "hl": 1
              },
              {
                "s": "m",
                "t": "I’d love for you to come over and check it out. Let me know when you’re free!"
              }
            ]
          },
          {
            "q": "A man is talking about his daily routine. What does he do after work?",
            "o": [
              "Go home",
              "Go to the coffee shop",
              "Play football"
            ],
            "a": 2,
            "e": "'After work, I like to relax by playing football with my friends' → chơi bóng đá sau giờ làm.",
            "script": [
              {
                "s": "m",
                "t": "Every day, I wake up at 7 A.M. and have a quick breakfast before going to work. I usually take the bus, and it takes about 30 minutes to get to the office."
              },
              {
                "s": "m",
                "t": "At work, I spend most of my time on the computer, answering emails and working on projects. I have lunch at noon and get back to work until 5 P.M."
              },
              {
                "s": "m",
                "t": "After work, I like to relax by playing football with my friends. It’s a great way to stay active and have fun!",
                "hl": 1
              }
            ]
          },
          {
            "q": "A mom is talking to her son. What does the son like to study?",
            "o": [
              "Art",
              "Math",
              "Science"
            ],
            "a": 0,
            "e": "Mẹ khen 'Your art project looks amazing' và nhắc con học thêm toán, khoa học → con thích học mỹ thuật.",
            "script": [
              {
                "s": "f",
                "t": "Hey sweetheart, I’m so proud of you! Your art project looks amazing, you’re really talented.",
                "hl": 1
              },
              {
                "s": "f",
                "t": "I love how you used all those bright colors. You always do such a great job with your drawings.",
                "hl": 1
              },
              {
                "s": "f",
                "t": "But remember, you also need to spend some time on your other subjects too, like math and science. I know you can do well in those if you try hard, just like you do with art. Let’s work on it together, okay?"
              }
            ]
          },
          {
            "q": "How many weeks did they spend in India?",
            "o": [
              "Three weeks",
              "Two weeks",
              "One week"
            ],
            "a": 1,
            "e": "'they spent two weeks there' → hai tuần.",
            "script": [
              {
                "s": "f",
                "t": "They traveled to India for a short trip, and they spent two weeks there.",
                "hl": 1
              },
              {
                "s": "f",
                "t": "During that time, they explored different cities, experienced the local culture, and visited some famous landmarks. It was a quick but memorable visit."
              }
            ]
          }
        ]
      },
      {
        "type": "speakers",
        "title": "Part 2 · Câu 14",
        "instr": "Bốn người nói về cách bảo vệ môi trường. Chọn câu mô tả đúng nhất mỗi người. Có 2 lựa chọn thừa.",
        "topic": "Protecting the environment",
        "options": [
          "Reuses jars and bottles to store food",
          "Donates unwanted things to charity",
          "Always brings reusable bags to the market",
          "Doubts that giving away old things helps the environment",
          "Walks instead of driving to buy groceries",
          "Buys only eco-friendly products"
        ],
        "speakers": [
          {
            "a": 3,
            "e": "Người A: cho đồ cũ rồi lại mua đồ mới 'is a bit hypocritical' và 'causes double the harm', tự làm nước lau sàn từ chanh → nghi ngờ việc cho đồ cũ có giúp môi trường.",
            "script": [
              {
                "s": "f",
                "who": "A",
                "t": "I find the act of giving away old or secondhand items a bit hypocritical. Why do people give away their old things, only to go out and buy the same item but brand new?"
              },
              {
                "s": "f",
                "who": "A",
                "t": "Not only does this fail to protect the environment, but it also causes double the harm. Personally, I have a way of protecting the environment by not releasing harmful chemicals into it."
              },
              {
                "s": "f",
                "who": "A",
                "t": "I do this by not purchasing chemical cleaning solutions. Instead, I make use of natural products like lemons to create my own floor-cleaning solutions."
              }
            ]
          },
          {
            "a": 1,
            "e": "Người B: 'a better way is to donate them to charity organizations' → quyên góp đồ không dùng cho tổ chức từ thiện.",
            "script": [
              {
                "s": "m",
                "who": "B",
                "t": "I often don’t have time to think about how to reuse my belongings or clothes, but I don’t want to throw them away because that would be wasteful."
              },
              {
                "s": "m",
                "who": "B",
                "t": "So, I think a better way is to donate them to charity organizations or give them to others. Many people are in need of these things, and giving away my old items also makes me feel happier because I’m helping others."
              }
            ]
          },
          {
            "a": 5,
            "e": "Người C: ít có thời gian chuẩn bị túi và vẫn lái xe, nhưng 'I have a principle of only buying eco-friendly products' → chỉ mua sản phẩm thân thiện môi trường.",
            "script": [
              {
                "s": "f",
                "who": "C",
                "t": "A good way to protect the environment is by not using plastic bags or by bringing reusable bags when going to the market, which helps reduce the disposal of plastic bags, a material that is difficult to decompose."
              },
              {
                "s": "f",
                "who": "C",
                "t": "However, I’m a very busy person and rarely have time to prepare my own bags when going shopping, and I usually drive to buy groceries quickly instead of walking. I guess I can’t protect the environment by not driving."
              },
              {
                "s": "f",
                "who": "C",
                "t": "But I have a principle of only buying eco-friendly products, so I think I’m still contributing in a small way to protecting the Earth."
              }
            ]
          },
          {
            "a": 0,
            "e": "Người D: 'I can reuse them to store food' (hũ thủy tinh, chai nhựa) → tái sử dụng hũ, chai để đựng thực phẩm.",
            "script": [
              {
                "s": "m",
                "who": "D",
                "t": "I see that too many people are wasting food containers, as they often throw them away after use, such as glass jars or plastic bottles."
              },
              {
                "s": "m",
                "who": "D",
                "t": "I can reuse them to store food and neatly organize them in my refrigerator. Reusing these containers is a very easy way to protect the environment that anyone can do."
              }
            ]
          }
        ]
      },
      {
        "type": "conv",
        "title": "Part 3 · Câu 15",
        "instr": "Nghe hai người thảo luận về công việc và công nghệ. Ai bày tỏ ý kiến sau: người đàn ông (Man), người phụ nữ (Woman) hay cả hai (Both)?",
        "topic": "Work and technology",
        "script": [
          {
            "s": "f",
            "t": "I’m thinking about switching to another job."
          },
          {
            "s": "m",
            "t": "Why? Your current job is very stable."
          },
          {
            "s": "f",
            "t": "I think I should try my hand at different fields. The jobs I take should only last around 1-2 years. I don’t like staying too long in one job or with one company; that would be really boring. Nowadays, many companies offer temporary jobs, which allows me to try out different fields."
          },
          {
            "s": "m",
            "t": "Oh, but if you stay longer at one company, they might offer you more opportunities for career advancement. I always want to stay long-term with a company that suits me."
          },
          {
            "s": "f",
            "t": "Nowadays, young people who have just graduated from university are very talented and have many qualifications. I’m afraid that if I stick with one job and don’t change to accumulate knowledge in various fields, it will be hard to compete with these young, talented people."
          },
          {
            "s": "m",
            "t": "We also need to consider job satisfaction. If we do well, we need to be encouraged and motivated. That helps employees feel that their efforts and contributions to the company are worthwhile."
          },
          {
            "s": "f",
            "t": "You’re absolutely right, I couldn’t agree more. In this age of technological advancement, many jobs have been replaced by machines. More and more people are losing their jobs due to the development of technology and engineering. I think this is a concerning issue."
          },
          {
            "s": "m",
            "t": "I don’t think so. Technology is helping us do our work more quickly, easily, and conveniently than ever. If we know how to leverage technology in our jobs, productivity will increase significantly, which in turn helps develop the economy and society."
          }
        ],
        "statements": [
          {
            "q": "Changing jobs often is a good way to gain experience in different fields.",
            "a": "Woman",
            "e": "Người phụ nữ: 'try my hand at different fields' và không muốn ở lâu một công ty; người đàn ông phản đối vì muốn gắn bó lâu dài."
          },
          {
            "q": "Staying with one company for a long time can bring better career opportunities.",
            "a": "Man",
            "e": "Người đàn ông: 'if you stay longer at one company, they might offer you more opportunities for career advancement'; người phụ nữ không đồng ý."
          },
          {
            "q": "Employees should be encouraged for their efforts.",
            "a": "Both",
            "e": "Người đàn ông: 'we need to be encouraged and motivated'; người phụ nữ đáp 'You’re absolutely right, I couldn’t agree more' → cả hai."
          },
          {
            "q": "Technology can make people much more productive.",
            "a": "Man",
            "e": "Người đàn ông: 'productivity will increase significantly'; người phụ nữ chỉ lo máy móc làm mất việc."
          }
        ]
      },
      {
        "type": "mono",
        "title": "Part 4 · Câu 16–17",
        "instr": "Nghe bài nói và trả lời 2 câu hỏi cho mỗi bài.",
        "talks": [
          {
            "topic": "Travel after high school",
            "script": [
              {
                "s": "m",
                "t": "After completing high school, many of my friends chose to go directly to university, while I opted for a different direction."
              },
              {
                "s": "m",
                "t": "Honestly, I didn’t feel prepared to begin higher education at that time; I needed some time away from studying to refresh my mind."
              },
              {
                "s": "m",
                "t": "Rather than signing up for courses, I spent the following two years traveling throughout Asia and Europe."
              },
              {
                "s": "m",
                "t": "For me, it wasn’t simply a holiday; I wanted to gain practical experience and explore different perspectives before eventually returning to my studies."
              }
            ],
            "questions": [
              {
                "q": "Why hasn’t he gone to college?",
                "o": [
                  "He wasn’t ready to start higher education",
                  "He couldn’t afford the tuition fees.",
                  "He didn’t get good enough grades"
                ],
                "a": 0,
                "e": "'I didn’t feel prepared to begin higher education' → anh chưa sẵn sàng học lên cao."
              },
              {
                "q": "Why did he decide to travel for 2 years?",
                "o": [
                  "To gain life experience.",
                  "To avoid studying.",
                  "To earn money abroad."
                ],
                "a": 0,
                "e": "'I wanted to gain practical experience' và khám phá góc nhìn mới → để tích lũy trải nghiệm sống."
              }
            ]
          },
          {
            "topic": "A book about the life of a scientist",
            "script": [
              {
                "s": "f",
                "t": "I’ve just completed a new biography about a well-known physicist, and it’s truly impressive."
              },
              {
                "s": "f",
                "t": "What makes it engaging is the author’s style, which explains complicated ideas in a clear and simple way, allowing even readers without a scientific background to understand it."
              },
              {
                "s": "f",
                "t": "The book has already become a bestseller. Many specialists think its popularity comes from its similarity to the earlier book about the same scientist, which was also highly successful."
              },
              {
                "s": "f",
                "t": "If you liked the previous one, you’ll certainly find this new book worth reading."
              }
            ],
            "questions": [
              {
                "q": "Why do many readers find the book interesting?",
                "o": [
                  "It uses simple language to describe complex ideas.",
                  "It relies heavily on technical vocabulary.",
                  "It avoids explaining abstract concepts."
                ],
                "a": 0,
                "e": "'explains complicated ideas in a clear and simple way' → giải thích ý phức tạp bằng ngôn ngữ đơn giản."
              },
              {
                "q": "Why is the book so popular?",
                "o": [
                  "It is similar to the previous book about the scientist.",
                  "It is too long.",
                  "It is too difficult to understand."
                ],
                "a": 0,
                "e": "'its similarity to the earlier book about the same scientist' → giống cuốn trước vốn rất thành công."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "l5",
    "title": "Đề 5 — Environment and beauty",
    "parts": [
      {
        "type": "mcq",
        "title": "Part 1 · Câu 1–13",
        "instr": "Nghe đoạn ngắn và chọn đáp án đúng. Mỗi đoạn nghe tối đa 2 lần.",
        "items": [
          {
            "q": "Doctor's office is calling about a change in the appointment. When is the new appointment?",
            "o": [
              "Thursday 13th",
              "Friday 14th",
              "Wednesday 12th"
            ],
            "a": 0,
            "e": "'the new appointment is on Thursday the 13th' → ngày 14 là ngày nghỉ nên dời sang thứ Năm 13.",
            "script": [
              {
                "s": "f",
                "t": "Hello! This is the doctor's office calling to change your appointment."
              },
              {
                "s": "f",
                "t": "I wanted to let you know that the new appointment is on Thursday the 13th.",
                "hl": 1
              },
              {
                "s": "f",
                "t": "I understand you might have been expecting it to be on Friday the 14th, but we're all off this day due to the national holiday. Please let us know if that works for you!"
              }
            ]
          },
          {
            "q": "A man is ordering a drink. What does he want?",
            "o": [
              "Water",
              "Iced tea",
              "Beer"
            ],
            "a": 1,
            "e": "Anh ấy cân nhắc bia và nước nhưng chốt 'I'll go with an iced tea' → trà đá.",
            "script": [
              {
                "s": "m",
                "t": "Hi there! I'm really thirsty. Can I have a drink, please?"
              },
              {
                "s": "m",
                "t": "I was thinking about getting a beer, but it's a bit too early for that. Water sounds good, but I'm in the mood for something cooler."
              },
              {
                "s": "m",
                "t": "I'll go with an iced tea, please. That sounds perfect for this weather!",
                "hl": 1
              }
            ]
          },
          {
            "q": "An author is talking about her daily routine. When does she usually write?",
            "o": [
              "In the afternoons",
              "In the mornings",
              "At night"
            ],
            "a": 0,
            "e": "Buổi sáng chạy bộ; 'After lunch, at around two o'clock, I sit down at my working table, ready to write' → viết vào buổi chiều.",
            "script": [
              {
                "s": "f",
                "t": "Every morning, I start my day by going for a run. It helps me clear my mind and gives me energy."
              },
              {
                "s": "f",
                "t": "After lunch, at around two o'clock, I sit down at my working table, ready to write.",
                "hl": 1
              },
              {
                "s": "f",
                "t": "My husband is my best critic, so I try to produce something before he gets home in the afternoon."
              }
            ]
          },
          {
            "q": "How does the speaker's uncle travel these days?",
            "o": [
              "By car",
              "By plane",
              "By train"
            ],
            "a": 2,
            "e": "'these days he always goes by train' → hiện nay ông ấy luôn đi bằng tàu hỏa (trước đây lái xe, thỉnh thoảng đi máy bay).",
            "script": [
              {
                "s": "f",
                "t": "My uncle travels a lot for work. He used to drive, and he has flown a few times."
              },
              {
                "s": "f",
                "t": "But these days he always goes by train, because he loves the scenic views.",
                "hl": 1
              }
            ]
          },
          {
            "q": "A woman is talking about her usual Saturday routine. What does she usually do on Saturdays?",
            "o": [
              "Goes shopping",
              "Sees her family",
              "Goes to a birthday party"
            ],
            "a": 1,
            "e": "'on Saturdays, I spend the day with my family' → thường ở bên gia đình; mua sắm và sinh nhật chỉ là kế hoạch tuần này.",
            "script": [
              {
                "s": "f",
                "t": "Normally, on Saturdays, I spend the day with my family.",
                "hl": 1
              },
              {
                "s": "f",
                "t": "We like to have brunch together and then do some fun activities, like playing board games or going for a walk. It's a nice way to relax and catch up."
              },
              {
                "s": "f",
                "t": "But this week, I have something different planned. I'm going to see a friend for her birthday and go shopping together instead. I'm looking forward to it, but I know I'll miss our usual family time!"
              }
            ]
          },
          {
            "q": "A man is talking about his family trip. What does the man's wife enjoy?",
            "o": [
              "Photography",
              "Shopping",
              "Hiking"
            ],
            "a": 0,
            "e": "'My wife really enjoys photography' → vợ thích chụp ảnh (không mê mua sắm).",
            "script": [
              {
                "s": "m",
                "t": "On our family trip last summer, we had such a great time!"
              },
              {
                "s": "m",
                "t": "My wife really enjoys photography. So, when we went walking together in the parks, she spent a lot of time taking pictures of the beautiful landscapes.",
                "hl": 1
              },
              {
                "s": "m",
                "t": "Well, at least she is not crazy about shopping."
              }
            ]
          },
          {
            "q": "A woman is talking about her job. What encouraged her to become a scientist?",
            "o": [
              "Her computer",
              "Her mother",
              "A large stone"
            ],
            "a": 2,
            "e": "'I found a large stone during a school trip' khơi dậy sự tò mò → 'that stone was the beginning'.",
            "script": [
              {
                "s": "f",
                "t": "I've always loved science, but there was a moment that really encouraged me to become a scientist."
              },
              {
                "s": "f",
                "t": "I remember when I was a child, I found a large stone during a school trip. It sparked my curiosity about geology.",
                "hl": 1
              },
              {
                "s": "f",
                "t": "My mother also inspired me to explore my interests in science. Of course, I use the computer a lot now for my research, but that stone was the beginning."
              }
            ]
          },
          {
            "q": "Listen to the speaker talking about their weekly schedule. When is the meeting scheduled?",
            "o": [
              "Monday morning",
              "Friday afternoon",
              "Wednesday afternoon"
            ],
            "a": 2,
            "e": "'the meeting on Wednesday afternoon' → họp chiều thứ Tư (thường là thứ Hai nhưng đã đổi).",
            "script": [
              {
                "s": "m",
                "t": "This week is pretty busy, but the most important thing is the meeting on Wednesday afternoon.",
                "hl": 1
              },
              {
                "s": "m",
                "t": "We usually have it on Monday, but this time we had to change the day. Wednesday works better because everyone is free."
              },
              {
                "s": "m",
                "t": "I have a lot to prepare before then, so I'll spend Tuesday getting everything ready. It's a big meeting, and we need to finalize some plans. I'm just glad it's not on Friday, or I'd be too tired!"
              }
            ]
          },
          {
            "q": "A man is reading the news about a housing development plan. How many new houses are going to be built?",
            "o": [
              "1500",
              "2000",
              "2500"
            ],
            "a": 1,
            "e": "'the local authority is planning to build 2000 new houses' → 2000 căn (1500 là con số ban đầu, 2500 chỉ là tin đồn).",
            "script": [
              {
                "s": "m",
                "t": "I just heard the news that the local authority is planning to build 2000 new houses!",
                "hl": 1
              },
              {
                "s": "m",
                "t": "I remember they were initially saying it would only be 1500. But then I heard someone mention 2500! That's quite a jump."
              },
              {
                "s": "m",
                "t": "I wonder how this will affect the neighborhood. Will it bring in more families or just more traffic? It'll be interesting to see how it all unfolds."
              }
            ]
          },
          {
            "q": "Listen to a writer talking about her job. What is her first job?",
            "o": [
              "Writer",
              "Librarian",
              "Teacher"
            ],
            "a": 2,
            "e": "'My first job was actually as a teacher' → công việc đầu tiên là giáo viên.",
            "script": [
              {
                "s": "f",
                "t": "When I was younger, I didn't always dream of being a writer."
              },
              {
                "s": "f",
                "t": "My first job was actually as a teacher. I taught English to small children, and I loved helping them learn to read and write.",
                "hl": 1
              },
              {
                "s": "f",
                "t": "It wasn't easy, though. I spent a lot of time grading papers and preparing lessons. But that job taught me how to use words well, and now I write stories for everyone to enjoy."
              }
            ]
          },
          {
            "q": "Listen to Mary talking to Jane while waiting for James. What did they decide to do?",
            "o": [
              "Cancel the meeting",
              "Have the meeting without him",
              "Wait for him longer"
            ],
            "a": 1,
            "e": "'we could have the meeting without him' ... 'So let's go ahead' → họp mà không có James.",
            "script": [
              {
                "s": "f",
                "t": "Hi, Jane! It looks like James is running late again. I'm starting to wonder if we should wait for him. I don't want to waste too much time."
              },
              {
                "s": "f",
                "t": "I feel like we could have the meeting without him. We have a lot to discuss, and we can always update him later.",
                "hl": 1
              },
              {
                "s": "f",
                "t": "I think it's better to move forward instead of just waiting. So let's go ahead.",
                "hl": 1
              }
            ]
          },
          {
            "q": "A woman is talking to her coworker. When does the meeting start?",
            "o": [
              "10.15",
              "10.30",
              "9.45"
            ],
            "a": 0,
            "e": "'the meeting with the clients at 10:15 like we planned' → cuộc họp bắt đầu lúc 10:15.",
            "script": [
              {
                "s": "f",
                "t": "Hey, just wanted to give you a quick heads-up. I won't be able to join the meeting with the clients at 10:15 like we planned - I've got something that suddenly came up.",
                "hl": 1
              },
              {
                "s": "f",
                "t": "I know it's last minute, but could you go ahead and handle the presentation on your own? You're familiar with everything, so I trust you've got this. Let me know how it goes afterward. Thanks, I really appreciate it!"
              }
            ]
          },
          {
            "q": "Vincent is calling James. Why does Vincent call James?",
            "o": [
              "Invite him to a party",
              "Suggest a drink",
              "Ask for help"
            ],
            "a": 1,
            "e": "'How about we grab a drink later?' → rủ đi uống nước.",
            "script": [
              {
                "s": "m",
                "t": "Hi James, it's Vincent. I just want to check in and see how you're doing. It's been a while since we last caught up!"
              },
              {
                "s": "m",
                "t": "How about we grab a drink later? I know a great new place that has very nice tea.",
                "hl": 1
              },
              {
                "s": "m",
                "t": "You should definitely try it next time you visit me. Text me back!"
              }
            ]
          }
        ]
      },
      {
        "type": "speakers",
        "title": "Part 2 · Câu 14",
        "instr": "Bốn người nói về hành động bảo vệ môi trường. Chọn câu mô tả đúng nhất mỗi người. Có 2 lựa chọn thừa.",
        "topic": "Environmental actions",
        "options": [
          "Cycles to work instead of driving",
          "Shops online to avoid driving to the supermarket",
          "Recycles all household rubbish",
          "Joins volunteer clean-up days",
          "Is trying to use less electricity to save money",
          "Thinks small daily habits such as saving water matter most"
        ],
        "speakers": [
          {
            "a": 1,
            "e": "Người A: 'I usually shop online to reduce the need to drive to the supermarket' → mua sắm trực tuyến để khỏi lái xe.",
            "script": [
              {
                "s": "f",
                "who": "A",
                "t": "I usually shop online to reduce the need to drive to the supermarket, which produces harmful emissions for the environment. Additionally, I can avoid using plastic bags for groceries when shopping in person."
              },
              {
                "s": "f",
                "who": "A",
                "t": "By simply sitting at home and clicking a few buttons, I can buy everything I want without emitting harmful gases from a car."
              }
            ]
          },
          {
            "a": 0,
            "e": "Người B: 'I chose to ride a bicycle to work' thay vì lái xe cá nhân → đạp xe đi làm.",
            "script": [
              {
                "s": "m",
                "who": "B",
                "t": "I used to drive to work for a long period, but then I realized that the excessive use of personal cars contributes significantly to environmental pollution."
              },
              {
                "s": "m",
                "who": "B",
                "t": "Therefore, I chose to ride a bicycle to work, which benefits both the environment and my health."
              }
            ]
          },
          {
            "a": 4,
            "e": "Người C: không quan tâm môi trường nhưng hóa đơn điện đắt nên 'I'll have to manage my electricity use more efficiently' → tiết kiệm điện để đỡ tốn tiền.",
            "script": [
              {
                "s": "f",
                "who": "C",
                "t": "I'm not that into environmental protection and usually just do what's convenient for me."
              },
              {
                "s": "f",
                "who": "C",
                "t": "But my electric bill last month shocked me because it was so expensive, and I realized that I needed to save money. So from now on, I'll have to manage my electricity use more efficiently."
              }
            ]
          },
          {
            "a": 5,
            "e": "Người D: cho rằng nên tập trung vào 'small daily actions we often overlook', ví dụ tắt vòi nước khi đánh răng → thói quen nhỏ hằng ngày quan trọng nhất.",
            "script": [
              {
                "s": "m",
                "who": "D",
                "t": "I think a lot of people overemphasize protecting the environment by cutting down on personal vehicles, avoiding plastic bags, planting a lot of trees, and so on."
              },
              {
                "s": "m",
                "who": "D",
                "t": "But I personally believe we should focus on protecting the environment through small daily actions we often overlook. For example, turning off the water while brushing our teeth or washing our hands. If everyone saves a little water like that, it would add up to a huge amount saved globally."
              }
            ]
          }
        ]
      },
      {
        "type": "conv",
        "title": "Part 3 · Câu 15",
        "instr": "Nghe hai người thảo luận về khái niệm cái đẹp. Ai bày tỏ ý kiến sau: người đàn ông (Man), người phụ nữ (Woman) hay cả hai (Both)?",
        "topic": "The concept of beauty",
        "script": [
          {
            "s": "f",
            "t": "Hi, what are you reading?"
          },
          {
            "s": "m",
            "t": "I'm reading an article about the concept of beauty."
          },
          {
            "s": "f",
            "t": "Oh really, that sounds interesting. Beauty is something that can't be defined because everyone has a different perspective on it, right?"
          },
          {
            "s": "m",
            "t": "Actually, people have quite similar perspectives on beauty. We always prefer beautiful things and are drawn to them."
          },
          {
            "s": "f",
            "t": "Beauty in the past and now is very different. The older generation might see traditional things as beautiful, while the younger generation considers unique and unconventional things as beautiful. So, not everyone has the same view on beauty."
          },
          {
            "s": "m",
            "t": "Beauty can be found in many places we wouldn't expect, or even within something considered ugly, there's always some beauty present. So, nothing in the world is entirely ugly."
          },
          {
            "s": "f",
            "t": "Exactly. That's why the definition of beauty is constantly changing. In a few decades, people might find things beautiful that we once considered ugly."
          },
          {
            "s": "m",
            "t": "That's one perspective. Let's wait and see how it changes."
          }
        ],
        "statements": [
          {
            "q": "Beauty cannot be defined because everyone sees it differently.",
            "a": "Woman",
            "e": "Người phụ nữ: 'Beauty is something that can't be defined because everyone has a different perspective'; người đàn ông phản bác 'people have quite similar perspectives'."
          },
          {
            "q": "People are naturally drawn to beautiful things.",
            "a": "Man",
            "e": "Người đàn ông: 'We always prefer beautiful things and are drawn to them'; người phụ nữ không nói ý này."
          },
          {
            "q": "Nothing in the world is entirely ugly.",
            "a": "Both",
            "e": "Người đàn ông: 'nothing in the world is entirely ugly'; người phụ nữ đáp 'Exactly' → cả hai đồng ý."
          },
          {
            "q": "Younger people often see unconventional things as beautiful.",
            "a": "Woman",
            "e": "Người phụ nữ: 'the younger generation considers unique and unconventional things as beautiful'; người đàn ông không nhắc đến."
          }
        ]
      },
      {
        "type": "mono",
        "title": "Part 4 · Câu 16–17",
        "instr": "Nghe bài nói và trả lời 2 câu hỏi cho mỗi bài.",
        "talks": [
          {
            "topic": "The sport",
            "script": [
              {
                "s": "m",
                "t": "While most people praise the benefits of exercise, I have a somewhat different view on professional competitive sports."
              },
              {
                "s": "m",
                "t": "In my experience, when sports become too intense or commercialized, they can actually have a harmful effect on both the players' health and the spirit of fair play."
              },
              {
                "s": "m",
                "t": "However, my opinion changes when it comes to education. I believe that engaging in physical activity is essential for those in school because it helps balance student's lives."
              },
              {
                "s": "m",
                "t": "It provides a much-needed break from long hours of academic pressure and keeps them mentally grounded."
              }
            ],
            "questions": [
              {
                "q": "What does the speaker say about intense, commercialized professional sports?",
                "o": [
                  "They have a harmful effect",
                  "They bring people together",
                  "They improve concentration"
                ],
                "a": 0,
                "e": "'they can actually have a harmful effect' → thể thao quá cường độ, thương mại hóa gây hại cho sức khỏe và tinh thần fair play."
              },
              {
                "q": "What is the importance of sports for students?",
                "o": [
                  "It helps balance student's lives.",
                  "It distracts students from studying.",
                  "It is only useful for professional athletes."
                ],
                "a": 0,
                "e": "'engaging in physical activity is essential for those in school' vì giúp cân bằng cuộc sống của học sinh."
              }
            ]
          },
          {
            "topic": "Television series",
            "script": [
              {
                "s": "f",
                "t": "In the world of entertainment, very few shows manage to capture the public's imagination like the one we are discussing today."
              },
              {
                "s": "f",
                "t": "While many shows start with a great premise but fail to keep the momentum, the reason this particular show has become a global phenomenon is that it has the consistent quality throughout every single season."
              },
              {
                "s": "f",
                "t": "From the very first episode to the grand finale, the writing, acting, and production values never drop, ensuring that fans stay engaged for years."
              },
              {
                "s": "f",
                "t": "However, this success doesn't happen in a vacuum. If we look at the bigger picture, the entire television landscape is undergoing a massive transformation."
              },
              {
                "s": "f",
                "t": "Experts have noted that the current series industry is heavily affected by how audiences consume content. In fact, viewer habits influence the way that series are made more than ever before."
              },
              {
                "s": "f",
                "t": "With the rise of streaming platforms and the trend of binge-watching, producers and directors are now forced to adapt their storytelling techniques and release schedules to match the specific preferences and behaviors of the modern viewer."
              }
            ],
            "questions": [
              {
                "q": "Why is this series so popular?",
                "o": [
                  "It has the consistent quality throughout.",
                  "It was only available for a short time.",
                  "It features unknown actors."
                ],
                "a": 0,
                "e": "'it has the consistent quality throughout every single season' → chất lượng đồng đều suốt mọi mùa."
              },
              {
                "q": "What is the current series industry affected by?",
                "o": [
                  "Viewer habits influence the way that series are made.",
                  "Series are no longer produced for online platforms.",
                  "Actors now write most of the scripts themselves."
                ],
                "a": 0,
                "e": "'viewer habits influence the way that series are made' → thói quen xem của khán giả ảnh hưởng cách làm phim."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "l6",
    "title": "Đề 6 — Music habits and technology",
    "parts": [
      {
        "type": "mcq",
        "title": "Part 1 · Câu 1–13",
        "instr": "Nghe đoạn ngắn và chọn đáp án đúng. Mỗi đoạn nghe tối đa 2 lần.",
        "items": [
          {
            "q": "Listen to the instructions of a university. Where is the main office?",
            "o": [
              "in the basement",
              "on the first floor",
              "on the second floor"
            ],
            "a": 1,
            "e": "'the main office is on the first floor of the center campus building' → văn phòng chính ở tầng một.",
            "script": [
              {
                "s": "f",
                "t": "Welcome to our university! When you enter the campus, you'll see the library on your left and the cafeteria on your right."
              },
              {
                "s": "f",
                "t": "If you need help with anything, the main office is on the first floor of the center campus building. There, you can ask about classes, schedules, or anything else.",
                "hl": 1
              },
              {
                "s": "f",
                "t": "Behind the main building, you'll find the gym and sports area. For quiet study, there are some nice spots in the garden near the science building. Make sure to explore and enjoy your time here!"
              }
            ]
          },
          {
            "q": "How much can Max pay for the computer?",
            "o": [
              "200 pounds",
              "250 pounds",
              "300 pounds"
            ],
            "a": 1,
            "e": "'I can pay 250 pounds' → Max trả được 250 bảng.",
            "script": [
              {
                "s": "m",
                "t": "Hi, it's me Max. I'm calling about the computer that you are selling. You see. My computer is old and slow. I can't play any games on it any more and would like to replace it with a new one."
              },
              {
                "s": "m",
                "t": "How much do you offer? I can pay 250 pounds.",
                "hl": 1
              },
              {
                "s": "m",
                "t": "This afternoon I am busy but we can discuss this tomorrow morning. Is that okay? Call me back soon."
              }
            ]
          },
          {
            "q": "Where does he want to go tomorrow?",
            "o": [
              "The park",
              "The cinema",
              "The town hall"
            ],
            "a": 2,
            "e": "'the town hall is where he wants to go' → anh ấy muốn đến tòa thị chính.",
            "script": [
              {
                "s": "f",
                "t": "He has some important things to discuss tomorrow, and the town hall is where he wants to go, as it's the perfect place for the meeting and gathering more information.",
                "hl": 1
              }
            ]
          },
          {
            "q": "What will they bring to the picnic?",
            "o": [
              "Drinks",
              "Food",
              "Snacks"
            ],
            "a": 1,
            "e": "Đồ uống và đồ ăn vặt đã có người mang; hai người quyết định 'prepare some chicken and french fries' → mang đồ ăn.",
            "script": [
              {
                "s": "m",
                "t": "Hey, Emma, are you ready for the picnic this weekend?"
              },
              {
                "s": "f",
                "t": "Definitely! I'm really looking forward to it. Do you know what everyone's bringing?"
              },
              {
                "s": "m",
                "t": "Yeah, I spoke with a few people. Sarah's bringing cups and bowls, and Tom said he'll take care of drinks. He's got some lemonade and iced tea ready."
              },
              {
                "s": "f",
                "t": "Sounds great! I think Clara mentioned she's making a fruit salad, right?"
              },
              {
                "s": "m",
                "t": "Yep, and Leo's bringing chips and dips. I guess we're pretty covered on snacks."
              },
              {
                "s": "f",
                "t": "Awesome! So, what should we bring? Maybe some food in case we might get hungry?"
              },
              {
                "s": "m",
                "t": "That's a good idea. How about we prepare some chicken and french fries?",
                "hl": 1
              },
              {
                "s": "f",
                "t": "Perfect! This picnic is going to be amazing!"
              }
            ]
          },
          {
            "q": "How many people live in the town?",
            "o": [
              "5,000",
              "10,000",
              "20,000"
            ],
            "a": 1,
            "e": "'there are 10,000 people living in this town' → 10.000 người.",
            "script": [
              {
                "s": "f",
                "t": "Welcome, everyone! Today, I'm excited to introduce you to our charming small town."
              },
              {
                "s": "f",
                "t": "Right here in the town square, you'll find local shops, cozy cafes, and a beautiful fountain where people gather to relax. This square is the heart of our community, often filled with cool events like farmers' markets and live music."
              },
              {
                "s": "f",
                "t": "Currently, there are 10,000 people living in this town. As we explore, you'll see the unique blend of history and modern life that makes our town so special.",
                "hl": 1
              }
            ]
          },
          {
            "q": "Where are they going to meet?",
            "o": [
              "at the park",
              "at the station",
              "at the university"
            ],
            "a": 0,
            "e": "'Let's stick to the park' (ga quá đông, trường quá xa) → gặp ở công viên.",
            "script": [
              {
                "s": "f",
                "t": "Hi, it's me! I wanted to confirm where we're meeting today. I thought we agreed to meet at the park, right? It's a nice place to relax and catch up.",
                "hl": 1
              },
              {
                "s": "f",
                "t": "The station would be too crowded, and the university is a bit far for me. Let's stick to the park so we can enjoy the weather. What time should I meet you there?",
                "hl": 1
              }
            ]
          },
          {
            "q": "What color top is he going to buy?",
            "o": [
              "Green",
              "Red",
              "Black"
            ],
            "a": 2,
            "e": "Áo xanh dương chỉ còn size nhỏ, 'Red is not my cup of tea' → anh chọn 'the other option' là áo đen (size L).",
            "script": [
              {
                "s": "m",
                "t": "Hello, I would like to buy a top, please."
              },
              {
                "s": "f",
                "t": "Sure, do you have anything particular in mind?"
              },
              {
                "s": "m",
                "t": "I like the design of that green one over there. Do you have it in blue?"
              },
              {
                "s": "f",
                "t": "Maybe. What size are you?"
              },
              {
                "s": "m",
                "t": "I am wearing large."
              },
              {
                "s": "f",
                "t": "Let me see. Ohh. We have that one in blue but small. The red and black ones, however, are available in large."
              },
              {
                "s": "m",
                "t": "Red is not my cup of tea. Well, I will go with the other option then.",
                "hl": 1
              }
            ]
          },
          {
            "q": "What career did he choose?",
            "o": [
              "to work in business",
              "to become a teacher",
              "to become a researcher"
            ],
            "a": 0,
            "e": "Bạn học toán là doanh nhân nên 'I guess that would be my choice then'; anh không hợp làm giáo viên → chọn kinh doanh.",
            "script": [
              {
                "s": "f",
                "t": "Welcome, how may I help you?"
              },
              {
                "s": "m",
                "t": "Yes, I would like to have some advice for my future job. I majored in Mathematics. Is there anything that I could do?"
              },
              {
                "s": "f",
                "t": "Well, there are a variety of career paths you can take, let say becoming a teacher, a businessman, or continue to study higher to become a researcher."
              },
              {
                "s": "m",
                "t": "I have a friend who also majors in Mathematics and he is now a businessman with his own company. I guess that would be my choice then. I am not suitable to become a teacher since I think I am a bit impatient.",
                "hl": 1
              }
            ]
          },
          {
            "q": "When is the assignment due?",
            "o": [
              "on Friday",
              "on Saturday",
              "on Sunday"
            ],
            "a": 1,
            "e": "'it's due on Saturday' → hạn nộp thứ Bảy.",
            "script": [
              {
                "s": "f",
                "t": "The assignment needs to be submitted soon, and it's due on Saturday.",
                "hl": 1
              },
              {
                "s": "f",
                "t": "Make sure to finish it by then to avoid any last-minute stress."
              }
            ]
          },
          {
            "q": "What course is the student going to take this year?",
            "o": [
              "English",
              "Math",
              "Computer"
            ],
            "a": 2,
            "e": "Năm ngoái học tiếng Anh, toán, khoa học; 'This year ... I'm going to take a computer course' → khóa tin học.",
            "script": [
              {
                "s": "m",
                "t": "Hi, I'm Ben, and I want to share a bit about my studies. Last term, I took English, math, and science. They were all interesting, but math was a bit tough for me. I worked hard, though, and got good results in the end."
              },
              {
                "s": "m",
                "t": "This year, I'm really excited because I'm going to take a computer course.",
                "hl": 1
              },
              {
                "s": "m",
                "t": "I've always wanted to learn more about technology, so I'm looking forward to it!"
              }
            ]
          },
          {
            "q": "What did she like best about the film?",
            "o": [
              "the mountain scenes",
              "the action scenes",
              "the ending"
            ],
            "a": 0,
            "e": "Không thích cảnh hành động; 'The mountain scenes were rather unusual' và lôi cuốn nhất; kết thúc hơi buồn → thích nhất cảnh núi.",
            "script": [
              {
                "s": "f",
                "t": "The Fall is one of my favorite films, which I saw last weekend. The film was so terrific that it kept me on the edge of my seat all the time."
              },
              {
                "s": "f",
                "t": "I usually don't like watching action movies as they feel the same and repetitive with those dull racing car scenes and meaningless fights that go on for hours."
              },
              {
                "s": "f",
                "t": "The mountain scenes were rather unusual. The sequencing fascinatingly brings out the most captivating parts for me.",
                "hl": 1
              },
              {
                "s": "f",
                "t": "The ending, however, was a bit sad. Many people wish it was a happy ending."
              }
            ]
          },
          {
            "q": "What elements of the film do they agree on?",
            "o": [
              "the soundtrack",
              "the characters",
              "the ending"
            ],
            "a": 2,
            "e": "Cả hai khen kết thúc ('The ending was so satisfying' / 'It wrapped everything up perfectly'); nhân vật và nhạc thì bất đồng.",
            "script": [
              {
                "s": "m",
                "t": "I just finished watching that film we talked about. What did you think?"
              },
              {
                "s": "f",
                "t": "I loved it! The ending was so satisfying!",
                "hl": 1
              },
              {
                "s": "m",
                "t": "Absolutely! It wrapped everything up perfectly. But I wasn't really sold on the characters.",
                "hl": 1
              },
              {
                "s": "f",
                "t": "Really? I thought the characters were great and well developed!"
              },
              {
                "s": "m",
                "t": "I felt they were a bit cliché, especially the main character. But I really love the soundtrack."
              },
              {
                "s": "f",
                "t": "Honestly, I didn't like the music at all. It felt out of place."
              }
            ]
          },
          {
            "q": "Why does Douglas call Kay?",
            "o": [
              "to invite her to a party",
              "to say thank you",
              "to cancel a meeting"
            ],
            "a": 1,
            "e": "'I wanted to call you today to say thank you for all your help with the project' → gọi để cảm ơn.",
            "script": [
              {
                "s": "m",
                "t": "Hi, Kay! It's Douglas. I hope you are doing well."
              },
              {
                "s": "m",
                "t": "I wanted to call you today to say thank you for all your help with the project. Your advice was really valuable, and it made a big difference.",
                "hl": 1
              },
              {
                "s": "m",
                "t": "I also wanted to ask for a favor. If you have some time, I would love to meet and discuss a few ideas I have. Let me know when you are free!"
              }
            ]
          }
        ]
      },
      {
        "type": "speakers",
        "title": "Part 2 · Câu 14",
        "instr": "Bốn người nói về thói quen nghe nhạc. Chọn câu mô tả đúng nhất mỗi người. Có 2 lựa chọn thừa.",
        "topic": "Music listening habits",
        "options": [
          "Sings along to music played on the TV",
          "Listens to music while studying to stay alert",
          "Listens to music only when travelling by bus",
          "Gets a headache if music is played in the morning",
          "Practises an instrument every evening",
          "Needs a song first thing in the morning to get up"
        ],
        "speakers": [
          {
            "a": 3,
            "e": "Người A: nghe nhạc ngay khi thức dậy 'gives me a headache all day' → bị đau đầu nếu nghe nhạc vào buổi sáng, chỉ nghe để thư giãn.",
            "script": [
              {
                "s": "f",
                "who": "A",
                "t": "I see a lot of people listen to music right when they wake up to help them feel alert. But if I listen to music as soon as I wake up, it gives me a headache all day and makes it hard for me to focus on anything."
              },
              {
                "s": "f",
                "who": "A",
                "t": "So, I just listen to music to relax when I'm feeling comfortable, not for any other reason."
              }
            ]
          },
          {
            "a": 5,
            "e": "Người B: 'I listen to a pop or rock song as soon as I get out of bed' để tỉnh táo, nếu không thì khó dậy đi làm → cần một bài hát ngay sáng sớm để dậy.",
            "script": [
              {
                "s": "m",
                "who": "B",
                "t": "I usually listen to a pop or rock song as soon as I get out of bed in the morning because it helps me wake up instantly."
              },
              {
                "s": "m",
                "who": "B",
                "t": "If I don't listen to music at that moment, I don't know when I'll be able to get up and go to work."
              }
            ]
          },
          {
            "a": 0,
            "e": "Người C: bật nhạc trên TV và dùng điều khiển làm micro → 'pretending it's a microphone so I can sing' → hát theo nhạc phát trên TV.",
            "script": [
              {
                "s": "f",
                "who": "C",
                "t": "My brothers and friends often say that I have a beautiful voice, so I often sing when I meet them."
              },
              {
                "s": "f",
                "who": "C",
                "t": "I usually play music on the TV and hold the remote control, pretending it's a microphone so I can sing."
              }
            ]
          },
          {
            "a": 1,
            "e": "Người D: 'I have a habit of listening to music while studying; it helps me stay motivated and alert' → nghe nhạc khi học để tỉnh táo.",
            "script": [
              {
                "s": "m",
                "who": "D",
                "t": "I have a habit of listening to music while studying; it helps me stay motivated and alert while doing my assignments."
              },
              {
                "s": "m",
                "who": "D",
                "t": "If I don't play music, I could fall asleep at any moment, and I'll study in a discouraged mood."
              }
            ]
          }
        ]
      },
      {
        "type": "conv",
        "title": "Part 3 · Câu 15",
        "instr": "Nghe hai người thảo luận về công nghệ. Ai bày tỏ ý kiến sau: người đàn ông (Man), người phụ nữ (Woman) hay cả hai (Both)?",
        "topic": "Technology and information systems",
        "script": [
          {
            "s": "m",
            "t": "Hi, what have you been studying lately?"
          },
          {
            "s": "f",
            "t": "Oh, I'm still studying technology and information systems - it's a really hot topic these days."
          },
          {
            "s": "m",
            "t": "That's a fascinating field. I still can't imagine the future of humanity alongside technology. I think within the next hundred years, humans won't be able to keep up with the pace of information technology development."
          },
          {
            "s": "f",
            "t": "I believe that the younger generation and future generations will become increasingly smarter, and they'll discover even more amazing things about information technology to benefit society."
          },
          {
            "s": "m",
            "t": "But if technology advances too quickly and becomes too sophisticated, won't that cause a lot of people to lose their jobs? Many industries could be replaced by machines and robots. In the future, machines might even be smarter than humans."
          },
          {
            "s": "f",
            "t": "I think machines are just there to support humans in their work; they can't replace us or be smarter than us. If machines and robots are involved in the work process, they will make our jobs less strenuous and improve efficiency. This, in turn, will drive continuous economic and social development alongside technological advancements."
          },
          {
            "s": "m",
            "t": "What about the issue of personal data breaches? We should have more policies to protect personal information and prevent machines from leaking important personal data."
          },
          {
            "s": "f",
            "t": "I agree with you. A major issue with information technology is the potential for data breaches. If we can improve this, it would be fantastic."
          }
        ],
        "statements": [
          {
            "q": "Technology could cause many people to lose their jobs.",
            "a": "Man",
            "e": "Người đàn ông: 'won't that cause a lot of people to lose their jobs?'; người phụ nữ phản bác rằng máy móc chỉ hỗ trợ con người."
          },
          {
            "q": "Machines are only there to support people in their work.",
            "a": "Woman",
            "e": "Người phụ nữ: 'machines are just there to support humans in their work'; người đàn ông lo máy móc thay thế con người."
          },
          {
            "q": "Personal data needs to be better protected.",
            "a": "Both",
            "e": "Người đàn ông đề nghị 'more policies to protect personal information'; người phụ nữ đáp 'I agree with you' và nêu rủi ro rò rỉ dữ liệu → cả hai."
          },
          {
            "q": "Young people will make new discoveries in information technology.",
            "a": "Woman",
            "e": "Người phụ nữ: 'the younger generation ... will discover even more amazing things'; người đàn ông không nói ý này."
          }
        ]
      },
      {
        "type": "mono",
        "title": "Part 4 · Câu 16–17",
        "instr": "Nghe bài nói và trả lời 2 câu hỏi cho mỗi bài.",
        "talks": [
          {
            "topic": "A regional development plan",
            "script": [
              {
                "s": "f",
                "t": "Welcome back to our community forum. We've been receiving a lot of letters regarding the proposed development project in our area."
              },
              {
                "s": "f",
                "t": "Residents oppose this plan primarily because of its narrow focus; many are disappointed that it doesn't do enough to promote alternatives to driving, such as better cycling lanes or expanded bus routes."
              },
              {
                "s": "f",
                "t": "Beyond the public's reaction, the city council is also hitting some major roadblocks. The main difficulty the city council is having with this plan is their realization that it is not making efficient use of existing land."
              },
              {
                "s": "f",
                "t": "Instead of revitalizing the empty spaces in the city center, the proposal unnecessarily pushes into the outskirts, which many officials believe is a strategic mistake."
              }
            ],
            "questions": [
              {
                "q": "Why do residents oppose this plan?",
                "o": [
                  "It doesn't do enough to promote alternatives to driving",
                  "It increases the number of public parks in the area",
                  "It provides free public transportation for all residents"
                ],
                "a": 0,
                "e": "Cư dân phản đối vì kế hoạch hẹp, thiếu 'promote alternatives to driving' như làn xe đạp, tuyến xe buýt."
              },
              {
                "q": "What difficulties is the city council having with this plan?",
                "o": [
                  "The plan is not making efficient use of existing land",
                  "The plan has already exceeded its budget by a large margin",
                  "There is too much public support, making it hard to manage expectations"
                ],
                "a": 0,
                "e": "'it is not making efficient use of existing land' → kế hoạch không tận dụng hiệu quả đất sẵn có, lại mở rộng ra vùng ngoại ô."
              }
            ]
          },
          {
            "topic": "Life after university",
            "script": [
              {
                "s": "m",
                "t": "Transitioning from the structured environment of academic life to the professional world is often one of the most significant shifts a young adult will ever experience."
              },
              {
                "s": "m",
                "t": "When standing at this crossroads, many graduates feel immense pressure to find the perfect role immediately."
              },
              {
                "s": "m",
                "t": "However, most career counselors suggest that the best approach for students is to be flexible and open-minded during the initial stages of their journey."
              },
              {
                "s": "m",
                "t": "Instead of limiting themselves to a narrow path or a specific job title, they should be willing to explore various industries, as their first job is rarely their last, but rather a valuable learning opportunity."
              },
              {
                "s": "m",
                "t": "Furthermore, it is vital for graduates to have a realistic understanding of the current economic landscape."
              },
              {
                "s": "m",
                "t": "When applying for positions in the modern market, students must pay close attention to the fact that jobs are becoming more competitive than ever before."
              },
              {
                "s": "m",
                "t": "With a global pool of talent and the rise of automation, simply having a degree is often just the baseline requirement. To succeed, applicants need to go beyond their formal qualifications by highlighting their soft skills, unique experiences, and a strong work ethic to distinguish themselves in an increasingly crowded field of candidates."
              }
            ],
            "questions": [
              {
                "q": "What should students do when choosing a career?",
                "o": [
                  "Be flexible and open minded",
                  "Choose the same career as their friends",
                  "Focus only on the salary offered"
                ],
                "a": 0,
                "e": "'to be flexible and open-minded during the initial stages' → nên linh hoạt, cởi mở khi chọn nghề."
              },
              {
                "q": "What should students pay attention to when applying for jobs these days?",
                "o": [
                  "They are becoming more competitive",
                  "Most jobs no longer require any qualifications",
                  "Companies prefer handwritten applications"
                ],
                "a": 0,
                "e": "'jobs are becoming more competitive than ever before' → việc làm ngày càng cạnh tranh."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "l7",
    "title": "Đề 7 — Online shopping and everyday life",
    "parts": [
      {
        "type": "mcq",
        "title": "Part 1 · Câu 1–13",
        "instr": "Nghe đoạn ngắn và chọn đáp án đúng. Mỗi đoạn nghe tối đa 2 lần.",
        "items": [
          {
            "q": "What did the mother call her daughter to help her buy?",
            "o": [
              "Eggs",
              "Bread",
              "Milk"
            ],
            "a": 0,
            "e": "'We're out of eggs, and I need some to finish baking the cake' → mẹ nhờ mua trứng.",
            "script": [
              {
                "s": "f",
                "t": "Hi Sally, it's Mom. How are you? I just wanted to remind you about dinner tonight. We're having your favorite, spaghetti! Don't forget to pick up your brother from school at 4 o'clock."
              },
              {
                "s": "f",
                "t": "Oh, and can you stop by the store on your way home? We're out of eggs, and I need some to finish baking the cake. Thanks, sweetie!",
                "hl": 1
              }
            ]
          },
          {
            "q": "Samia is going to meet her friend. What time are they going to meet?",
            "o": [
              "9:30",
              "11:00",
              "10:00"
            ],
            "a": 2,
            "e": "'How about we meet at 10:00 instead?' → đổi sang 10:00; 9:30 là giờ hẹn ban đầu.",
            "script": [
              {
                "s": "f",
                "t": "Hey! I was thinking about our meet-up. We plan to meet at 9:30, but I just realized I have a class that finishes at 9:00, so I might not make it in time."
              },
              {
                "s": "f",
                "t": "How about we meet at 10:00 instead? That should give me enough time to get there. Does that work for you?",
                "hl": 1
              }
            ]
          },
          {
            "q": "Anna is calling her brother Max. What does Anna do later in the afternoon?",
            "o": [
              "Pick up the kids",
              "Stay late at the office",
              "Hang out with friends"
            ],
            "a": 1,
            "e": "'I have to stay late at the office to finish some work' → Anna ở lại văn phòng; Max mới là người đón trẻ.",
            "script": [
              {
                "s": "f",
                "t": "Hey Max, it's Anna. I want to ask you for a favor this afternoon."
              },
              {
                "s": "f",
                "t": "I have to stay late at the office to finish some work.",
                "hl": 1
              },
              {
                "s": "f",
                "t": "Could you please pick up my kids from school? After that, I know you'll want to hang out with your friends, so feel free to take them along. I really appreciate your help!"
              }
            ]
          },
          {
            "q": "A woman is talking about her favorite film on the radio. What film did she recommend?",
            "o": [
              "Action film",
              "Romantic film",
              "Comedy film"
            ],
            "a": 0,
            "e": "'I want to recommend an action film that really impressed me' → phim hành động.",
            "script": [
              {
                "s": "f",
                "t": "Today, I want to recommend an action film that really impressed me.",
                "hl": 1
              },
              {
                "s": "f",
                "t": "The lead actor, who is usually known for his romantic roles, delivered an outstanding performance. Of course, if you're in the mood for something lighter, there are plenty of comedies to enjoy as well. But if you're looking for excitement, this action film is definitely worth a watch!"
              }
            ]
          },
          {
            "q": "Where does Malik want to go?",
            "o": [
              "The town hall",
              "The library",
              "The park"
            ],
            "a": 0,
            "e": "'the town hall is where he wants to go' → tòa thị chính.",
            "script": [
              {
                "s": "m",
                "t": "Malik has been hearing a lot about an important event, and the town hall is where he wants to go because he believes it will give him a chance to learn more, engage with the community, and share his own ideas.",
                "hl": 1
              }
            ]
          },
          {
            "q": "Greg is talking about a working day in his life. How does he go to work?",
            "o": [
              "By bus",
              "By car",
              "By bike"
            ],
            "a": 0,
            "e": "'I go by bus every day' → đi bằng xe buýt.",
            "script": [
              {
                "s": "m",
                "t": "Hi, everyone! I'm Greg, and I want to tell you about a typical working day in my life. I usually wake up early, around 7 A.M. After a quick breakfast, I get ready for work. I like to wear smart clothes because I work in an office."
              },
              {
                "s": "m",
                "t": "I go by bus every day, which takes about 30 minutes.",
                "hl": 1
              },
              {
                "s": "m",
                "t": "I enjoy looking out the window and listening to music on my way. When I arrive at the office, I start my day by checking emails and planning my tasks. I have meetings with my team, and we work together on projects."
              }
            ]
          },
          {
            "q": "Listen to a nutrition expert. What time is the best for children to eat fruit?",
            "o": [
              "In the morning",
              "In the afternoon",
              "In the evening"
            ],
            "a": 0,
            "e": "'The best time for children to eat fruit is in the morning' → buổi sáng.",
            "script": [
              {
                "s": "m",
                "t": "Hello, everyone! I'm here to talk about nutrition and how important it is for our health. Eating fruits is very beneficial, especially for children. Fruits have vitamins and minerals that help kids grow strong and stay healthy."
              },
              {
                "s": "m",
                "t": "The best time for children to eat fruit is in the morning.",
                "hl": 1
              },
              {
                "s": "m",
                "t": "This gives them energy for the day ahead. You can add fruit to breakfast, like in a smoothie or with yogurt. It's a delicious and healthy way to start the day! So, let's encourage our kids to eat more fruit in the morning! Thank you!"
              }
            ]
          },
          {
            "q": "Listen to a woman explaining her morning routine to her friend. Why does she get up early?",
            "o": [
              "To go to work",
              "To take care of her kids",
              "To have some quiet time"
            ],
            "a": 2,
            "e": "'for me, it's all about enjoying that calm' và 'I enjoy this quiet time' → để có thời gian yên tĩnh cho mình; đi làm/chăm con là lý do của người khác.",
            "script": [
              {
                "s": "f",
                "t": "I usually wake up early each day before anyone else. Some people get up early to go to work or to take care of their kids, but for me, it's all about enjoying that calm before the busyness begins.",
                "hl": 1
              },
              {
                "s": "f",
                "t": "I enjoy this quiet time because it helps me start my day peacefully. It's nice to have a few moments to myself, sipping coffee and planning my day ahead.",
                "hl": 1
              }
            ]
          },
          {
            "q": "A man is talking to his friend. Why does he need to learn to drive?",
            "o": [
              "To go on a road trip",
              "To take his family on vacations",
              "He has to drive to work"
            ],
            "a": 2,
            "e": "'pretty far from my workplace, and the public transport there isn't great' → nơi ở mới xa chỗ làm, giao thông công cộng kém nên phải lái xe đi làm.",
            "script": [
              {
                "s": "m",
                "t": "Hey, Sarah. I've got some news. I'm moving to a new place."
              },
              {
                "s": "f",
                "t": "Oh really? That sounds exciting! Where's your new place?"
              },
              {
                "s": "m",
                "t": "It's actually pretty far from my workplace, and the public transport there isn't great. So, I've been thinking, I need to learn how to drive.",
                "hl": 1
              },
              {
                "s": "f",
                "t": "Yeah, that makes sense. It's hard to rely on public transport if it's not reliable. Have you ever driven before?"
              },
              {
                "s": "m",
                "t": "Not really. I've always used buses and trains, but now it looks like I don't have a choice. I need to get a license."
              },
              {
                "s": "f",
                "t": "You'll get the hang of it. Driving will definitely make your commute easier. Are you planning to take lessons soon?"
              },
              {
                "s": "m",
                "t": "Yeah, I'm going to sign up for a driving school next week. Hopefully, I can get it done quickly."
              }
            ]
          },
          {
            "q": "Two friends are talking with each other. What did they both buy?",
            "o": [
              "Clothes",
              "Shoes",
              "Books"
            ],
            "a": 0,
            "e": "Anh ấy mua 'a stylish leather jacket', cô ấy mua 'a cozy sweater' → cả hai đều mua quần áo ('New clothes and tasty treats').",
            "script": [
              {
                "s": "m",
                "t": "I just got back from shopping. I found a great jacket and also picked up some tea."
              },
              {
                "s": "f",
                "t": "Nice! What kind of jacket did you get?"
              },
              {
                "s": "m",
                "t": "It's a stylish leather jacket. I think it'll be perfect for the fall. What about you?",
                "hl": 1
              },
              {
                "s": "f",
                "t": "I bought a cozy sweater and also grabbed a delicious cake.",
                "hl": 1
              },
              {
                "s": "m",
                "t": "Sounds great! Those are perfect for this weather."
              },
              {
                "s": "f",
                "t": "Thanks! I'm excited to try the cake later. Looks like we both made good choices today!"
              },
              {
                "s": "m",
                "t": "Absolutely! New clothes and tasty treats for the chilly days ahead!",
                "hl": 1
              }
            ]
          },
          {
            "q": "What area is he describing?",
            "o": [
              "A shopping district",
              "A university area",
              "A residential neighborhood"
            ],
            "a": 1,
            "e": "'The university area is where he's talking about' → khu đại học, đầy sinh viên và giáo sư.",
            "script": [
              {
                "s": "f",
                "t": "He's describing a place with a vibrant atmosphere, full of students and professors."
              },
              {
                "s": "f",
                "t": "The university area is where he's talking about, known for its lively campus, beautiful buildings, and the mix of academic and social life that surrounds it.",
                "hl": 1
              }
            ]
          },
          {
            "q": "A man wants to move abroad for a new job. What is his biggest problem?",
            "o": [
              "Finding the right house",
              "Persuading his family",
              "Getting the financing"
            ],
            "a": 1,
            "e": "'my family isn't on board with it' và 'I want their support' → khó khăn là thuyết phục gia đình.",
            "script": [
              {
                "s": "m",
                "t": "I've been having a tough time lately. I really want to move abroad for a new job, but my family isn't on board with it.",
                "hl": 1
              },
              {
                "s": "m",
                "t": "They're worried about me leaving and don't understand why I want to go so far away. I've tried to explain all the benefits, but they just don't seem to get it. It's really frustrating because I want their support, but it feels like I'm not getting through to them.",
                "hl": 1
              }
            ]
          },
          {
            "q": "Listening to a tour guide talking about Rock City. How old is the city?",
            "o": [
              "1000 years",
              "2000 years",
              "1500 years"
            ],
            "a": 2,
            "e": "'People first started living here about 1500 years ago' → khoảng 1500 năm.",
            "script": [
              {
                "s": "f",
                "t": "Welcome to Rock City, everyone! I'm excited to show you around this amazing place. Rock City has a very long and interesting history."
              },
              {
                "s": "f",
                "t": "People first started living here about 1500 years ago.",
                "hl": 1
              },
              {
                "s": "f",
                "t": "Can you believe how old that is? It's older than many famous cities in the world! The city got its name because of all the big rocks you can see around us. Over time, people built houses and roads between these rocks. Today, we can still see many old buildings from long ago."
              }
            ]
          }
        ]
      },
      {
        "type": "speakers",
        "title": "Part 2 · Câu 14",
        "instr": "Bốn người nói về mua sắm trực tuyến. Chọn câu mô tả đúng nhất mỗi người. Có 2 lựa chọn thừa.",
        "topic": "Online shopping",
        "options": [
          "Enjoys having parcels delivered right to the door",
          "Saves money by comparing prices between stores",
          "Shops online to save time because of a busy schedule",
          "Likes the wide choice of types and brands",
          "Enjoys visiting local markets for fresh products",
          "Only buys items during seasonal discount sales"
        ],
        "speakers": [
          {
            "a": 0,
            "e": "Người A: 'the delivery person brings the package right to my door' → hàng được giao tận cửa, không cần ra ngoài.",
            "script": [
              {
                "s": "f",
                "who": "A",
                "t": "I used to be the person who didn't like shopping online, but ever since I experienced home delivery, I no longer shop in stores. When I shop online, the delivery person brings the package right to my door, even up to my floor, and knocks on my apartment door, so I don't even need to step outside. I really enjoy this convenience."
              }
            ]
          },
          {
            "a": 1,
            "e": "Người B: 'online shopping allows me to compare prices and choose the store with the best deal' → so sánh giá để tiết kiệm tiền.",
            "script": [
              {
                "s": "m",
                "who": "B",
                "t": "Shopping online has helped me save quite a bit of money. After a few months of online shopping, I was able to save enough to buy a new bicycle. But don't get me wrong, I haven't been eating any less or cutting back on the groceries I buy. It's just that online shopping allows me to compare prices and choose the store with the best deal."
              }
            ]
          },
          {
            "a": 2,
            "e": "Người C: 'I always shop online to save time' vì lịch làm việc bận rộn → tiết kiệm thời gian.",
            "script": [
              {
                "s": "f",
                "who": "C",
                "t": "I'm a pretty busy person, and I often don't have enough time because of my hectic work schedule. That's why I always shop online to save time. This way, I don't need to go to the store in person, and someone will deliver the items directly to me. Additionally, online shopping is very convenient because, with just a few clicks, I can buy everything I want without having to go from one store to another."
              }
            ]
          },
          {
            "a": 3,
            "e": "Người D: 'I have a wide range of choices' và 'many different types and brands' → thích sự đa dạng lựa chọn.",
            "script": [
              {
                "s": "m",
                "who": "D",
                "t": "I don't shop online because it's cheaper or because of the fast shipping. I shop online because, when browsing online stores, I have a wide range of choices. For the same item, there are many different types and brands for me to choose from and compare, which allows me to pick the one I like the most."
              }
            ]
          }
        ]
      },
      {
        "type": "conv",
        "title": "Part 3 · Câu 15",
        "instr": "Nghe hai người thảo luận về tuyển chọn diễn viên và diễn xuất. Ai bày tỏ ý kiến sau: người đàn ông (Man), người phụ nữ (Woman) hay cả hai (Both)?",
        "topic": "Casting actors and acting",
        "script": [
          {
            "s": "f",
            "t": "What do you think about auditioning actors before casting them?"
          },
          {
            "s": "m",
            "t": "I think it's absolutely necessary and the most important thing because it determines whether the actor is suitable for the role or not."
          },
          {
            "s": "f",
            "t": "I understand that auditions are important. But if we only rely on a 15 to 20 minute audition, that short period of time cannot really show us the actor's full potential."
          },
          {
            "s": "m",
            "t": "That's a good point. So I think it's better to let actors perform freestyle, not relying on the script, so that they can improvise, thereby clearly showing their acting skills."
          },
          {
            "s": "f",
            "t": "But actors often respond best to a good script. And they also need a script provided by the director and directed to act according to the script. Actors can't always act freely."
          },
          {
            "s": "m",
            "t": "What do you think about stage actors moving to film acting?"
          },
          {
            "s": "f",
            "t": "I think they are two completely different fields. When I was studying acting in college, stage acting and film acting were two completely separate subjects. They require different skills and qualities from the actor. So, it's not easy to move from stage acting to film acting and vice versa."
          },
          {
            "s": "m",
            "t": "That's right. These are two very different forms of acting and they require different skills from the actor. However, as actors, I think we all need encouragement and support from the audience."
          },
          {
            "s": "f",
            "t": "I completely agree. Actors need praise and feedback to feel recognized for their efforts and contributions."
          }
        ],
        "statements": [
          {
            "q": "Actors should perform freely and improvise instead of relying on the script.",
            "a": "Man",
            "e": "Người đàn ông: 'let actors perform freestyle, not relying on the script'; người phụ nữ phản đối: 'Actors can't always act freely'."
          },
          {
            "q": "Actors usually do their best work with a good script.",
            "a": "Woman",
            "e": "Người phụ nữ: 'actors often respond best to a good script'; người đàn ông thì ủng hộ diễn tự do."
          },
          {
            "q": "Moving between stage acting and film acting is difficult because they need different skills.",
            "a": "Both",
            "e": "Người phụ nữ: 'it's not easy to move from stage acting to film acting'; người đàn ông: 'they require different skills from the actor'."
          },
          {
            "q": "Actors need support and recognition from the audience.",
            "a": "Both",
            "e": "Người đàn ông: 'we all need encouragement and support from the audience'; người phụ nữ: 'I completely agree. Actors need praise and feedback'."
          }
        ]
      },
      {
        "type": "mono",
        "title": "Part 4 · Câu 16–17",
        "instr": "Nghe bài nói và trả lời 2 câu hỏi cho mỗi bài.",
        "talks": [
          {
            "topic": "Advertising and sponsoring",
            "script": [
              {
                "s": "m",
                "t": "In the competitive world of business today, many companies struggle to find the most effective way to grow their presence. While some argue that marketing budgets are getting out of control, most experts agree on the fundamental importance of traditional methods. The primary advantage of a well-executed campaign is that it can help reach new customers who might otherwise never hear of the brand. By expanding the target audience, businesses can ensure long-term growth and stability."
              },
              {
                "s": "m",
                "t": "However, when it comes to specific strategies like sponsoring major events, companies must be extremely cautious. For example, while sponsoring sports tournaments might seem like a great way to gain visibility, there are significant risks involved. Critics argue that if a brand is linked to an event that experiences a scandal or unethical behavior, it can generate negative publicity for the sport as a whole. Instead of promoting a healthy image, the sponsorship might end up damaging the reputation of both the company and the athletic community involved."
              }
            ],
            "questions": [
              {
                "q": "What is the importance of advertising?",
                "o": [
                  "It can help reach new customers",
                  "It increases the product price",
                  "It makes products cheaper to produce"
                ],
                "a": 0,
                "e": "'it can help reach new customers who might otherwise never hear of the brand' → quảng cáo giúp tiếp cận khách hàng mới."
              },
              {
                "q": "Why shouldn't we sponsor sports tournaments?",
                "o": [
                  "They can generate negative publicity for the sport",
                  "They are too expensive",
                  "They can create unfair competition"
                ],
                "a": 0,
                "e": "'it can generate negative publicity for the sport as a whole' → có thể gây tiếng xấu cho môn thể thao nếu sự kiện dính scandal."
              }
            ]
          },
          {
            "topic": "Famous writers",
            "script": [
              {
                "s": "f",
                "t": "Today we are exploring the lives of two iconic authors who significantly shaped the literary landscape of the 20th century. Although they belonged to different generations and came from diverse backgrounds, they shared a profound mutual respect that deeply influenced their writing style. One of the most fascinating aspects of their professional relationship is that they both make references to each other in their work, subtly weaving their colleague's ideas, themes, or even names into their own narratives as a form of literary tribute."
              },
              {
                "s": "f",
                "t": "However, their writing is certainly not for the casual reader. These authors are famous for their layers of symbolism and philosophical depth. Many literary critics have noted that the meaning of their work is not always easily identified, as it usually requires deep reflection and multiple readings to truly grasp the underlying messages. This inherent complexity is exactly what has kept scholars and fans debating the true intent of their stories for decades."
              }
            ],
            "questions": [
              {
                "q": "What do these two famous writers have in common?",
                "o": [
                  "They both make references to each other in their work",
                  "They both wrote in the same genre",
                  "They both were born in the same country"
                ],
                "a": 0,
                "e": "'they both make references to each other in their work' → cả hai nhắc đến nhau trong tác phẩm; họ khác thế hệ và xuất thân."
              },
              {
                "q": "What is special about their works?",
                "o": [
                  "The meaning of their work is not always easily identified",
                  "Their works are all based on real events",
                  "They use simple language and structure"
                ],
                "a": 0,
                "e": "'the meaning of their work is not always easily identified' → ý nghĩa tác phẩm không dễ nhận ra, nhiều tầng biểu tượng."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "l8",
    "title": "Đề 8 — Hobbies and technology",
    "parts": [
      {
        "type": "mcq",
        "title": "Part 1 · Câu 1–13",
        "instr": "Nghe đoạn ngắn và chọn đáp án đúng. Mỗi đoạn nghe tối đa 2 lần.",
        "items": [
          {
            "q": "Listen to the director talking about sales of his company. How many copies of Freeze Frame magazine were sold?",
            "o": [
              "Over 200,000 copies",
              "Over 300,000 copies",
              "Over 500,000 copies"
            ],
            "a": 1,
            "e": "'we sold over 300,000 copies' → hơn 300.000 bản.",
            "script": [
              {
                "s": "m",
                "t": "I am excited to share the latest sales figures for our company."
              },
              {
                "s": "m",
                "t": "This month, we had a fantastic response to our magazine, Freeze Frame."
              },
              {
                "s": "m",
                "t": "I'm proud to announce that we sold over 300,000 copies!",
                "hl": 1
              },
              {
                "s": "m",
                "t": "This is a big increase from last month."
              },
              {
                "s": "m",
                "t": "Many people are buying our magazine, and we are very grateful for your support!"
              },
              {
                "s": "m",
                "t": "We hope to sell even more in the future."
              }
            ]
          },
          {
            "q": "Anna is calling her friend. Where will they meet?",
            "o": [
              "At the bus stop",
              "At the park",
              "At the marketplace"
            ],
            "a": 2,
            "e": "'we are still meeting at the marketplace later' → gặp nhau ở chợ.",
            "script": [
              {
                "s": "f",
                "t": "Hi, Mia!"
              },
              {
                "s": "f",
                "t": "It's Anna."
              },
              {
                "s": "f",
                "t": "I hope you're having a great day!"
              },
              {
                "s": "f",
                "t": "I wanted to see if we are still meeting at the marketplace later.",
                "hl": 1
              },
              {
                "s": "f",
                "t": "I'm really excited because I want to try that new ice cream shop we talked about."
              },
              {
                "s": "f",
                "t": "I heard they have some amazing flavors!"
              },
              {
                "s": "f",
                "t": "I'll be there around 3 P.M."
              },
              {
                "s": "f",
                "t": "Let's also check out the fresh fruits and vegetables."
              },
              {
                "s": "f",
                "t": "It's always fun to shop together!"
              },
              {
                "s": "f",
                "t": "See you soon!"
              }
            ]
          },
          {
            "q": "What did the man leave at a friend's house?",
            "o": [
              "Wallet",
              "Phone",
              "Glasses"
            ],
            "a": 2,
            "e": "'I left my glasses there' → để quên kính.",
            "script": [
              {
                "s": "m",
                "t": "I was at my friend's house the other day, and I just realized I left my glasses there.",
                "hl": 1
              },
              {
                "s": "m",
                "t": "I didn't notice until later, so now I'll have to give them a call and ask if I can swing by to pick them up."
              }
            ]
          },
          {
            "q": "Listen to the conversation. Who is she taking a photo of?",
            "o": [
              "The girls' team",
              "The boys' team",
              "The coaches"
            ],
            "a": 0,
            "e": "'take a photo of the girls' team now' — đội nam đã chụp trước, huấn luyện viên chụp sau.",
            "script": [
              {
                "s": "f",
                "t": "I'm just about to take a photo of the girls' team now.",
                "hl": 1
              },
              {
                "s": "f",
                "t": "They're all lined up and ready, smiling for the camera."
              },
              {
                "s": "f",
                "t": "I've already taken pictures of the boys earlier, so it's their turn."
              },
              {
                "s": "f",
                "t": "The coaches will have their photo taken after this."
              },
              {
                "s": "f",
                "t": "The girls are excited because this picture will be in the school magazine."
              },
              {
                "s": "f",
                "t": "Alright, everyone, say 'cheese'!"
              }
            ]
          },
          {
            "q": "Listen to David talking about the conference. How long did he talk in the speech?",
            "o": [
              "10 minutes",
              "15 minutes",
              "20 minutes"
            ],
            "a": 1,
            "e": "'My speech lasted about 15 minutes' → khoảng 15 phút.",
            "script": [
              {
                "s": "m",
                "t": "Hello everyone."
              },
              {
                "s": "m",
                "t": "Today, I want to tell you about the conference that took place last week."
              },
              {
                "s": "m",
                "t": "It was very interesting, and many people attended."
              },
              {
                "s": "m",
                "t": "I spoke about new ideas in business."
              },
              {
                "s": "m",
                "t": "My presentation wasn't very long, but I had a lot to say."
              },
              {
                "s": "m",
                "t": "The other speakers talked about technology and education."
              },
              {
                "s": "m",
                "t": "After the talks, there were some questions from the audience."
              },
              {
                "s": "m",
                "t": "My speech lasted about 15 minutes, shorter than expected.",
                "hl": 1
              },
              {
                "s": "m",
                "t": "However, the audience was very attentive, and I was happy to see that."
              }
            ]
          },
          {
            "q": "A woman is talking about her family's weekend. What does the family do most weekends?",
            "o": [
              "Go for a walk",
              "Go to the beach",
              "Visit relatives"
            ],
            "a": 0,
            "e": "'often go for a walk in the park' là việc thường làm; cuối tuần này mới khác (chị gái đến chơi).",
            "script": [
              {
                "s": "f",
                "t": "Hello, everyone!"
              },
              {
                "s": "f",
                "t": "I want to share what my family usually does on weekends."
              },
              {
                "s": "f",
                "t": "We love spending time together and often go for a walk in the park.",
                "hl": 1
              },
              {
                "s": "f",
                "t": "It's a nice way to relax and enjoy nature."
              },
              {
                "s": "f",
                "t": "We like to see the flowers and sometimes have a picnic."
              },
              {
                "s": "f",
                "t": "However, this weekend is different!"
              },
              {
                "s": "f",
                "t": "My sister is visiting us, and we have planned a small family gathering at home."
              },
              {
                "s": "f",
                "t": "We will cook a big meal together and play some games."
              },
              {
                "s": "f",
                "t": "It will be fun to catch up and spend quality time as a family."
              },
              {
                "s": "f",
                "t": "I'm really looking forward to it!"
              }
            ]
          },
          {
            "q": "A girl is talking about her new dress. What is the dress like?",
            "o": [
              "Short and blue",
              "Long and white",
              "Long and red"
            ],
            "a": 2,
            "e": "'The dress is long and red' → dài và màu đỏ.",
            "script": [
              {
                "s": "f",
                "t": "I want to tell you about something special I just bought."
              },
              {
                "s": "f",
                "t": "It's a beautiful dress."
              },
              {
                "s": "f",
                "t": "The dress is long and red, just like a sunset!",
                "hl": 1
              },
              {
                "s": "f",
                "t": "I feel so happy when I wear it."
              },
              {
                "s": "f",
                "t": "The fabric is soft, and it flows nicely when I walk."
              },
              {
                "s": "f",
                "t": "I can wear it to a party or a nice dinner."
              },
              {
                "s": "f",
                "t": "I love my new dress!"
              }
            ]
          },
          {
            "q": "Soobin is talking about his favorite room. What is Soobin's favorite room?",
            "o": [
              "Kitchen",
              "Living room",
              "Bathroom"
            ],
            "a": 2,
            "e": "Thích bếp và phòng khách nhưng 'I have to say the bathroom is my favorite' → phòng tắm.",
            "script": [
              {
                "s": "m",
                "t": "You know, when I think about my favorite room in the house, it's kind of hard to choose."
              },
              {
                "s": "m",
                "t": "I mean, I really enjoy the kitchen since I love cooking, and the living room is great for hanging out with friends."
              },
              {
                "s": "m",
                "t": "But honestly, I have to say the bathroom is my favorite!",
                "hl": 1
              },
              {
                "s": "m",
                "t": "It might sound strange, but it's the one place where I can truly relax."
              }
            ]
          },
          {
            "q": "A woman is talking about her weekends. What did she do last weekend?",
            "o": [
              "Went out with friends",
              "Stayed at home",
              "Visited a café"
            ],
            "a": 1,
            "e": "'Last weekend, I stayed at home' — đi chơi với bạn, ghé quán cà phê là dự định cuối tuần này.",
            "script": [
              {
                "s": "f",
                "t": "My weekends are not always the same."
              },
              {
                "s": "f",
                "t": "This week has been busy, but I always look forward to my free time."
              },
              {
                "s": "f",
                "t": "Last weekend, I stayed at home and enjoyed some quiet moments with a good book.",
                "hl": 1
              },
              {
                "s": "f",
                "t": "I also watched a few movies and cooked a nice dinner for myself."
              },
              {
                "s": "f",
                "t": "This weekend, I plan to go out with friends."
              },
              {
                "s": "f",
                "t": "We might visit a new café or go for a walk in the park."
              },
              {
                "s": "f",
                "t": "I love spending time with my friends and relaxing after a busy week!"
              }
            ]
          },
          {
            "q": "Listen to a saleswoman talking about a property. Which room is the largest?",
            "o": [
              "Living room",
              "Bedroom",
              "Kitchen"
            ],
            "a": 2,
            "e": "'the kitchen is the star of the house – it's the largest room' → nhà bếp.",
            "script": [
              {
                "s": "f",
                "t": "Hello, and welcome!"
              },
              {
                "s": "f",
                "t": "Let me tell you about this lovely property."
              },
              {
                "s": "f",
                "t": "It has two spacious bedrooms, both with big windows that let in lots of natural light."
              },
              {
                "s": "f",
                "t": "The bathroom is modern, with a large shower and plenty of storage space."
              },
              {
                "s": "f",
                "t": "The living room is cozy, perfect for relaxing after a long day."
              },
              {
                "s": "f",
                "t": "But the kitchen is the star of the house – it's the largest room, with lots of counter space for cooking, and it's great for hosting dinners.",
                "hl": 1
              },
              {
                "s": "f",
                "t": "You'll love it here!"
              }
            ]
          },
          {
            "q": "Two friends are talking about their trip. What will the weather be like?",
            "o": [
              "Cold and wet",
              "Hot and sunny",
              "Mild and dry"
            ],
            "a": 0,
            "e": "'the weather is going to be cold and wet' → lạnh và ẩm ướt, nên mang áo mưa, đồ ấm.",
            "script": [
              {
                "s": "m",
                "t": "Hey, Sarah! Are you excited about our trip next week?"
              },
              {
                "s": "f",
                "t": "Hi, Mike! Yes, I can't wait! I've been looking forward to it for a long time."
              },
              {
                "s": "m",
                "t": "Me too! But I heard the weather is going to be cold and wet. We should prepare for that.",
                "hl": 1
              },
              {
                "s": "f",
                "t": "Oh no! I hope it doesn't rain too much. We need to pack our rain jackets and warm clothes."
              },
              {
                "s": "m",
                "t": "Definitely! I'll also bring an umbrella just in case."
              },
              {
                "s": "f",
                "t": "Good idea! Let's plan some fun indoor activities if the weather is bad."
              },
              {
                "s": "m",
                "t": "Yes! We can visit museums or try some local food. It will still be a great trip!"
              }
            ]
          },
          {
            "q": "A customer is calling the hotline of a department store. Which number should they press to buy a computer?",
            "o": [
              "One",
              "Two",
              "Three"
            ],
            "a": 2,
            "e": "'a free consultation on buying a new computer, please press 3' → bấm số 3.",
            "script": [
              {
                "s": "f",
                "t": "Thank you for calling our customer service hotline."
              },
              {
                "s": "f",
                "t": "To file a complaint about a recent purchase, please press 1."
              },
              {
                "s": "f",
                "t": "For assistance with maintenance or repairs, press 2."
              },
              {
                "s": "f",
                "t": "If you'd like a free consultation on buying a new computer, please press 3.",
                "hl": 1
              },
              {
                "s": "f",
                "t": "For all other inquiries, please stay on the line, and a representative will assist you shortly."
              }
            ]
          },
          {
            "q": "How does she go to school?",
            "o": [
              "She drives",
              "She takes the bus",
              "She walks"
            ],
            "a": 2,
            "e": "'instead of taking a bus or driving, she walks to school' → đi bộ.",
            "script": [
              {
                "s": "m",
                "t": "She prefers to stay active, so instead of taking a bus or driving, she walks to school every day.",
                "hl": 1
              },
              {
                "s": "m",
                "t": "It's a nice way for her to get some fresh air and clear her mind before starting the day."
              }
            ]
          }
        ]
      },
      {
        "type": "speakers",
        "title": "Part 2 · Câu 14",
        "instr": "Bốn người nói về sở thích và môn thể thao của mình. Chọn câu mô tả đúng nhất mỗi người. Có 2 lựa chọn thừa.",
        "topic": "Hobbies and sports",
        "options": [
          "switched to a different sport after an accident",
          "has enjoyed horse riding since childhood",
          "competes in sports at a professional level",
          "refuses to take up a sport a parent recommends",
          "prefers exercising indoors at a gym",
          "exercises outdoors with a partner early in the morning"
        ],
        "speakers": [
          {
            "a": 1,
            "e": "Người A: 'I've been learning to ride horses since I was a child, and it's still my hobby' → cưỡi ngựa từ nhỏ.",
            "script": [
              {
                "s": "m",
                "who": "A",
                "t": "My hometown is in the countryside, and we have a very large and beautiful farm."
              },
              {
                "s": "m",
                "who": "A",
                "t": "I've been learning to ride horses since I was a child, and it's still my hobby to this day."
              },
              {
                "s": "m",
                "who": "A",
                "t": "Whenever I want to relax or enjoy the scenery, I ride my horse along the farm and across the meadows."
              }
            ]
          },
          {
            "a": 5,
            "e": "Người B: 'My husband and I often wake up early... go jogging in the early morning' → tập ngoài trời cùng chồng vào sáng sớm.",
            "script": [
              {
                "s": "f",
                "who": "B",
                "t": "My husband and I often wake up early and go to a nearby forest for exercise."
              },
              {
                "s": "f",
                "who": "B",
                "t": "We usually go jogging in the early morning to stay healthy, and we really enjoy the fresh air and natural scenery in the forest."
              }
            ]
          },
          {
            "a": 0,
            "e": "Người C: 'after an injury from a fall... I've decided to just go hiking' → bỏ đạp xe leo núi sau tai nạn, chuyển sang đi bộ đường dài.",
            "script": [
              {
                "s": "f",
                "who": "C",
                "t": "I used to love mountain biking, enjoying the thrill of riding down steep slopes."
              },
              {
                "s": "f",
                "who": "C",
                "t": "It was really an amazing and adventurous feeling."
              },
              {
                "s": "f",
                "who": "C",
                "t": "However, after an injury from a fall, I became haunted by the fear of crashing and now I'm scared of this sport."
              },
              {
                "s": "f",
                "who": "C",
                "t": "But I still love the mountains, so I've decided to just go hiking every weekend instead."
              }
            ]
          },
          {
            "a": 3,
            "e": "Người D: 'My father often encourages me to ride horses... never want to learn' → không chịu học môn bố khuyên.",
            "script": [
              {
                "s": "m",
                "who": "D",
                "t": "My father often encourages me to ride horses because it's a sport he enjoys."
              },
              {
                "s": "m",
                "who": "D",
                "t": "But I'm very afraid of this animal and never want to learn how to ride, even though there's a riding school near my house."
              },
              {
                "s": "m",
                "who": "D",
                "t": "Instead, I prefer mountain biking with my friends to conquer high peaks."
              }
            ]
          }
        ]
      },
      {
        "type": "conv",
        "title": "Part 3 · Câu 15",
        "instr": "Nghe hai người thảo luận về Internet và công nghệ. Ai bày tỏ ý kiến sau: người đàn ông (Man), người phụ nữ (Woman) hay cả hai (Both)?",
        "topic": "Internet and technology",
        "script": [
          {
            "s": "f",
            "t": "These days, there's so much information on the internet that I feel overwhelmed."
          },
          {
            "s": "m",
            "t": "That's true. A lot of people feel the same way, especially with the mix of real and fake information. Sometimes we end up reading fake news."
          },
          {
            "s": "f",
            "t": "That's why using the internet requires both knowledge and skills. Without good information-searching skills, we can waste a lot of time. There's so much content uploaded to the internet every day, and we have to be cautious because it might not be accurate. As a result, people are gradually changing how they perceive the information they encounter online. It's not like in the past when we read newspapers and believed everything was true."
          },
          {
            "s": "m",
            "t": "Additionally, the internet has made people much more impatient than before. They want everything to yield quick results. People are losing the ability to wait for outcomes like they used to."
          },
          {
            "s": "f",
            "t": "Exactly, because the internet allows us to find millions of results in less than a second. We're getting used to that, which is leading to a decline in patience and tolerance."
          }
        ],
        "statements": [
          {
            "q": "Much of the information online cannot be trusted.",
            "a": "Both",
            "e": "Người đàn ông: 'the mix of real and fake information... we end up reading fake news'; người phụ nữ: 'we have to be cautious because it might not be accurate'."
          },
          {
            "q": "Without good search skills, people waste time online.",
            "a": "Woman",
            "e": "Người phụ nữ: 'Without good information-searching skills, we can waste a lot of time'."
          },
          {
            "q": "People no longer believe everything they read, as they did in the past.",
            "a": "Woman",
            "e": "Người phụ nữ: 'It's not like in the past when we read newspapers and believed everything was true'."
          },
          {
            "q": "The internet has made people less patient.",
            "a": "Both",
            "e": "Người đàn ông: 'the internet has made people much more impatient'; người phụ nữ đồng ý: 'Exactly... a decline in patience and tolerance'."
          }
        ]
      },
      {
        "type": "mono",
        "title": "Part 4 · Câu 16–17",
        "instr": "Nghe bài nói và trả lời 2 câu hỏi cho mỗi bài.",
        "talks": [
          {
            "topic": "Security cameras",
            "script": [
              {
                "s": "m",
                "t": "The widespread use of surveillance technology often sparks intense debates regarding the balance between privacy and safety."
              },
              {
                "s": "m",
                "t": "When looking specifically at the professional environment, many staff members express a certain level of anxiety about being observed throughout their shifts."
              },
              {
                "s": "m",
                "t": "However, perspective is key; in reality, employees probably worry unnecessarily about these devices."
              },
              {
                "s": "m",
                "t": "Most systems are installed primarily for insurance purposes or to ensure workplace safety in case of emergencies, rather than for the constant, minute-by-minute monitoring of staff behavior that many fear."
              },
              {
                "s": "m",
                "t": "Furthermore, when shifting the focus to our broader society, the presence of digital eyes in public spaces is becoming a standard feature of modern life."
              },
              {
                "s": "m",
                "t": "While it is true that some individuals feel their personal space is being invaded, the overarching consensus among security experts is that people should feel reassured by their existence."
              },
              {
                "s": "m",
                "t": "These cameras play a vital role in deterring criminal activity, aiding emergency services in real-time, and providing objective evidence in legal disputes."
              },
              {
                "s": "m",
                "t": "Ultimately, the peace of mind that comes from knowing a public area is monitored significantly contributes to a sense of collective security."
              }
            ],
            "questions": [
              {
                "q": "How should people feel about cameras in the workplace?",
                "o": [
                  "Employees probably worry unnecessarily",
                  "People should feel uneasy",
                  "Cameras should be banned"
                ],
                "a": 0,
                "e": "'employees probably worry unnecessarily about these devices' — camera chủ yếu để bảo hiểm, an toàn, không phải theo dõi nhân viên."
              },
              {
                "q": "How should people feel about cameras in general?",
                "o": [
                  "People should feel reassured",
                  "Cameras invade personal space",
                  "People should feel paranoid"
                ],
                "a": 0,
                "e": "'people should feel reassured by their existence' — chỉ một số người thấy bị xâm phạm, còn chuyên gia cho rằng nên yên tâm."
              }
            ]
          },
          {
            "topic": "A new novel of a famous writer",
            "script": [
              {
                "s": "f",
                "t": "I've just finished reading the latest release from one of the most celebrated authors of our time, and it has certainly sparked a lot of conversation among literary circles."
              },
              {
                "s": "f",
                "t": "The most striking thing about this book, and what everyone seems to be discussing, is that it is quite different compared to his previous works."
              },
              {
                "s": "f",
                "t": "While he has built his reputation on fast-paced action thrillers, this new publication takes a much more experimental and slow-burning approach to storytelling, which might catch long-time fans off guard."
              },
              {
                "s": "f",
                "t": "Despite his undeniable talent and creative ambition, I found the execution of this particular story to be somewhat hit-or-miss."
              },
              {
                "s": "f",
                "t": "While I appreciate his willingness to step out of his comfort zone, I believe there is room for improvement in how he handles these new themes."
              },
              {
                "s": "f",
                "t": "In my view, the author should take some time to reflect on the feedback he is receiving from professional reviewers."
              },
              {
                "s": "f",
                "t": "My honest opinion of this writer is that he should listen to the critics before writing his next novel."
              },
              {
                "s": "f",
                "t": "Paying attention to their concerns regarding pacing and structure could be the key to ensuring his future projects are as successful as his early masterpieces."
              }
            ],
            "questions": [
              {
                "q": "What is special about his new novel?",
                "o": [
                  "It is quite different compared to his previous works",
                  "It is shorter and easier to read",
                  "It has been written in a different genre"
                ],
                "a": 0,
                "e": "'it is quite different compared to his previous works' — cách kể thử nghiệm, chậm rãi hơn (không nói đổi thể loại hay ngắn hơn)."
              },
              {
                "q": "What is the speaker's opinion of this writer?",
                "o": [
                  "He should listen to the critics before writing his next novel",
                  "He is a brilliant but slow writer",
                  "He needs to change his writing style"
                ],
                "a": 0,
                "e": "'he should listen to the critics before writing his next novel' → nên nghe giới phê bình."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "l9",
    "title": "Đề 9 — Travel and free time",
    "parts": [
      {
        "type": "mcq",
        "title": "Part 1 · Câu 1–13",
        "instr": "Nghe đoạn ngắn và chọn đáp án đúng. Mỗi đoạn nghe tối đa 2 lần.",
        "items": [
          {
            "q": "Listen to a voice message. How does Evan feel?",
            "o": [
              "Happy",
              "Tired",
              "Sick"
            ],
            "a": 2,
            "e": "Mẹ nhắn: 'I heard you're not feeling well' và dặn nghỉ ngơi, uống nhiều nước → Evan bị ốm.",
            "script": [
              {
                "s": "f",
                "t": "Hi, Evan!"
              },
              {
                "s": "f",
                "t": "This is Mom."
              },
              {
                "s": "f",
                "t": "I just wanted to leave you a message to check on you."
              },
              {
                "s": "f",
                "t": "I heard you're not feeling well, and I'm really worried about you.",
                "hl": 1
              },
              {
                "s": "f",
                "t": "Make sure you're resting and drinking plenty of fluids."
              },
              {
                "s": "f",
                "t": "Do you need anything?"
              },
              {
                "s": "f",
                "t": "I can bring you some soup or your favorite snacks."
              },
              {
                "s": "f",
                "t": "Please take care of yourself!"
              },
              {
                "s": "f",
                "t": "I love you and hope you feel better soon."
              },
              {
                "s": "f",
                "t": "Call me back when you can!"
              }
            ]
          },
          {
            "q": "The train was delayed. What time did the train depart?",
            "o": [
              "9:00",
              "9:15",
              "9:30"
            ],
            "a": 2,
            "e": "'It finally departed at 9:30' — 9:00 là giờ dự kiến ban đầu.",
            "script": [
              {
                "s": "f",
                "t": "This morning was rough at the station."
              },
              {
                "s": "f",
                "t": "I thought the train would leave around 9:00, but I heard it would be delayed."
              },
              {
                "s": "f",
                "t": "It finally departed at 9:30, though some people said it might be even later.",
                "hl": 1
              },
              {
                "s": "f",
                "t": "Usually, if it's delayed, it could leave as late as 10:00."
              },
              {
                "s": "f",
                "t": "I'm glad it didn't take that long today!"
              }
            ]
          },
          {
            "q": "Someone is thinking about plans for the evening. What do they decide to do?",
            "o": [
              "Go to the movies",
              "Make plans later",
              "Stay at home"
            ],
            "a": 1,
            "e": "Phân vân giữa xem phim và ở nhà, muốn bàn với bạn trước: 'I'll wait and see what we want to do' → quyết định sau.",
            "script": [
              {
                "s": "m",
                "t": "I'm thinking about what to do this evening."
              },
              {
                "s": "m",
                "t": "I could go to the movies, but I'm not sure if that's the best idea."
              },
              {
                "s": "m",
                "t": "I might prefer to stay at home and relax."
              },
              {
                "s": "m",
                "t": "However, I want to discuss this with my friend first.",
                "hl": 1
              },
              {
                "s": "m",
                "t": "It might be better to plan when we can decide together."
              },
              {
                "s": "m",
                "t": "I believe keeping our options open is a good idea."
              },
              {
                "s": "m",
                "t": "So for now, I'll wait and see what we want to do.",
                "hl": 1
              }
            ]
          },
          {
            "q": "A woman is talking about her holiday plan. Where is she going on holiday?",
            "o": [
              "The beach",
              "The mountains",
              "The city"
            ],
            "a": 1,
            "e": "'I've made up my mind - I'm going to the mountains!' — biển chỉ là gợi ý của bạn bè.",
            "script": [
              {
                "s": "f",
                "t": "I'm so excited about my upcoming holiday!"
              },
              {
                "s": "f",
                "t": "I've been thinking about where to go for a long time."
              },
              {
                "s": "f",
                "t": "Some of my friends suggested going to a nice beach."
              },
              {
                "s": "f",
                "t": "Others talked about exploring interesting caves."
              },
              {
                "s": "f",
                "t": "But I've made up my mind - I'm going to the mountains!",
                "hl": 1
              },
              {
                "s": "f",
                "t": "The mountains are so beautiful with their green forests."
              },
              {
                "s": "f",
                "t": "I can't wait to breathe the fresh air up there."
              },
              {
                "s": "f",
                "t": "They are perfect for relaxing and enjoying nature."
              }
            ]
          },
          {
            "q": "A tour guide is talking about the group's travel schedule. Where will the group wait for the bus?",
            "o": [
              "By the hotel's main entrance",
              "In the lobby",
              "At the train station"
            ],
            "a": 0,
            "e": "'we'll meet at the hotel's main entrance to catch the bus' → ở cổng chính khách sạn.",
            "script": [
              {
                "s": "m",
                "t": "Good morning, everyone!"
              },
              {
                "s": "m",
                "t": "Let me walk you through today's schedule."
              },
              {
                "s": "m",
                "t": "First, we'll start the day at 9:00 AM with a visit to the City Museum, where you'll have about two hours to explore the exhibits."
              },
              {
                "s": "m",
                "t": "After that, at 12:30 PM, we'll head to the Central Park for a picnic lunch and a relaxing stroll."
              },
              {
                "s": "m",
                "t": "Around 3:00 PM, we'll make our way to the Old Town Market, where you can shop for souvenirs and enjoy some local treats."
              },
              {
                "s": "m",
                "t": "We'll wrap up our activities by 6:00 PM, giving you a little free time back at the hotel."
              },
              {
                "s": "m",
                "t": "Finally, at 8:00 PM, we'll meet at the hotel's main entrance to catch the bus to the airport.",
                "hl": 1
              },
              {
                "s": "m",
                "t": "Make sure to be on time, and we'll head to the airport together!"
              }
            ]
          },
          {
            "q": "Listen to a tour guide introducing the tour. Where will tea be served?",
            "o": [
              "In the park",
              "The hotel",
              "The river boat"
            ],
            "a": 2,
            "e": "'While on the boat, you can enjoy afternoon tea' → trên thuyền trên sông.",
            "script": [
              {
                "s": "f",
                "t": "Welcome to our scenic tour!"
              },
              {
                "s": "f",
                "t": "I'm excited to show you this beautiful area."
              },
              {
                "s": "f",
                "t": "We'll start along the coast to enjoy the amazing ocean views."
              },
              {
                "s": "f",
                "t": "Then, we'll go up to the mountain looking for some breathtaking views."
              },
              {
                "s": "f",
                "t": "After that, we'll head down to the harbor and take a relaxing riverboat cruise."
              },
              {
                "s": "f",
                "t": "While on the boat, you can enjoy afternoon tea and see the charming riverside scenery.",
                "hl": 1
              },
              {
                "s": "f",
                "t": "After the boat trip, we'll end the day with a walk on the beach."
              },
              {
                "s": "f",
                "t": "Don't forget your camera – there will be lots of chances for great photos!"
              }
            ]
          },
          {
            "q": "A man is talking about the city concert. How will the concert end?",
            "o": [
              "With a fireworks display",
              "With a famous singer",
              "With the city's favorite group"
            ],
            "a": 2,
            "e": "'The highlight ending will be the city's favorite group' — pháo hoa diễn ra trước đó ('before that').",
            "script": [
              {
                "s": "m",
                "t": "I can't wait for the concert this weekend!"
              },
              {
                "s": "m",
                "t": "It's going to be such an exciting event."
              },
              {
                "s": "m",
                "t": "The highlight ending will be the city's favorite group performing on stage.",
                "hl": 1
              },
              {
                "s": "m",
                "t": "I've heard they have some amazing songs planned."
              },
              {
                "s": "m",
                "t": "There will also be a fireworks performance to celebrate before that, and I'm sure the orchestra will do some singing as well."
              },
              {
                "s": "m",
                "t": "It's going to be a night to remember!"
              }
            ]
          },
          {
            "q": "What is the phone number of the store?",
            "o": [
              "201030",
              "102030",
              "301020"
            ],
            "a": 0,
            "e": "Phân vân 102030 hay 301020 rồi nhớ ra: 'I remember now – it's 201030!'.",
            "script": [
              {
                "s": "m",
                "t": "Hello, I need to call the teleshop for some information."
              },
              {
                "s": "m",
                "t": "My phone is not working."
              },
              {
                "s": "m",
                "t": "Can you remind me of the number?"
              },
              {
                "s": "m",
                "t": "I think it starts with twenty or ten or thirty something."
              },
              {
                "s": "m",
                "t": "Is it one-zero-two-zero-three-zero, or three-zero-one-zero-two-zero?"
              },
              {
                "s": "m",
                "t": "No, wait!"
              },
              {
                "s": "m",
                "t": "I remember now – it's two-zero-one-zero-three-zero!",
                "hl": 1
              },
              {
                "s": "m",
                "t": "I really need to order that new gadget."
              },
              {
                "s": "m",
                "t": "Thanks for your help!"
              }
            ]
          },
          {
            "q": "Alice is calling her friend. What did she lose?",
            "o": [
              "Book",
              "Phone",
              "Laptop"
            ],
            "a": 1,
            "e": "Sách và laptop vẫn còn: 'I can't find my phone anywhere!' → mất điện thoại.",
            "script": [
              {
                "s": "f",
                "t": "Hey, it's Alice."
              },
              {
                "s": "f",
                "t": "I think I might have left something at your house."
              },
              {
                "s": "f",
                "t": "I had my book with me."
              },
              {
                "s": "f",
                "t": "It's in my backpack."
              },
              {
                "s": "f",
                "t": "My laptop's here too."
              },
              {
                "s": "f",
                "t": "But I can't find my phone anywhere!",
                "hl": 1
              },
              {
                "s": "f",
                "t": "Did you happen to see it after I left?"
              },
              {
                "s": "f",
                "t": "I think I might have left it on the table."
              }
            ]
          },
          {
            "q": "Two people are talking about meeting for dinner. What time does Ahmed meet Rose?",
            "o": [
              "8:00 PM",
              "Quarter to eight",
              "7:30 PM"
            ],
            "a": 1,
            "e": "Họp kết thúc 7:30 nên đổi: 'Let's make it quarter to eight instead' → 7 giờ 45.",
            "script": [
              {
                "s": "m",
                "t": "Hi Rose."
              },
              {
                "s": "m",
                "t": "It's Ahmed, what time should we meet for dinner tonight?"
              },
              {
                "s": "m",
                "t": "How about we meet at quarter past seven instead?"
              },
              {
                "s": "m",
                "t": "Oh wait, I just remembered – I have a meeting ending at a half past seven."
              },
              {
                "s": "m",
                "t": "Let's make it quarter to eight instead so we could have 15 minutes to travel.",
                "hl": 1
              },
              {
                "s": "m",
                "t": "Does that work for you?"
              }
            ]
          },
          {
            "q": "A woman is talking about her family's holidays. What did the family do last year?",
            "o": [
              "Camping",
              "Beach trip",
              "Road trip"
            ],
            "a": 0,
            "e": "'Last year, we went camping on the mountain' — năm nay mới đi biển.",
            "script": [
              {
                "s": "f",
                "t": "This year, my family and I are going to the beach for our holiday."
              },
              {
                "s": "f",
                "t": "I'm really excited because I love swimming and relaxing by the sea."
              },
              {
                "s": "f",
                "t": "Last year, we went camping on the mountain, which was fun, but this time we wanted to do something different.",
                "hl": 1
              },
              {
                "s": "f",
                "t": "We're staying in a small house near the beach, and I can't wait to watch the sunset every evening."
              },
              {
                "s": "f",
                "t": "My kids are excited too; they want to build sandcastles and play in the water."
              },
              {
                "s": "f",
                "t": "I think it's going to be a great holiday!"
              }
            ]
          },
          {
            "q": "The woman is walking into a local store. How much are the cleaning products?",
            "o": [
              "Two pounds",
              "One pound fifty",
              "Three pounds"
            ],
            "a": 1,
            "e": "'today they're only one pound fifty' — cô ấy tưởng phải trả 3,50 bảng.",
            "script": [
              {
                "s": "f",
                "t": "As I walk into the store, I notice that the cleaning products are on sale."
              },
              {
                "s": "f",
                "t": "They're usually a bit more expensive, but today they're only one pound fifty.",
                "hl": 1
              },
              {
                "s": "f",
                "t": "I was expecting to pay three pounds fifty, so it's a nice surprise."
              },
              {
                "s": "f",
                "t": "I grab a few items since I know I'll need them later."
              },
              {
                "s": "f",
                "t": "It's a small store, but the deals are always good here."
              },
              {
                "s": "f",
                "t": "Time to check out!"
              }
            ]
          },
          {
            "q": "Mary is talking to her friend about her new home. What does she ask her friend about?",
            "o": [
              "Where to buy a coffee table",
              "Where to buy a sofa",
              "Where to buy curtains"
            ],
            "a": 0,
            "e": "'especially a coffee table. Do you know where to buy one?' → hỏi chỗ mua bàn cà phê (coffee table).",
            "script": [
              {
                "s": "f",
                "t": "Hi Ivan."
              },
              {
                "s": "f",
                "t": "It's Mary."
              },
              {
                "s": "f",
                "t": "I just moved into my new house."
              },
              {
                "s": "f",
                "t": "I want something nice for the dining area."
              },
              {
                "s": "f",
                "t": "I also saw a cute coffee shop nearby, and I'm thinking about getting a mirror for the living room."
              },
              {
                "s": "f",
                "t": "I need to get some furniture, especially a coffee table.",
                "hl": 1
              },
              {
                "s": "f",
                "t": "Do you know where to buy one?",
                "hl": 1
              }
            ]
          }
        ]
      },
      {
        "type": "speakers",
        "title": "Part 2 · Câu 14",
        "instr": "Bốn người nói về thói quen tập thể dục. Chọn câu mô tả đúng nhất mỗi người. Có 2 lựa chọn thừa.",
        "topic": "Exercise habits",
        "options": [
          "exercises mainly to spend time with friends",
          "started exercising on a doctor's advice",
          "feels exercise is simply not for them",
          "finds that exercise helps them work better",
          "prefers exercising outdoors rather than in a gym",
          "feels worn out after exercising"
        ],
        "speakers": [
          {
            "a": 2,
            "e": "Người A: 'I don't think exercise is something that suits me' — dù rảnh cũng không thích tập.",
            "script": [
              {
                "s": "m",
                "who": "A",
                "t": "My friends often advise me to exercise to maintain a good physique and health."
              },
              {
                "s": "m",
                "who": "A",
                "t": "However, I am very busy with a tight work schedule."
              },
              {
                "s": "m",
                "who": "A",
                "t": "Even if I weren't busy, I still wouldn't like to exercise."
              },
              {
                "s": "m",
                "who": "A",
                "t": "I feel uncomfortable as soon as I put on workout clothes."
              },
              {
                "s": "m",
                "who": "A",
                "t": "I don't think exercise is something that suits me."
              }
            ]
          },
          {
            "a": 3,
            "e": "Người B: 'exercising actually boosts my productivity a lot and really helps me focus better' → tập giúp làm việc hiệu quả hơn.",
            "script": [
              {
                "s": "f",
                "who": "B",
                "t": "I know that working out every day is good for my health and helps me get in shape."
              },
              {
                "s": "f",
                "who": "B",
                "t": "But what I've found is that exercising actually boosts my productivity a lot and really helps me focus better."
              },
              {
                "s": "f",
                "who": "B",
                "t": "So, I always try to squeeze in some exercise before heading to work – it definitely makes me more productive."
              }
            ]
          },
          {
            "a": 5,
            "e": "Người C: 'after I exercise, I end up feeling extremely exhausted' → kiệt sức sau khi tập.",
            "script": [
              {
                "s": "f",
                "who": "C",
                "t": "We've all heard about the many benefits of exercising, and I know about them too."
              },
              {
                "s": "f",
                "who": "C",
                "t": "My friends often invite me to work out, but after I exercise, I end up feeling extremely exhausted and spend the rest of the day just lying around to recover."
              }
            ]
          },
          {
            "a": 0,
            "e": "Người D: 'what really motivates me... is catching up with my friends there' → tập chủ yếu để gặp gỡ bạn bè.",
            "script": [
              {
                "s": "m",
                "who": "D",
                "t": "I often go to the gym to work out, but what really motivates me to work out is catching up with my friends there, not just for improving my health."
              },
              {
                "s": "m",
                "who": "D",
                "t": "Plus, it's a great way to meet and make new friends."
              },
              {
                "s": "m",
                "who": "D",
                "t": "For me, exercising is just another chance to socialize."
              }
            ]
          }
        ]
      },
      {
        "type": "conv",
        "title": "Part 3 · Câu 15",
        "instr": "Nghe hai người thảo luận về ca sĩ trẻ và âm nhạc. Ai bày tỏ ý kiến sau: người đàn ông (Man), người phụ nữ (Woman) hay cả hai (Both)?",
        "topic": "Young singers and music",
        "script": [
          {
            "s": "m",
            "t": "Did you hear about the concert last night? A lot of young people attended."
          },
          {
            "s": "f",
            "t": "Yes, I know about that concert; it was very popular. I don't understand why so many young people are so eager to attend. They're blindly idolizing young singers, and these idols don't really teach them anything good."
          },
          {
            "s": "m",
            "t": "I see it differently. The young singers today are very talented, and they do a lot of charitable work for society. I think young people look up to them and follow their example."
          },
          {
            "s": "f",
            "t": "Yes, they volunteer a lot, but they do it for the wrong reasons. They only want to boost their own fame."
          },
          {
            "s": "m",
            "t": "Oh, I think you don't like young singers because you don't enjoy their music, right?"
          },
          {
            "s": "f",
            "t": "Exactly, I only like listening to classical music from previous generations. I think music preferences are very personal and each generation has its own unique taste in music. But music is always a universal language that conveys emotions everyone can understand."
          },
          {
            "s": "m",
            "t": "I didn't study music like you, so I don't really have any ideas about this."
          },
          {
            "s": "f",
            "t": "You don't need to study music to understand it. Just think about why you cry during a sad movie scene when the music plays or why you feel energized when you hear a happy song. Isn't that right?"
          },
          {
            "s": "m",
            "t": "Yes, I think that's why films always try to include at least one piece of music."
          }
        ],
        "statements": [
          {
            "q": "Young singers set a good example for young people.",
            "a": "Man",
            "e": "Người đàn ông: 'young people look up to them and follow their example'; người phụ nữ cho rằng thần tượng 'don't really teach them anything good'."
          },
          {
            "q": "Young singers do charity work mainly to become more famous.",
            "a": "Woman",
            "e": "Người phụ nữ: 'they do it for the wrong reasons. They only want to boost their own fame'."
          },
          {
            "q": "Each generation has its own taste in music.",
            "a": "Woman",
            "e": "Người phụ nữ: 'each generation has its own unique taste in music'; người đàn ông nói mình không có ý kiến về chuyện này."
          },
          {
            "q": "Music has a strong effect on people's emotions.",
            "a": "Both",
            "e": "Người phụ nữ: nhạc khiến ta khóc hay thấy hứng khởi; người đàn ông đồng ý: 'Yes, I think that's why films always try to include at least one piece of music'."
          }
        ]
      },
      {
        "type": "mono",
        "title": "Part 4 · Câu 16–17",
        "instr": "Nghe bài nói và trả lời 2 câu hỏi cho mỗi bài.",
        "talks": [
          {
            "topic": "A research into happiness",
            "script": [
              {
                "s": "f",
                "t": "Research into happiness has attracted considerable attention, as scientists try to understand what truly contributes to people's sense of well-being."
              },
              {
                "s": "f",
                "t": "Although the topic appears frequently in newspapers and online articles, the way it is presented is often misleading."
              },
              {
                "s": "f",
                "t": "A common problem is that the media does not report the findings accurately."
              },
              {
                "s": "f",
                "t": "Instead, complex studies are simplified or taken out of context, with headlines focusing on surprising or appealing conclusions rather than the full picture."
              },
              {
                "s": "f",
                "t": "This can give the public an incomplete or even incorrect understanding of what the research actually shows."
              },
              {
                "s": "f",
                "t": "Regarding the overall value of this research, the speaker expresses a cautious opinion."
              },
              {
                "s": "f",
                "t": "While these studies offer interesting perspectives on human behavior and emotions, it seems unlikely that they will lead to a single, definitive answer."
              },
              {
                "s": "f",
                "t": "Happiness is a complex concept that varies greatly from person to person and is influenced by many different factors, including culture, lifestyle, and personal expectations."
              },
              {
                "s": "f",
                "t": "Because of this complexity, the research may continue to evolve, but it is unlikely to produce one clear conclusion that applies universally."
              }
            ],
            "questions": [
              {
                "q": "How has this research into happiness been responded to?",
                "o": [
                  "It has not been accurately reported by the media",
                  "It has been completely ignored by the public",
                  "It has led to immediate changes in government policy"
                ],
                "a": 0,
                "e": "'the media does not report the findings accurately' → truyền thông đưa tin không chính xác."
              },
              {
                "q": "What is the speaker's opinion on this research in general?",
                "o": [
                  "The research is unlikely to find a conclusive answer",
                  "The research has already changed public attitudes",
                  "The researchers are biased in their approach"
                ],
                "a": 0,
                "e": "'it seems unlikely that they will lead to a single, definitive answer' → khó tìm ra kết luận chắc chắn."
              }
            ]
          },
          {
            "topic": "Criticism of the new novel",
            "script": [
              {
                "s": "m",
                "t": "The new novel has recently received a great deal of attention from readers and critics alike."
              },
              {
                "s": "m",
                "t": "One of the main reasons it has attracted such interest is the strength of its characters."
              },
              {
                "s": "m",
                "t": "Rather than relying on complex plots or detailed background information, the story focuses on creating individuals who feel realistic and engaging."
              },
              {
                "s": "m",
                "t": "Readers are drawn to these characters because of their unique personalities and emotional depth, which makes it easier to connect with the story and remain interested throughout."
              },
              {
                "s": "m",
                "t": "As for the overall opinion of the novel, the speaker is quite positive about its potential impact."
              },
              {
                "s": "m",
                "t": "Although it may not be perfect in every aspect, it is believed that the book will play an important role in increasing the author's recognition."
              },
              {
                "s": "m",
                "t": "In fact, the success of this novel is likely to help establish the author's popularity among a wider audience."
              },
              {
                "s": "m",
                "t": "With strong character development and an engaging narrative style, the book has the potential to become a significant milestone in the writer's career."
              }
            ],
            "questions": [
              {
                "q": "What attracts readers to this novel?",
                "o": [
                  "The characters were interesting",
                  "The book includes detailed historical facts",
                  "The chapters are very short and easy to read"
                ],
                "a": 0,
                "e": "'Readers are drawn to these characters because of their unique personalities' → nhân vật hấp dẫn."
              },
              {
                "q": "What is the speaker's opinion about this novel?",
                "o": [
                  "It will establish the author's popularity",
                  "It needs major editing before publication",
                  "It's unlikely to appeal to international readers"
                ],
                "a": 0,
                "e": "'likely to help establish the author' — cuốn sách sẽ giúp tác giả được nhiều người biết đến hơn."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "l11",
    "title": "Đề 10 — Jobs, art and politics",
    "parts": [
      {
        "type": "mcq",
        "title": "Part 1 · Câu 1–13",
        "instr": "Nghe đoạn ngắn và chọn đáp án đúng. Mỗi đoạn nghe tối đa 2 lần.",
        "items": [
          {
            "q": "A man is talking about his jobs. What does the man want to do next?",
            "o": [
              "Become a history teacher",
              "Become a writer",
              "Become a chef"
            ],
            "a": 1,
            "e": "'Now, I want to become a writer!' → công việc tiếp theo là nhà văn; đầu bếp và giáo viên lịch sử là việc đã làm.",
            "script": [
              {
                "s": "m",
                "t": "I used to be a chef, and I loved cooking different dishes for people. It was exciting to create new recipes, but it was also very hard work. After that, I became a history teacher, where I enjoyed sharing stories about the past with my students. Teaching was rewarding, but I wanted to try something new."
              },
              {
                "s": "m",
                "t": "Now, I want to become a writer! I have many ideas for stories in my mind, and I can't wait to put them on paper.",
                "hl": 1
              }
            ]
          },
          {
            "q": "Lucy is calling her brother. What does Lucy remind her brother to drink?",
            "o": [
              "Tea",
              "Water",
              "Coffee"
            ],
            "a": 1,
            "e": "'I'm worried that you're not drinking enough water' → Lucy nhắc em trai uống đủ nước.",
            "script": [
              {
                "s": "f",
                "t": "Hi, Jake! It's Lucy. I just wanted to check in on you. How are you doing? I know you've been busy with work and school lately."
              },
              {
                "s": "f",
                "t": "I'm worried that you're not drinking enough water. Staying hydrated is really important, especially when you're working hard! Remember to keep a bottle with you.",
                "hl": 1
              },
              {
                "s": "f",
                "t": "Anyway, I hope you're taking care of yourself. Let's catch up soon!"
              }
            ]
          },
          {
            "q": "What will she do?",
            "o": [
              "Go to work",
              "Go for a drive",
              "Stay home"
            ],
            "a": 1,
            "e": "'so she will go for a drive' → cô ấy sẽ lái xe đi dạo để thư giãn.",
            "script": [
              {
                "s": "f",
                "t": "She's planning to spend some time relaxing, so she will go for a drive.",
                "hl": 1
              },
              {
                "s": "f",
                "t": "It's a great way for her to unwind, enjoy some fresh air, and clear her mind."
              }
            ]
          },
          {
            "q": "Lucy is calling her friend. What does Lucy's sister look like?",
            "o": [
              "She is taller than Lucy",
              "She looks just like Lucy",
              "She looks very different from Lucy"
            ],
            "a": 1,
            "e": "'She looks just like me, so you'll recognize her easily' → em gái trông giống hệt Lucy.",
            "script": [
              {
                "s": "f",
                "t": "Hi Emma, it's Lucy. I hope you're doing well! I need a small favor from you today. Could you pick up my sister after school? She'll be standing at the school gate at 3 P.M."
              },
              {
                "s": "f",
                "t": "She looks just like me, so you'll recognize her easily.",
                "hl": 1
              },
              {
                "s": "f",
                "t": "I have a meeting, and I won't make it in time. Thank you so much! Let me know if that's okay with you."
              }
            ]
          },
          {
            "q": "A man and a woman are going shopping. What does he buy in the store?",
            "o": [
              "A T-shirt",
              "A suit for the office",
              "A hat"
            ],
            "a": 1,
            "e": "'I really need a suit for the office' và 'I'll buy the suit' → anh ấy mua một bộ vest đi làm.",
            "script": [
              {
                "s": "m",
                "t": "Hey, Sarah! Let's check out this store. I need something for work."
              },
              {
                "s": "f",
                "t": "Sure, John. How about this T-shirt? It looks nice."
              },
              {
                "s": "m",
                "t": "Hmm, it's cool, but I don't really need a T-shirt right now. I'm actually looking for something more formal."
              },
              {
                "s": "f",
                "t": "Oh, okay. What about this hat? It would look great on you."
              },
              {
                "s": "m",
                "t": "Haha, maybe, but not today. I really need a suit for the office. Look, this one seems perfect.",
                "hl": 1
              },
              {
                "s": "f",
                "t": "That's a good choice! It's smart and looks comfortable."
              },
              {
                "s": "m",
                "t": "Great! I'll buy the suit. Let's keep looking for other things we might need.",
                "hl": 1
              }
            ]
          },
          {
            "q": "A tour guide is talking about birds' behaviors. What do birds do in the winter?",
            "o": [
              "They stay together in groups for protection",
              "They fly south",
              "They hunt for food"
            ],
            "a": 0,
            "e": "'In winter, birds tend to stay together in groups for protection from predators' → mùa đông chúng ở thành đàn để tự vệ; bay về phía nam là vào mùa thu.",
            "script": [
              {
                "s": "f",
                "t": "Welcome, everyone! Today, we'll explore some interesting bird behaviors throughout the year. In spring, birds are busy building nests and finding mates, preparing for the arrival of their young. During summer, they're focused on feeding their chicks and teaching them how to fly. As autumn approaches, many birds begin to migrate, gathering food and energy for their long trips south."
              },
              {
                "s": "f",
                "t": "In winter, birds tend to stay together in groups for protection from predators.",
                "hl": 1
              },
              {
                "s": "f",
                "t": "Each season brings out different survival strategies in these amazing creatures!"
              }
            ]
          },
          {
            "q": "How much are the eggs?",
            "o": [
              "2 pounds",
              "3 pounds",
              "1.50 pounds"
            ],
            "a": 2,
            "e": "'they cost one pound fifty' → 1,50 bảng.",
            "script": [
              {
                "s": "m",
                "t": "The eggs are a bit more expensive than usual, but they cost one pound fifty.",
                "hl": 1
              },
              {
                "s": "m",
                "t": "They're from a local farm, so the quality is great."
              }
            ]
          },
          {
            "q": "A woman is calling her husband. What time is lunch ready?",
            "o": [
              "3pm",
              "1pm",
              "2pm"
            ],
            "a": 2,
            "e": "'lunch will be ready at 2pm' → bữa trưa sẵn sàng lúc 2 giờ chiều.",
            "script": [
              {
                "s": "f",
                "t": "Hi, just wanted to let you know that lunch will be ready at 2pm.",
                "hl": 1
              },
              {
                "s": "f",
                "t": "I've just finished cooking, and everything is set. So, whenever you're ready, we can sit down and eat."
              }
            ]
          },
          {
            "q": "A man is talking about his weekend. Where did he go on Sunday?",
            "o": [
              "To the lake",
              "To the cinema",
              "To his office"
            ],
            "a": 0,
            "e": "'On Sunday I went to the lake with my cousins' → Chủ nhật anh ấy đi hồ cùng các anh em họ.",
            "script": [
              {
                "s": "m",
                "t": "Last weekend was really busy. On Saturday I stayed at home and cleaned the flat."
              },
              {
                "s": "m",
                "t": "On Sunday I went to the lake with my cousins and we had a picnic.",
                "hl": 1
              },
              {
                "s": "m",
                "t": "It was sunny, so we stayed there until the evening."
              }
            ]
          },
          {
            "q": "A man is giving directions to a friend about how to get to the football club. The football club is near?",
            "o": [
              "A river",
              "A park",
              "A shopping mall"
            ],
            "a": 1,
            "e": "'The football club is right after that, next to the park' → câu lạc bộ bóng đá nằm cạnh công viên.",
            "script": [
              {
                "s": "m",
                "t": "To get to the football club, you just need to head down Main Street. Go past the grocery store on your left, and then take a right at the traffic light. You'll see the library on your right; just keep going straight."
              },
              {
                "s": "m",
                "t": "The football club is right after that, next to the park.",
                "hl": 1
              },
              {
                "s": "m",
                "t": "It's pretty easy to find!"
              }
            ]
          },
          {
            "q": "A boy is talking about his cat. What does he feed the cat?",
            "o": [
              "Mice",
              "Fish",
              "Birds"
            ],
            "a": 1,
            "e": "'he absolutely loves fish. Every time I give him some' → cho mèo ăn cá; mèo không thích ăn chuột.",
            "script": [
              {
                "s": "m",
                "t": "Hi, I'm Alex, and I want to tell you about my cat, Whiskers. He's really friendly and loves to play. Whiskers is a bit picky about food, though. He doesn't like eating mice or insects, which is funny for a cat!"
              },
              {
                "s": "m",
                "t": "But he absolutely loves fish. Every time I give him some, he gets so excited!",
                "hl": 1
              },
              {
                "s": "m",
                "t": "He also enjoys sleeping by the window and watching the birds outside. He's the best pet ever!"
              }
            ]
          },
          {
            "q": "Jack is phoning his mom. What does Jack need to buy for his sister?",
            "o": [
              "Clothes",
              "Chocolates",
              "A toy"
            ],
            "a": 1,
            "e": "'I need to buy some chocolates for my sister's birthday' → mua sô-cô-la cho sinh nhật chị/em gái.",
            "script": [
              {
                "s": "m",
                "t": "Hi, Mom! It's Jack. I hope you're doing well!"
              },
              {
                "s": "m",
                "t": "I'm out shopping, and I need to buy some chocolates for my sister's birthday.",
                "hl": 1
              },
              {
                "s": "m",
                "t": "She loves dark chocolate, so I want to get her some nice ones. By the way, do you need anything while I'm here? I can pick up some milk or fruit if you want. Let me know! I'll talk to you soon!"
              }
            ]
          },
          {
            "q": "A person is talking about an old manager, George. What was George like as a manager?",
            "o": [
              "Very strict with everyone",
              "Smart, with high expectations",
              "Not interested in training staff"
            ],
            "a": 1,
            "e": "'He was a very smart man' và 'George was not very strict, but he had high expectations' → thông minh, không quá nghiêm nhưng kỳ vọng cao.",
            "script": [
              {
                "s": "f",
                "t": "You know, I want to talk about my old manager, George. He was a very smart man, and he taught me a lot about work. I remember the first time I joined the team; he showed me how to do my job well.",
                "hl": 1
              },
              {
                "s": "f",
                "t": "George was not very strict, but he had high expectations.",
                "hl": 1
              },
              {
                "s": "f",
                "t": "I learned to be better because of him. Overall, I am thankful for his guidance and support during my early days."
              }
            ]
          }
        ]
      },
      {
        "type": "speakers",
        "title": "Part 2 · Câu 14",
        "instr": "Bốn người nói về nghệ thuật và vẽ. Chọn câu mô tả đúng nhất mỗi người. Có 2 lựa chọn thừa.",
        "topic": "Art and drawing",
        "options": [
          "Teaches poor children to draw as a volunteer",
          "Draws with their children to bond with them",
          "Adds illustrations to their own books",
          "Prefers to practise drawing alone to stay focused",
          "Sells paintings at an art gallery",
          "Uses drawing to relax after work"
        ],
        "speakers": [
          {
            "a": 0,
            "e": "Người A: 'a volunteer organization that specializes in teaching art to poor children' → làm tình nguyện dạy vẽ cho trẻ em nghèo.",
            "script": [
              {
                "s": "f",
                "who": "A",
                "t": "I personally don't like and don't have a talent for fine arts, especially painting. But I see it as a great way to engage in social charity activities. I'm passionate about teaching children how to draw because I love kids. I'm also part of a volunteer organization that specializes in teaching art to poor children, which makes me very happy."
              }
            ]
          },
          {
            "a": 1,
            "e": "Người B: 'drawing with my children is a great way to understand them better' → vẽ cùng con để gắn kết.",
            "script": [
              {
                "s": "m",
                "who": "B",
                "t": "I think drawing with my children is a great way to understand them better. No matter how busy my work is, I always make time to sit and draw with my kids. This helps us bond more and gives me the chance to talk with them more."
              }
            ]
          },
          {
            "a": 2,
            "e": "Người C: 'I occasionally include some illustrations to make the book more vivid' → thêm tranh minh họa vào sách của mình.",
            "script": [
              {
                "s": "f",
                "who": "C",
                "t": "I've loved literature, art, and drawing since I was a child. Now, I'm a writer and a comic book creator. In my stories, I occasionally include some illustrations to make the book more vivid and lively."
              }
            ]
          },
          {
            "a": 3,
            "e": "Người D: 'I prefer not to draw with friends' và 'I want to focus entirely on my work' → thích vẽ một mình để tập trung.",
            "script": [
              {
                "s": "m",
                "who": "D",
                "t": "I'm currently taking a drawing course and I really want to be serious about it. When practicing drawing, I prefer not to draw with friends, even though they often invite me to join them. I want to focus entirely on my work."
              }
            ]
          }
        ]
      },
      {
        "type": "conv",
        "title": "Part 3 · Câu 15",
        "instr": "Nghe hai người thảo luận về chính trị và công nghệ. Ai bày tỏ ý kiến sau: người đàn ông (Man), người phụ nữ (Woman) hay cả hai (Both)?",
        "topic": "Politics and technology",
        "script": [
          {
            "s": "m",
            "t": "Have you heard about the upcoming presidential election? A lot of young people have already voted, which shows that they're becoming more interested in politics."
          },
          {
            "s": "f",
            "t": "Yes, it's very different from our time. When I was 18, I never paid attention to politics."
          },
          {
            "s": "m",
            "t": "The technology era now gives us so many ways to engage with politics. Politicians often post their political activities on social media much more than they did in the past."
          },
          {
            "s": "f",
            "t": "Actually, politicians still carry out traditional political activities too. They still hand out flyers and participate in volunteer work."
          },
          {
            "s": "m",
            "t": "The development of information technology also overwhelms us with information. There's so much news online that we don't know what to read. This makes keeping up with political news much more challenging than before."
          },
          {
            "s": "f",
            "t": "I think that as technology advances, it becomes easier for us to stay updated on the news. Technology allows us to use advanced filters to easily sort out the news we need to know."
          },
          {
            "s": "m",
            "t": "There are also more women involved in politics now than before. It seems society has become more open to women."
          },
          {
            "s": "f",
            "t": "Exactly. Women have the same education and learning abilities as men. They even lead in many areas of life. In the future, more and more women will be participating in political activities."
          }
        ],
        "statements": [
          {
            "q": "Politicians still carry out traditional activities such as handing out flyers.",
            "a": "Woman",
            "e": "Người phụ nữ: 'politicians still carry out traditional political activities too. They still hand out flyers'; người đàn ông chỉ nhắc đến mạng xã hội."
          },
          {
            "q": "Too much online information makes it harder to keep up with political news.",
            "a": "Man",
            "e": "Người đàn ông: 'overwhelms us with information' và 'keeping up with political news much more challenging'; người phụ nữ nghĩ ngược lại."
          },
          {
            "q": "Technology makes it easier to stay updated on the news.",
            "a": "Woman",
            "e": "Người phụ nữ: 'as technology advances, it becomes easier for us to stay updated on the news'; người đàn ông cho rằng khó hơn."
          },
          {
            "q": "More women are taking part in politics than before.",
            "a": "Both",
            "e": "Người đàn ông: 'more women involved in politics now than before'; người phụ nữ: 'Exactly... more and more women will be participating'."
          }
        ]
      },
      {
        "type": "mono",
        "title": "Part 4 · Câu 16–17",
        "instr": "Nghe bài nói và trả lời 2 câu hỏi cho mỗi bài.",
        "talks": [
          {
            "topic": "Making plans",
            "script": [
              {
                "s": "f",
                "t": "Creating small plans is an effective way to stay organized and make better decisions. When tasks are broken down into smaller steps, it becomes easier to focus on what needs to be done next. This approach reduces confusion and helps you choose the most suitable actions at each stage. As a result, you can manage your time more efficiently and avoid feeling overwhelmed."
              },
              {
                "s": "f",
                "t": "In general, making a plan also requires you to set certain limits for yourself. These limits help you stay disciplined and focused on your goals instead of getting distracted. By clearly defining what you can and cannot do within a given time, you are more likely to maintain steady progress. This structure not only improves productivity but also helps you build good habits over time."
              }
            ],
            "questions": [
              {
                "q": "How does creating each small plan help you?",
                "o": [
                  "They help you make decisions",
                  "They increase your workload",
                  "They delay overall progress"
                ],
                "a": 0,
                "e": "'stay organized and make better decisions' → các kế hoạch nhỏ giúp bạn ra quyết định tốt hơn."
              },
              {
                "q": "How does creating a plan help you in general?",
                "o": [
                  "It requires you to set yourself certain limits",
                  "It removes all risks from the process",
                  "It guarantees immediate success"
                ],
                "a": 0,
                "e": "'requires you to set certain limits for yourself' → lập kế hoạch buộc bạn đặt ra những giới hạn nhất định."
              }
            ]
          },
          {
            "topic": "A promotion campaign for a product",
            "script": [
              {
                "s": "m",
                "t": "In my opinion, this promotion campaign is making exaggerated claims about the product, and that is a major problem. When I watch the advertisements, they seem to promise results that are far too good to be true. Because of this, I feel that many people would become skeptical rather than convinced. Instead of building trust with potential customers, the campaign actually creates doubt, as people may question whether the product can really deliver what is being advertised."
              },
              {
                "s": "m",
                "t": "Personally, I think that honesty and realism are much more effective in the long term, so this approach could damage the brand's reputation. In addition to that, I believe the campaign costs too much to make to be profitable. Even if it manages to attract a lot of attention, the company is likely spending a huge amount of money on production, marketing, and distribution. From my perspective, this is not a smart investment because the return may not be high enough to justify such expenses. I would say that a simpler and more cost-effective campaign could achieve similar results without putting so much financial pressure on the company. Overall, I think the strategy is inefficient and needs to be reconsidered."
              }
            ],
            "questions": [
              {
                "q": "What do people think about this promotion campaign?",
                "o": [
                  "It is making exaggerated claims",
                  "It is being ignored completely",
                  "It is too simple to be effective"
                ],
                "a": 0,
                "e": "'this promotion campaign is making exaggerated claims about the product' → quảng cáo bị cho là phóng đại."
              },
              {
                "q": "What does the speaker think about this campaign?",
                "o": [
                  "It costs too much to make to be profitable",
                  "It is reaching the wrong audience",
                  "It lacks creativity"
                ],
                "a": 0,
                "e": "'the campaign costs too much to make to be profitable' → chi phí làm quá cao nên khó có lợi nhuận."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "l12",
    "title": "Đề 11 — Places to study & communities",
    "parts": [
      {
        "type": "mcq",
        "title": "Part 1 · Câu 1–13",
        "instr": "Nghe đoạn ngắn và chọn đáp án đúng. Mỗi đoạn nghe tối đa 2 lần.",
        "items": [
          {
            "q": "Listen to a principal talking about new school facilities. What new facility will the school have?",
            "o": [
              "A new library",
              "A sports field",
              "A performance space"
            ],
            "a": 2,
            "e": "Trường đã có thư viện và sân thể thao; cái mới là 'a new performance space for plays, concerts' → không gian biểu diễn.",
            "script": [
              {
                "s": "m",
                "t": "Our school is getting some exciting new facilities."
              },
              {
                "s": "m",
                "t": "We already have a library and a sports field, but we're adding something different now."
              },
              {
                "s": "m",
                "t": "The school will have a new performance space for plays, concerts, and other events.",
                "hl": 1
              },
              {
                "s": "m",
                "t": "It's going to be a great addition for the students."
              },
              {
                "s": "m",
                "t": "We're really looking forward to seeing it finished!"
              }
            ]
          },
          {
            "q": "What does he advise young people to do to save money?",
            "o": [
              "Use public transportation",
              "Buy second-hand items",
              "Cook for themselves"
            ],
            "a": 2,
            "e": "'save money by cooking for themselves' → tự nấu ăn thay vì ăn ngoài.",
            "script": [
              {
                "s": "f",
                "t": "He often advises young people to save money by cooking for themselves.",
                "hl": 1
              },
              {
                "s": "f",
                "t": "Instead of eating out frequently, cooking at home can help cut down on unnecessary expenses and improve financial habits."
              }
            ]
          },
          {
            "q": "Listen to a man talking about his business trip. What does he like in Dubai?",
            "o": [
              "He enjoys shopping",
              "He enjoys his job here",
              "He enjoys the weather"
            ],
            "a": 1,
            "e": "'I really enjoy my work here' và 'the work itself is what keeps me happy' → anh ấy thích công việc ở đây.",
            "script": [
              {
                "s": "m",
                "t": "I've been living in Dubai for about two years now, and I really enjoy my work here.",
                "hl": 1
              },
              {
                "s": "m",
                "t": "It's challenging, but that's what makes it exciting."
              },
              {
                "s": "m",
                "t": "The company I work for is great, and I get to meet people from all over the world."
              },
              {
                "s": "m",
                "t": "The food is also amazing, but the work itself is what keeps me happy.",
                "hl": 1
              },
              {
                "s": "m",
                "t": "I can see myself staying here for a long time because I feel lucky to do what I love."
              }
            ]
          },
          {
            "q": "Listen to a conversation between the teacher and a parent. What will the father do?",
            "o": [
              "Change schools",
              "Arrange private classes",
              "Help his son with homework himself"
            ],
            "a": 1,
            "e": "Cô giáo giới thiệu 'a private tutor', người cha đồng ý 'That sounds like a good idea!' và xin số liên lạc → thuê gia sư học thêm.",
            "script": [
              {
                "s": "f",
                "t": "Hello, Mr. Johnson. Thank you for coming in today. I wanted to talk about your son, Jake."
              },
              {
                "s": "m",
                "t": "Hi, Mrs. Lee. Yes, I've noticed he's been struggling a bit lately."
              },
              {
                "s": "f",
                "t": "Yes, his performance is not so good in math and reading. He seems to have some difficulties understanding the lessons."
              },
              {
                "s": "m",
                "t": "I'm worried about that. What can we do to help him?"
              },
              {
                "s": "f",
                "t": "I know a private tutor who works well with children. She can provide extra help and support.",
                "hl": 1
              },
              {
                "s": "m",
                "t": "That sounds like a good idea! Can you give me her contact information?",
                "hl": 1
              },
              {
                "s": "f",
                "t": "Of course! I will write it down for you. I think Jake will really benefit from it."
              }
            ]
          },
          {
            "q": "A woman is talking about her job. What first made her want to become a chef?",
            "o": [
              "A cooking show on TV",
              "Her grandmother's cooking",
              "A school trip to a restaurant"
            ],
            "a": 1,
            "e": "'I spent every Sunday in my grandmother's kitchen' → chính những buổi xem bà nấu ăn khiến cô muốn làm đầu bếp; chương trình TV và chuyến đi tới nhà hàng chỉ được nhắc lướt qua.",
            "script": [
              {
                "s": "f",
                "t": "I've always loved food, but there was one thing that really made me want to cook for a living.",
                "hl": 1
              },
              {
                "s": "f",
                "t": "As a girl, I spent every Sunday in my grandmother's kitchen, watching her make every dish from memory.",
                "hl": 1
              },
              {
                "s": "f",
                "t": "It sparked my curiosity about flavours."
              },
              {
                "s": "f",
                "t": "My school once took us to a restaurant, and I enjoy cooking shows on TV now."
              },
              {
                "s": "f",
                "t": "Of course, those were fun, but nothing beat those Sundays; that is where it all began.",
                "hl": 1
              }
            ]
          },
          {
            "q": "Listen to David talking about a charity run. How far did he run?",
            "o": [
              "5 kilometres",
              "10 kilometres",
              "15 kilometres"
            ],
            "a": 2,
            "e": "'My own run was fifteen kilometres, longer than I had ever done before' → 15 km.",
            "script": [
              {
                "s": "m",
                "t": "Hello everyone. Today, I want to tell you about the charity run that took place last weekend."
              },
              {
                "s": "m",
                "t": "It was very well organised, and many people took part."
              },
              {
                "s": "m",
                "t": "I ran for the children's hospital. I had trained for weeks, but I still had a lot to learn about pacing."
              },
              {
                "s": "m",
                "t": "The other runners were doing five or ten kilometres, and some were walking the short route."
              },
              {
                "s": "m",
                "t": "After the race, there was music and free fruit for everyone."
              },
              {
                "s": "m",
                "t": "My own run was fifteen kilometres, longer than I had ever done before.",
                "hl": 1
              },
              {
                "s": "m",
                "t": "However, the crowd was very friendly, and I was happy to finish."
              }
            ]
          },
          {
            "q": "A man is talking about his holiday. How is he going to travel to the city?",
            "o": [
              "By car",
              "By bus",
              "By train"
            ],
            "a": 1,
            "e": "'I will travel by bus, which is fun and also very cheap' → đi xe buýt.",
            "script": [
              {
                "s": "m",
                "t": "Hello, everyone! I want to share my plans for the holiday."
              },
              {
                "s": "m",
                "t": "This year, I'm going to travel to the city for a few days. I'm very excited because I love exploring new places."
              },
              {
                "s": "m",
                "t": "I plan to visit some interesting museums and try different foods at local restaurants."
              },
              {
                "s": "m",
                "t": "The best part is that I will travel by bus, which is fun and also very cheap!",
                "hl": 1
              },
              {
                "s": "m",
                "t": "I will leave early in the morning to enjoy the day."
              },
              {
                "s": "m",
                "t": "I can't wait to see all the sights and take lots of pictures! It will be an amazing holiday!"
              }
            ]
          },
          {
            "q": "Lily is talking about her daily routine. What will she do this evening?",
            "o": [
              "Do yoga",
              "Go for a walk",
              "Meet her friends"
            ],
            "a": 0,
            "e": "Thường thì cô đi dạo, 'but today I'm going to try something different – I'll do some yoga at home' → tối nay tập yoga.",
            "script": [
              {
                "s": "f",
                "t": "Hi, I'm Lily, and I want to tell you about my daily routine."
              },
              {
                "s": "f",
                "t": "I wake up early around 6:30 A.M. and have breakfast before going to work."
              },
              {
                "s": "f",
                "t": "I work in a small office, and my job keeps me busy until about 5 P.M."
              },
              {
                "s": "f",
                "t": "After dinner, I usually go for a walk to relax, but today I'm going to try something different – I'll do some yoga at home.",
                "hl": 1
              },
              {
                "s": "f",
                "t": "It sounds fun and peaceful. After that, I'll probably watch a movie before going to bed."
              },
              {
                "s": "f",
                "t": "It's a simple day, but I like it!"
              }
            ]
          },
          {
            "q": "A man and a woman are talking about their old school days. What was the man's favorite thing about school?",
            "o": [
              "Math classes",
              "Sports",
              "History classes"
            ],
            "a": 2,
            "e": "Người đàn ông: 'I loved history. Actually, those classes were the ones I remember the most' → giờ học lịch sử; toán là môn dở nhất của người phụ nữ.",
            "script": [
              {
                "s": "f",
                "t": "What do you remember most about our school days?"
              },
              {
                "s": "m",
                "t": "Honestly, I don't remember much."
              },
              {
                "s": "f",
                "t": "I remember that I was terrible at math! It was my worst subject. Also, I remember that you were really good at history."
              },
              {
                "s": "m",
                "t": "That's right! I loved history. Actually, those classes were the ones I remember the most. All those stories and events were so fascinating!",
                "hl": 1
              }
            ]
          },
          {
            "q": "Listen to a radio man talking about a new popular song. Which is the most attractive part of the song?",
            "o": [
              "The words",
              "The beat",
              "The instruments"
            ],
            "a": 0,
            "e": "'the most attractive part of all is the words' → lời bài hát.",
            "script": [
              {
                "s": "m",
                "t": "Good evening, listeners! Today, I want to talk about a new song that's quickly becoming popular – You're my everything."
              },
              {
                "s": "m",
                "t": "The tune is really catchy, and it makes you want to dance right away."
              },
              {
                "s": "m",
                "t": "The instruments used are simple but create a great rhythm."
              },
              {
                "s": "m",
                "t": "However, the most attractive part of all is the words. The lyrics tell a beautiful story that everyone can relate to.",
                "hl": 1
              },
              {
                "s": "m",
                "t": "It's no wonder so many people are loving this song! If you haven't heard it yet, make sure to give it a listen soon!"
              }
            ]
          },
          {
            "q": "Listen to the announcement. When does the train leave the station?",
            "o": [
              "9:15",
              "9:30",
              "9:00"
            ],
            "a": 0,
            "e": "Thông báo: 'The train to London will now leave at 9:15, not 9:30 as planned' → tàu rời ga lúc 9:15 (9:30 là giờ cũ).",
            "script": [
              {
                "s": "f",
                "t": "Good morning, everyone. This is an important announcement about a change in the train schedule."
              },
              {
                "s": "f",
                "t": "The train to London will now leave at 9:15, not 9:30 as planned.",
                "hl": 1
              },
              {
                "s": "f",
                "t": "Please listen carefully to this information. If you are taking this train, please go to Platform 3 now."
              },
              {
                "s": "f",
                "t": "Thank you for your attention, and have a good day."
              }
            ]
          },
          {
            "q": "Lucy is calling her friend. What is her sister like?",
            "o": [
              "They have different hair colors",
              "They look very similar",
              "They are very different"
            ],
            "a": 1,
            "e": "'She looks just like me, so you'll recognize her easily' → hai chị em trông rất giống nhau.",
            "script": [
              {
                "s": "f",
                "t": "Hi Emma, it's Lucy. I hope you're doing well! I need a small favor from you today."
              },
              {
                "s": "f",
                "t": "Could you pick up my sister after school? She'll be standing at the school gate at 3 P.M."
              },
              {
                "s": "f",
                "t": "She looks just like me, so you'll recognize her easily.",
                "hl": 1
              },
              {
                "s": "f",
                "t": "I have a meeting, and I won't make it in time. Thank you so much! Let me know if that's okay with you."
              }
            ]
          },
          {
            "q": "An expert is talking about lack of satisfaction at work. What should be the solution?",
            "o": [
              "Request a transfer",
              "Take a vacation",
              "Find a new job"
            ],
            "a": 0,
            "e": "Tìm việc mới thì căng thẳng; 'One option is to ask for a transfer to another branch' → xin chuyển chi nhánh.",
            "script": [
              {
                "s": "m",
                "t": "Many people feel unhappy at work, and often, they think a higher salary or less work will fix it. But that's not always the solution."
              },
              {
                "s": "m",
                "t": "Sometimes, the problem is the work environment. A change of place can help improve how we feel at work."
              },
              {
                "s": "m",
                "t": "However, looking for a new job can be stressful and take time."
              },
              {
                "s": "m",
                "t": "One option is to ask for a transfer to another branch within the same company.",
                "hl": 1
              },
              {
                "s": "m",
                "t": "This can offer the same benefits as getting a new job, without the challenges of starting over somewhere new."
              }
            ]
          }
        ]
      },
      {
        "type": "speakers",
        "title": "Part 2 · Câu 14",
        "instr": "Bốn người nói về nơi họ thích học bài. Chọn câu mô tả đúng nhất mỗi người. Có 2 lựa chọn thừa.",
        "topic": "Preferred places to study",
        "options": [
          "studies while travelling to school",
          "needs a quiet place to concentrate",
          "studies in the library with friends",
          "feels more motivated around other people",
          "prefers studying outdoors",
          "usually studies late at night"
        ],
        "speakers": [
          {
            "a": 3,
            "e": "Người A: 'the presence of other people makes me feel more motivated' → học ở quán cà phê vì có người xung quanh thấy có động lực.",
            "script": [
              {
                "s": "m",
                "who": "A",
                "t": "I don't like studying in very quiet places such as at home or in the library because I get sleepy easily and might even fall asleep while studying."
              },
              {
                "s": "m",
                "who": "A",
                "t": "There's a coffee shop near my house, and I often go there to study because the presence of other people makes me feel more motivated."
              },
              {
                "s": "m",
                "who": "A",
                "t": "I find that I achieve higher productivity and efficiency in my studies when I'm there."
              }
            ]
          },
          {
            "a": 4,
            "e": "Người B: 'I prefer sitting under the trees in the park to study – it's cool, and the air is fresh' → thích học ngoài trời.",
            "script": [
              {
                "s": "f",
                "who": "B",
                "t": "I notice that most people prefer doing their homework in the classroom, but for me, those chairs are way too hard and leave me sore all day."
              },
              {
                "s": "f",
                "who": "B",
                "t": "I prefer sitting under the trees in the park to study – it's cool, and the air is fresh."
              },
              {
                "s": "f",
                "who": "B",
                "t": "There's a famous coffee shop across from where I sit, and they serve really good coffee."
              }
            ]
          },
          {
            "a": 0,
            "e": "Người C: 'when I'm on the train, I use the time to do homework' → học trên đường đến trường.",
            "script": [
              {
                "s": "m",
                "who": "C",
                "t": "The distance from my house to school is twenty kilometres, and it usually takes me an hour to get there."
              },
              {
                "s": "m",
                "who": "C",
                "t": "So, when I'm on the train, I use the time to do homework and review the lessons for the day."
              },
              {
                "s": "m",
                "who": "C",
                "t": "Some people say that studying like this can be distracting, but I find it very effective for me."
              }
            ]
          },
          {
            "a": 1,
            "e": "Người D: 'I don't like studying in very crowded places because I can't focus well' và nhà 'very quiet' → cần chỗ yên tĩnh để tập trung.",
            "script": [
              {
                "s": "f",
                "who": "D",
                "t": "I don't like studying in very crowded places because I can't focus well."
              },
              {
                "s": "f",
                "who": "D",
                "t": "I usually sit on the sofa in the living room to study."
              },
              {
                "s": "f",
                "who": "D",
                "t": "My parents often travel for work, so my house is very quiet."
              }
            ]
          }
        ]
      },
      {
        "type": "conv",
        "title": "Part 3 · Câu 15",
        "instr": "Nghe hai người thảo luận về việc xây dựng cộng đồng. Ai bày tỏ ý kiến sau: người đàn ông (Man), người phụ nữ (Woman) hay cả hai (Both)?",
        "topic": "Building communities",
        "script": [
          {
            "s": "m",
            "t": "You know, I believe building design can shape people's behaviors and interactions from the start. When spaces are designed well, people feel comfortable and naturally start connecting."
          },
          {
            "s": "f",
            "t": "Of course, design matters, but there's no shortcut to building real community connections. Creating community takes time and consistency, even in spaces that encourage interaction."
          },
          {
            "s": "m",
            "t": "Really? But I also feel that work communities and social communities aren't as different as we might think. Both require spaces that help people feel connected and valued, whether it's at work or in social settings."
          },
          {
            "s": "f",
            "t": "I'm not sure I agree with that. Work communities and social communities serve very different purposes. In a social community, people gather out of personal interest and shared hobbies, but in work communities, people connect because of their job roles. That can affect how close they feel and how they interact with one another."
          },
          {
            "s": "m",
            "t": "I see your point, but even in work communities, people still find ways to connect on a personal level. A good work environment encourages friendships that might go beyond work topics."
          },
          {
            "s": "f",
            "t": "That's a good point. And with technology, people can now connect for both work and social reasons, even if they're not physically together. But I still think it's important to build spaces where people can gather in person."
          },
          {
            "s": "m",
            "t": "Yes, I agree, but I think technology has really changed how communities form. It makes connecting so much easier, and people don't always need to meet face-to-face to feel a sense of community."
          },
          {
            "s": "f",
            "t": "I see that, but I don't think online connections can fully replace in-person gatherings. There's a different energy when people come together in real spaces – something technology just can't replicate."
          },
          {
            "s": "m",
            "t": "I understand, but I feel that virtual spaces can be just as meaningful. Technology adds a new layer, making it possible for communities to thrive even across distances, and that's valuable in its own way."
          }
        ],
        "statements": [
          {
            "q": "Work communities and social communities are quite similar.",
            "a": "Man",
            "e": "Người đàn ông: 'work communities and social communities aren't as different as we might think'; người phụ nữ phản đối 'I'm not sure I agree with that'."
          },
          {
            "q": "Building a real community takes time.",
            "a": "Woman",
            "e": "Người phụ nữ: 'Creating community takes time and consistency'; người đàn ông không nói ý này (anh nhấn mạnh thiết kế không gian)."
          },
          {
            "q": "Technology allows people to connect without being in the same place.",
            "a": "Both",
            "e": "Người phụ nữ: 'people can now connect... even if they're not physically together'; người đàn ông: 'people don't always need to meet face-to-face'."
          },
          {
            "q": "Online communities can be as meaningful as meeting in person.",
            "a": "Man",
            "e": "Người đàn ông: 'virtual spaces can be just as meaningful'; người phụ nữ cho rằng 'online connections can't fully replace in-person gatherings'."
          }
        ]
      },
      {
        "type": "mono",
        "title": "Part 4 · Câu 16–17",
        "instr": "Nghe bài nói và trả lời 2 câu hỏi cho mỗi bài.",
        "talks": [
          {
            "topic": "The importance of sleep",
            "script": [
              {
                "s": "f",
                "t": "While many believe that sleeping fewer hours might actually improve deep sleep through exhaustion, or that drinking a cup of coffee can help some individuals relax before bed, these are largely myths."
              },
              {
                "s": "f",
                "t": "To truly enhance your rest, the secret lies in your sensory environment."
              },
              {
                "s": "f",
                "t": "Experts agree that shielding your bedroom from any auditory distractions and ensuring total darkness are the most critical factors."
              },
              {
                "s": "f",
                "t": "By eliminating both sound and light, you allow your brain to enter a restorative state far more effectively."
              },
              {
                "s": "f",
                "t": "Regarding sleep disorders, there is a common misunderstanding of how they manifest."
              },
              {
                "s": "f",
                "t": "Some people think that insomnia is solely a result of physical health issues, or they mistakenly believe that those with the condition actually spend too much time sleeping."
              },
              {
                "s": "f",
                "t": "In my view, the core issue is often a lack of awareness. Individuals frequently fail to detect the subtle cues of exhaustion their bodies are sending."
              },
              {
                "s": "f",
                "t": "Because they cannot always identify the signs that they are genuinely fatigued, they continue to push themselves, worsening the cycle of sleeplessness."
              }
            ],
            "questions": [
              {
                "q": "What is the way to have a good sleep according to the speaker?",
                "o": [
                  "Blocking out noise and light is key",
                  "Drinking coffee before bed helps relax the mind",
                  "Sleeping fewer hours increases deep sleep quality"
                ],
                "a": 0,
                "e": "'By eliminating both sound and light' → chặn tiếng ồn và ánh sáng là then chốt; cà phê và ngủ ít được gọi là 'myths'."
              },
              {
                "q": "What is the speaker's view on insomnia in general?",
                "o": [
                  "People can't always recognize the symptoms of tiredness",
                  "Most people with insomnia actually sleep too much",
                  "Insomnia is caused only by physical health problems"
                ],
                "a": 0,
                "e": "'they cannot always identify the signs that they are genuinely fatigued' → người ta không nhận ra dấu hiệu mệt mỏi; hai ý kia là quan niệm sai."
              }
            ]
          },
          {
            "topic": "A book about the life of a scientist",
            "script": [
              {
                "s": "m",
                "t": "I've just completed a new biography about a well-known physicist, and it's truly impressive."
              },
              {
                "s": "m",
                "t": "What makes it engaging is the author's style, which explains complicated ideas in a clear and simple way, allowing even readers without a scientific background to understand it."
              },
              {
                "s": "m",
                "t": "The book has already become a bestseller."
              },
              {
                "s": "m",
                "t": "Many specialists think its popularity comes from its similarity to the earlier book about the same scientist, which was also highly successful."
              },
              {
                "s": "m",
                "t": "If you liked the previous one, you'll certainly find this new book worth reading."
              }
            ],
            "questions": [
              {
                "q": "What makes the book engaging, according to the speaker?",
                "o": [
                  "It uses simple language to describe complex ideas",
                  "It was endorsed by a famous celebrity",
                  "It contains many colorful illustrations"
                ],
                "a": 0,
                "e": "'explains complicated ideas in a clear and simple way' → dùng ngôn ngữ đơn giản để giải thích ý phức tạp."
              },
              {
                "q": "According to specialists, why is the book so popular?",
                "o": [
                  "It is similar to the previous book about the scientist",
                  "It is shorter than other biographies",
                  "It focuses on entertainment rather than facts"
                ],
                "a": 0,
                "e": "'its popularity comes from its similarity to the earlier book about the same scientist' → vì giống cuốn sách trước."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "l13",
    "title": "Đề 12 — Farming spaces in cities",
    "parts": [
      {
        "type": "mcq",
        "title": "Part 1 · Câu 1–13",
        "instr": "Nghe đoạn ngắn và chọn đáp án đúng. Mỗi đoạn nghe tối đa 2 lần.",
        "items": [
          {
            "q": "A woman is talking about her plan for the holiday. What will she do during the holiday?",
            "o": [
              "Go for a run",
              "Go for a bike ride",
              "Go for a walk"
            ],
            "a": 2,
            "e": "'I think I'll go for a walk every day' → đi dạo; chạy bộ chỉ được cân nhắc, đạp xe là 'maybe ... later'.",
            "script": [
              {
                "s": "f",
                "t": "I'm really excited about the holiday!"
              },
              {
                "s": "f",
                "t": "I think I'll go for a walk every day to enjoy the fresh air.",
                "hl": 1
              },
              {
                "s": "f",
                "t": "I also considered going for a run, but walking sounds more relaxing."
              },
              {
                "s": "f",
                "t": "Maybe I'll even try to go for a bike ride later. It'll be nice to spend some time outdoors!"
              }
            ]
          },
          {
            "q": "Two colleagues talk about meeting. When do they want to meet?",
            "o": [
              "Monday",
              "Wednesday",
              "Tuesday"
            ],
            "a": 2,
            "e": "'Tuesday should work for me' và 'See you on Tuesday at 2pm' → thứ Ba.",
            "script": [
              {
                "s": "f",
                "t": "Hey, we've been meaning to sit down and discuss the project. When would be a good time for you to meet?"
              },
              {
                "s": "m",
                "t": "I've got a few things lined up this week, but Tuesday should work for me. I have some free time in the afternoon.",
                "hl": 1
              },
              {
                "s": "f",
                "t": "Tuesday afternoon sounds great! I'll clear my schedule as well. Let's aim for around 2pm?"
              },
              {
                "s": "m",
                "t": "Perfect, I'll make a note of it. See you on Tuesday at 2pm!",
                "hl": 1
              },
              {
                "s": "f",
                "t": "Looking forward to it. See you then!"
              }
            ]
          },
          {
            "q": "A woman is talking about her job. How is being an artist different from other jobs?",
            "o": [
              "She works 9 to 5",
              "She works at irregular times",
              "She works at a desk all day"
            ],
            "a": 1,
            "e": "'I work irregular hours, sometimes late at night or on weekends' → giờ làm việc không cố định.",
            "script": [
              {
                "s": "f",
                "t": "Hello, my name is Sarah, and I'm an artist. I paint pictures of nature, like trees, rivers, and animals."
              },
              {
                "s": "f",
                "t": "I love using bright colors to make my art happy and full of life."
              },
              {
                "s": "f",
                "t": "My job is very fun, but I work irregular hours, sometimes late at night or on weekends.",
                "hl": 1
              },
              {
                "s": "f",
                "t": "When I have inspiration, I paint for many hours without a break. I sell my paintings in galleries and online, and it makes me really happy when people like my work. Creating art is the best job for me!"
              }
            ]
          },
          {
            "q": "A woman is talking about shopping places. Where is she going to go shopping?",
            "o": [
              "At the mall",
              "At a boutique",
              "At a new shopping center"
            ],
            "a": 2,
            "e": "'This time, I'm excited to check out the new shopping center' → lần này cô đến trung tâm mua sắm mới; mall và boutique là nơi cô hay đi.",
            "script": [
              {
                "s": "f",
                "t": "I love shopping, and there are so many places to choose from in our city."
              },
              {
                "s": "f",
                "t": "The downtown market is great for fresh fruit and vegetables, and there are lots of small shops there too."
              },
              {
                "s": "f",
                "t": "If I need clothes, I usually go to the mall, but it can get very crowded on weekends."
              },
              {
                "s": "f",
                "t": "There's also a little boutique near my house with some unique items, but it's a bit expensive."
              },
              {
                "s": "f",
                "t": "This time, I'm excited to check out the new shopping center that just opened.",
                "hl": 1
              },
              {
                "s": "f",
                "t": "I've heard it has everything I need in one place!"
              }
            ]
          },
          {
            "q": "Jorge is calling his friend about their plan for the weekend. What time does the football match start?",
            "o": [
              "3pm",
              "5pm",
              "1pm"
            ],
            "a": 2,
            "e": "'The football match starts at 1 p.m.' → 1 giờ chiều (11:30 là giờ ăn trưa).",
            "script": [
              {
                "s": "m",
                "t": "Hey, it's Jorge! I want to check in about our plans for the weekend."
              },
              {
                "s": "m",
                "t": "I'll be busy in the morning, but how about we meet at 11:30 for lunch?"
              },
              {
                "s": "m",
                "t": "The football match starts at 1 p.m., and since it takes about 30 minutes to drive there, we'll have just enough time to grab something to eat.",
                "hl": 1
              },
              {
                "s": "m",
                "t": "After the match, we can head back to my place and play some video games. It's going to be a fun day! Let me know if that works for you. Can't wait!"
              }
            ]
          },
          {
            "q": "Linda is talking about her lunch. What does she like to drink with her meal?",
            "o": [
              "Coffee",
              "Juice",
              "Tea"
            ],
            "a": 2,
            "e": "'I really enjoy a warm cup of tea. It's my favorite drink' → trà; cô nói không chọn cà phê hay nước ép.",
            "script": [
              {
                "s": "f",
                "t": "When it comes to lunch, I have a simple pleasure: I really enjoy a warm cup of tea.",
                "hl": 1
              },
              {
                "s": "f",
                "t": "It's my favorite drink to have while I eat. I find it calming, and it makes my meal feel special."
              },
              {
                "s": "f",
                "t": "Sometimes people ask me why I don't choose coffee or juice, but for me, tea is just perfect. It warms my heart and gives me a moment to relax."
              }
            ]
          },
          {
            "q": "A man is describing his school. What color is the teacher's building?",
            "o": [
              "Green",
              "Blue",
              "White"
            ],
            "a": 2,
            "e": "'It's really nice and has a bright, white color' → màu trắng; màu xanh dương là bầu trời.",
            "script": [
              {
                "s": "m",
                "t": "You know, I've been spending a lot of time at school lately. I really like our campus!"
              },
              {
                "s": "m",
                "t": "One thing that stands out is the teacher's building. It's really nice and has a bright, white color.",
                "hl": 1
              },
              {
                "s": "m",
                "t": "I love how it looks against the blue sky. It's kind of a central point of the school, and it feels welcoming."
              },
              {
                "s": "m",
                "t": "I think it adds a lot to the overall atmosphere here."
              }
            ]
          },
          {
            "q": "A woman is talking about eggs in the shop. How much are the eggs normally?",
            "o": [
              "3.50 pounds",
              "1.50 pounds",
              "2.50 pounds"
            ],
            "a": 2,
            "e": "'Normally, they're 2.50 pounds, but right now, they're discounted' → giá thường là 2.50 bảng.",
            "script": [
              {
                "s": "f",
                "t": "Hey, I just saw that the eggs are on sale today!"
              },
              {
                "s": "f",
                "t": "Normally, they're two pounds fifty, but right now, they're discounted.",
                "hl": 1
              },
              {
                "s": "f",
                "t": "It's a great deal, so I decided to pick up a few extra cartons. If you're planning to buy eggs, today is the perfect day!"
              }
            ]
          },
          {
            "q": "A woman is talking about exercise. What is one of the easiest ways to exercise?",
            "o": [
              "Cycling",
              "Running",
              "Walking"
            ],
            "a": 2,
            "e": "'One of the easiest and most accessible ways to exercise is by walking' → đi bộ.",
            "script": [
              {
                "s": "f",
                "t": "One of the easiest and most accessible ways to exercise is by walking.",
                "hl": 1
              },
              {
                "s": "f",
                "t": "It's simple, doesn't require any special equipment, and you can do it anywhere – whether it's around your neighborhood or at a park."
              }
            ]
          },
          {
            "q": "Two friends are talking with each other. What did they both buy?",
            "o": [
              "Books",
              "Shoes",
              "Clothes"
            ],
            "a": 1,
            "e": "Người đàn ông mua 'a great pair of running shoes', người phụ nữ mua 'a pair of leather boots' → cả hai đều mua giày.",
            "script": [
              {
                "s": "m",
                "t": "I just got back from shopping. I found a great pair of running shoes and also picked up some tea.",
                "hl": 1
              },
              {
                "s": "f",
                "t": "Nice! What kind of shoes did you get?"
              },
              {
                "s": "m",
                "t": "They're light blue trainers. I think they'll be perfect for the park. What about you?"
              },
              {
                "s": "f",
                "t": "I bought a pair of leather boots and also grabbed a delicious cake.",
                "hl": 1
              },
              {
                "s": "m",
                "t": "Sounds great! Those are perfect for this weather."
              },
              {
                "s": "f",
                "t": "Thanks! I'm excited to try the cake later. Looks like we both made good choices today!"
              },
              {
                "s": "m",
                "t": "Absolutely! New shoes and tasty treats for the days ahead!"
              }
            ]
          },
          {
            "q": "James is talking about his family members. In what way are his mother and his aunt alike?",
            "o": [
              "They had similar hair styles",
              "They had similar eye colors",
              "They were thin"
            ],
            "a": 2,
            "e": "'They were both equally thin back then' → cả hai đều gầy; tóc và màu mắt thì khác nhau.",
            "script": [
              {
                "s": "m",
                "t": "This picture is of my aunt and my mom. Many people say they look alike."
              },
              {
                "s": "m",
                "t": "I find it funny, though, because when they were teenagers, my mom had long hair, while my aunt had short hair."
              },
              {
                "s": "m",
                "t": "They were both equally thin back then, but their eyes were different.",
                "hl": 1
              },
              {
                "s": "m",
                "t": "My mom has lovely brown eyes, and my aunt has strikingly beautiful blue eyes. Even with their differences, they share a special bond that makes them so similar in spirit."
              }
            ]
          },
          {
            "q": "A receptionist is checking the client list of a clinic. How many American clients are there?",
            "o": [
              "Two",
              "One",
              "Three"
            ],
            "a": 1,
            "e": "'Leslie, who's from the US' và 'one American' → chỉ có một khách người Mỹ.",
            "script": [
              {
                "s": "f",
                "t": "Alright, let me go over the list of clients for today. We've got Carl, Harry, and Matthew, all from the UK."
              },
              {
                "s": "f",
                "t": "Leslie, who's from the US, is also scheduled for an appointment.",
                "hl": 1
              },
              {
                "s": "f",
                "t": "Then, we have two more clients coming in from France."
              },
              {
                "s": "f",
                "t": "So that gives us one American, a few from the UK, and the rest from France. It looks like everything's in order!",
                "hl": 1
              }
            ]
          },
          {
            "q": "How many nights did they spend in Japan?",
            "o": [
              "3 nights",
              "4 nights",
              "2 nights"
            ],
            "a": 0,
            "e": "'they spent three nights there' → 3 đêm.",
            "script": [
              {
                "s": "m",
                "t": "They traveled to Japan for a short trip, and they spent three nights there.",
                "hl": 1
              },
              {
                "s": "m",
                "t": "During that time, they explored different cities, experienced the local culture, and visited some famous landmarks. It was a quick but memorable visit."
              }
            ]
          }
        ]
      },
      {
        "type": "speakers",
        "title": "Part 2 · Câu 14",
        "instr": "Bốn người nói về việc đi lại và phương tiện giao thông. Chọn câu mô tả đúng nhất mỗi người. Có 2 lựa chọn thừa.",
        "topic": "Commuting and transport",
        "options": [
          "uses public transport to protect the environment",
          "drives to work with a family member",
          "walks to work since moving closer to the company",
          "walks to work with a friend to save money and keep fit",
          "rides a bicycle to work every day",
          "works from home to avoid travelling"
        ],
        "speakers": [
          {
            "a": 0,
            "e": "Người A: 'I always look for ways to use public transportation, like buses or trains, to reduce harmful emissions' → đi phương tiện công cộng vì môi trường.",
            "script": [
              {
                "s": "f",
                "who": "A",
                "t": "I'm concerned about the Earth and the environment, so I always look for ways to use public transportation, like buses or trains, to reduce harmful emissions."
              },
              {
                "s": "f",
                "who": "A",
                "t": "I can't walk to work because it's too far from my home, but I always walk to the local market when I need to buy groceries."
              }
            ]
          },
          {
            "a": 1,
            "e": "Người B: 'My mother works along the same route, so we often drive to work together' → đi làm chung xe với mẹ.",
            "script": [
              {
                "s": "m",
                "who": "B",
                "t": "I had to take driving lessons to be able to drive to work."
              },
              {
                "s": "m",
                "who": "B",
                "t": "My mother works along the same route, so we often drive to work together. Occasionally, she takes over the driving, and I'm happy because driving together gives us more time to chat."
              }
            ]
          },
          {
            "a": 2,
            "e": "Người C: 'since I moved closer to the company, I always go there on foot' → từ khi chuyển đến gần công ty thì đi bộ; người bạn mới là người đạp xe.",
            "script": [
              {
                "s": "f",
                "who": "C",
                "t": "I used to use my car a lot to get to work. But since I moved closer to the company, I always go there on foot."
              },
              {
                "s": "f",
                "who": "C",
                "t": "I have a friend who cycles for 20 minutes every day to work – can you imagine? She must be super fit!"
              }
            ]
          },
          {
            "a": 3,
            "e": "Người D: 'I often choose to walk to work to save on gas money and to keep in shape' và 'I usually walk to the company with a close friend' → đi bộ cùng bạn để tiết kiệm và giữ dáng.",
            "script": [
              {
                "s": "m",
                "who": "D",
                "t": "I often choose to walk to work to save on gas money and to keep in shape. I usually walk to the company with a close friend."
              },
              {
                "s": "m",
                "who": "D",
                "t": "Sometimes we feel really tired but still push ourselves to walk all the way. There are times when we see a bus stop and have to resist the urge to hop on the bus."
              }
            ]
          }
        ]
      },
      {
        "type": "conv",
        "title": "Part 3 · Câu 15",
        "instr": "Nghe hai người thảo luận về không gian canh tác trong thành phố. Ai bày tỏ ý kiến sau: người đàn ông (Man), người phụ nữ (Woman) hay cả hai (Both)?",
        "topic": "Farming spaces in cities",
        "script": [
          {
            "s": "m",
            "t": "The government is discussing adding more farming space to big cities. What do you think about this?"
          },
          {
            "s": "f",
            "t": "I think it's a bad idea. Cities are already too crowded, and people don't even have enough land for housing. How can we take land for farming and raising livestock?"
          },
          {
            "s": "m",
            "t": "We could use spaces like balconies or parks for farming. These farming areas would make the city more beautiful and a better place to live. Plus, it would benefit the local economy since the city could become more self-sufficient in food production without relying on imports from other regions."
          },
          {
            "s": "f",
            "t": "I agree that farming areas would make the landscape greener and more attractive. But adding farming space won't significantly boost the local economy. Farmers have been transporting food into cities for a long time, and we've never had issues with food supply or shortages."
          },
          {
            "s": "m",
            "t": "You make a good point. With limited farming space, it wouldn't be enough to meet the food demands of city residents. We would still rely on food supplies from suburban areas."
          },
          {
            "s": "f",
            "t": "Exactly. A few small farming spaces won't fulfill the food demand, but they would take up a lot of valuable land that could be used for housing."
          }
        ],
        "statements": [
          {
            "q": "Farming areas would make the city more attractive.",
            "a": "Both",
            "e": "Người đàn ông: 'These farming areas would make the city more beautiful'; người phụ nữ: 'farming areas would make the landscape greener and more attractive'."
          },
          {
            "q": "Farming in the city would help the local economy.",
            "a": "Man",
            "e": "Người đàn ông: 'it would benefit the local economy'; người phụ nữ phản đối 'adding farming space won't significantly boost the local economy'."
          },
          {
            "q": "Land in the city should be kept for housing.",
            "a": "Woman",
            "e": "Người phụ nữ: 'people don't even have enough land for housing' và 'valuable land that could be used for housing'; người đàn ông không nói ý này."
          },
          {
            "q": "Small farming spaces cannot meet the city's food demand.",
            "a": "Both",
            "e": "Người đàn ông: 'it wouldn't be enough to meet the food demands of city residents'; người phụ nữ: 'Exactly. A few small farming spaces won't fulfill the food demand'."
          }
        ]
      },
      {
        "type": "mono",
        "title": "Part 4 · Câu 16–17",
        "instr": "Nghe bài nói và trả lời 2 câu hỏi cho mỗi bài.",
        "talks": [
          {
            "topic": "Script production",
            "script": [
              {
                "s": "m",
                "t": "When discussing the script, it is often mentioned that one noticeable issue is that the characters don't feel fully developed, mainly because their backgrounds aren't explored in enough detail."
              },
              {
                "s": "m",
                "t": "Without a clear understanding of their past or motivations, it becomes difficult for the audience to relate to them or understand their actions."
              },
              {
                "s": "m",
                "t": "This lack of depth makes the story less engaging, as viewers may find it hard to form an emotional connection with the characters."
              },
              {
                "s": "m",
                "t": "In addition, it is also pointed out that modern industry demands have a negative influence on script production."
              },
              {
                "s": "m",
                "t": "Writers are frequently required to follow trends or meet commercial expectations, which can limit their creativity. As a result, scripts may feel rushed or not fully developed."
              },
              {
                "s": "m",
                "t": "Instead of focusing on strong storytelling, the process often prioritizes deadlines and market demands, which can ultimately reduce the overall quality of the script."
              }
            ],
            "questions": [
              {
                "q": "What is the speaker's opinion on this script?",
                "o": [
                  "The characters' background are not adequately explored",
                  "The dialogue is too complex for viewers",
                  "The setting feels too unrealistic"
                ],
                "a": 0,
                "e": "'the characters don' → nhân vật chưa được phát triển đầy đủ vì quá khứ của họ chưa được khai thác kỹ; 'mainly because their backgrounds' là lý do chính."
              },
              {
                "q": "How do industries impact script production?",
                "o": [
                  "The new industry demands have a negative influence.",
                  "They provide more creative freedom to writers",
                  "They increase audience engagement significantly"
                ],
                "a": 0,
                "e": "'modern industry demands have a negative influence on script production' → yêu cầu của ngành có ảnh hưởng tiêu cực, hạn chế sự sáng tạo của biên kịch."
              }
            ]
          },
          {
            "topic": "A new restaurant",
            "script": [
              {
                "s": "f",
                "t": "I recently visited that new bistro downtown, and I have to say, the feedback from the community has been quite mixed."
              },
              {
                "s": "f",
                "t": "On one hand, people love the menu; despite some concerns that the dishes might be too exotic for the locals, most residents actually found the flavors refreshing and authentic."
              },
              {
                "s": "f",
                "t": "The location is also incredibly convenient, being right in the heart of the shopping district."
              },
              {
                "s": "f",
                "t": "However, the recurring complaint in almost every review is the unprofessional conduct of the staff. Guests have frequently reported feeling ignored, suggesting that the overall quality of the hospitality was significantly below par."
              },
              {
                "s": "f",
                "t": "Looking ahead, simply adjusting the menu prices to boost margins or shifting the business model to focus exclusively on digital delivery won't solve the core issue."
              },
              {
                "s": "f",
                "t": "If the establishment wants to survive, they must prioritize the human element. The management needs to ensure that every person who walks through the door receives attentive care."
              },
              {
                "s": "f",
                "t": "Ultimately, success will depend on their ability to foster a genuine sense of appreciation, ensuring that every guest feels truly appreciated and at home during their visit."
              }
            ],
            "questions": [
              {
                "q": "How is this restaurant reviewed by customers?",
                "o": [
                  "The standard of service wasn't good",
                  "The food was too exotic for locals",
                  "The location is difficult to find"
                ],
                "a": 0,
                "e": "'the unprofessional conduct of the staff' → phàn nàn lặp lại là thái độ nhân viên kém; món ăn không quá lạ và vị trí rất thuận tiện."
              },
              {
                "q": "What should this restaurant do?",
                "o": [
                  "They need to make the customers feel valued and welcome",
                  "They should increase their prices for profit",
                  "They need to focus only on online orders"
                ],
                "a": 0,
                "e": "'every guest feels truly appreciated and at home' → cần khiến khách cảm thấy được trân trọng và chào đón; tăng giá hay chỉ bán online 'won't solve the core issue'."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "l15",
    "title": "Đề 13 — Daily life and leisure",
    "parts": [
      {
        "type": "mcq",
        "title": "Part 1 · Câu 1–13",
        "instr": "Nghe đoạn ngắn và chọn đáp án đúng. Mỗi đoạn nghe tối đa 2 lần.",
        "items": [
          {
            "q": "Listen to a woman asking about a flight. How much does the flight in the morning cost?",
            "o": [
              "300 pounds",
              "350 pounds",
              "400 pounds"
            ],
            "a": 1,
            "e": "'the morning flight it is -- three hundred and fifty pounds' → chuyến sáng 350 bảng; 400 là chuyến tối, 300 đã hết chỗ.",
            "script": [
              {
                "s": "f",
                "t": "Good morning, I'm calling about flights to Edinburgh next Tuesday."
              },
              {
                "s": "f",
                "t": "Yes, I saw three prices online and got confused."
              },
              {
                "s": "f",
                "t": "The evening flight is four hundred pounds, which is too much for me."
              },
              {
                "s": "f",
                "t": "There was also one at three hundred, but I understand that one is fully booked now? Right."
              },
              {
                "s": "f",
                "t": "So the morning flight it is – three hundred and fifty pounds, you said?",
                "hl": 1
              },
              {
                "s": "f",
                "t": "Perfect, let's book that one. The morning flight at three fifty.",
                "hl": 1
              }
            ]
          },
          {
            "q": "Listen to a friend talking about selling her music player. How much did she sell it for?",
            "o": [
              "50 dollars",
              "60 dollars",
              "40 dollars"
            ],
            "a": 0,
            "e": "'he paid fifty dollars and walked away happy' → bán với giá 50 đô; 60 là giá đăng ban đầu, 40 là giá người mua đề nghị.",
            "script": [
              {
                "s": "f",
                "t": "Guess what – I finally sold my old music player!"
              },
              {
                "s": "f",
                "t": "You remember I first asked sixty dollars for it online? Nobody even wrote to me for two weeks."
              },
              {
                "s": "f",
                "t": "Then a student offered forty, which honestly felt too little for such a good machine."
              },
              {
                "s": "f",
                "t": "We met halfway in the end: he paid fifty dollars and walked away happy, and so did I.",
                "hl": 1
              },
              {
                "s": "f",
                "t": "Now I can put that money towards the new headphones I've been wanting."
              }
            ]
          },
          {
            "q": "Listen to a woman explaining why a colleague was late. What was the main reason he was late?",
            "o": [
              "Overslept",
              "Forgot something",
              "Missed the train"
            ],
            "a": 2,
            "e": "'He arrived just as the doors closed, and the next train wasn't for another forty minutes' → lỡ chuyến tàu; báo thức vẫn kêu và anh không quên gì.",
            "script": [
              {
                "s": "f",
                "t": "Poor Daniel had a terrible morning."
              },
              {
                "s": "f",
                "t": "People at the office joked that he must have overslept again, but no – his alarm worked fine and he was up at six."
              },
              {
                "s": "f",
                "t": "He even remembered everything: keys, laptop, the presentation folder, all packed the night before."
              },
              {
                "s": "f",
                "t": "The real problem was at the station. He arrived just as the doors closed, and the next train wasn't for another forty minutes.",
                "hl": 1
              },
              {
                "s": "f",
                "t": "That's why he walked in an hour late, poor thing."
              }
            ]
          },
          {
            "q": "A mom is calling her son to remind him about picking up groceries. How much is one egg at the market stall?",
            "o": [
              "£1.50 (One pound fifty)",
              "£2.50 (Two pounds fifty)",
              "£3.50 (Three pounds fifty)"
            ],
            "a": 0,
            "e": "'one pound fifty for a single egg' → trứng ở quầy chợ giá £1.50; £2.50 là quầy bên cạnh, £3.50 là cửa hàng.",
            "script": [
              {
                "s": "f",
                "t": "Hi love, it's mum. Can you stop at the market stall on your way home?"
              },
              {
                "s": "f",
                "t": "I need those big organic eggs for the cake – the special ones the baker uses."
              },
              {
                "s": "f",
                "t": "Yes, they're pricey: one pound fifty for a single egg, can you believe it.",
                "hl": 1
              },
              {
                "s": "f",
                "t": "The lady next to her sells them at two fifty and the shop wants three fifty each, so hers are actually the cheapest."
              },
              {
                "s": "f",
                "t": "Take six eggs, that's nine pounds exactly. Thanks, sweetheart!"
              }
            ]
          },
          {
            "q": "When did they decide to meet?",
            "o": [
              "9 AM on Saturday",
              "9 AM on Sunday",
              "7 AM on Friday"
            ],
            "a": 1,
            "e": "'We finally agreed to meet at 9:00 AM on Sunday' → chủ nhật 9 giờ sáng; thứ sáu quá sớm, thứ bảy bận việc gia đình.",
            "script": [
              {
                "s": "m",
                "t": "Meeting at 7:00 AM on Friday was too early for us, and we were busy with a family commitment on Saturday at 9:00 AM."
              },
              {
                "s": "m",
                "t": "We finally agreed to meet at 9:00 AM on Sunday.",
                "hl": 1
              },
              {
                "s": "m",
                "t": "We'll wait outside the station and grab breakfast nearby. I will text you before leaving home to ensure the trains are running on schedule."
              }
            ]
          },
          {
            "q": "Listen to a man calling his friend. Why does he make the call?",
            "o": [
              "Telling her he will be late",
              "Asking for directions",
              "Inviting her out"
            ],
            "a": 0,
            "e": "'I just wanted to tell you I'm going to be late' → anh gọi để báo sẽ đến muộn.",
            "script": [
              {
                "s": "m",
                "t": "Hi, I just wanted to tell you I'm going to be late.",
                "hl": 1
              },
              {
                "s": "f",
                "t": "Oh no, what happened?"
              },
              {
                "s": "m",
                "t": "The train stopped because of a signal error, and the driver says it will be delayed by about 20 minutes."
              },
              {
                "s": "f",
                "t": "Don't worry, we can wait."
              },
              {
                "s": "m",
                "t": "Thanks, but if the others arrive, please start without me. I will go straight to the restaurant once I get there."
              },
              {
                "s": "f",
                "t": "Okay, see you soon!"
              }
            ]
          },
          {
            "q": "What is Mary's number?",
            "o": [
              "333 3029",
              "335 3902",
              "555 3920"
            ],
            "a": 2,
            "e": "'Mary's real number is 555 3920' → số đúng của Mary; hai số kia là số sai.",
            "script": [
              {
                "s": "f",
                "t": "I noted down three three five, three nine zero two from an old contact list, but one number was incorrect."
              },
              {
                "s": "f",
                "t": "Three three three, three zero two nine is not her number; it belongs to someone else with a similar name."
              },
              {
                "s": "f",
                "t": "Mary's real number is five five five, three nine two zero.",
                "hl": 1
              },
              {
                "s": "f",
                "t": "Please call her after 6:00 PM because she will be in meetings all afternoon. Kindly save this correct number once she answers so we can avoid this mix-up again."
              }
            ]
          },
          {
            "q": "Where will they meet for the bus home?",
            "o": [
              "At the main gate",
              "At the marketplace",
              "At the museum entrance"
            ],
            "a": 1,
            "e": "'Please head to the marketplace instead' → gặp ở chợ vì đường tới bảo tàng bị đóng.",
            "script": [
              {
                "s": "m",
                "t": "The bus picked us up at the hotel this morning, but it will not drop us off there tonight."
              },
              {
                "s": "m",
                "t": "We were going to meet at the museum entrance, but the road there is closed now."
              },
              {
                "s": "m",
                "t": "Please head to the marketplace instead.",
                "hl": 1
              },
              {
                "s": "m",
                "t": "The bus will be parked near the main gate at 6:30 PM."
              }
            ]
          },
          {
            "q": "What is the woman doing?",
            "o": [
              "Swimming",
              "Cleaning",
              "Crying"
            ],
            "a": 1,
            "e": "'she's actually inside the house cleaning' → cô ấy đang dọn dẹp, tiếng nước là từ cái xô.",
            "script": [
              {
                "s": "f",
                "t": "I heard water and assumed she was swimming, but she's actually inside the house cleaning.",
                "hl": 1
              },
              {
                "s": "f",
                "t": "She just finished mopping the kitchen floor and is now cleaning the windows."
              },
              {
                "s": "f",
                "t": "The sound of water is just from the bucket next to her. She plans to clean the living room before she stops for a break and heads to the shops."
              }
            ]
          },
          {
            "q": "How much does the small car cost?",
            "o": [
              "£5,000",
              "£4,000",
              "£3,250"
            ],
            "a": 2,
            "e": "'the small car costs £3,250' → xe nhỏ giá £3,250; £4,850 là xe gia đình.",
            "script": [
              {
                "s": "m",
                "t": "Hey! I'm looking at a couple of secondhand cars online and need your advice."
              },
              {
                "s": "m",
                "t": "I really love this nice family one, which costs four thousand eight hundred and fifty pounds, but it's way over my budget."
              },
              {
                "s": "m",
                "t": "On the other hand, there's a smaller option – the small car costs three thousand two hundred and fifty pounds, though honestly, it looks a bit too old.",
                "hl": 1
              },
              {
                "s": "m",
                "t": "What do you think I should do?"
              }
            ]
          },
          {
            "q": "How many copies of the magazine are published in summer?",
            "o": [
              "Around 150,000 copies",
              "Just over 300,000 copies",
              "About 500,000 copies"
            ],
            "a": 1,
            "e": "'At that time, we publish just over 300,000 copies' → mùa hè in hơn 300.000 bản; 150 là số nhân viên.",
            "script": [
              {
                "s": "f",
                "t": "Our magazine, Freeze Frame, has grown a lot over the last few years. We now have around 150 people working for us."
              },
              {
                "s": "f",
                "t": "The number of copies we publish changes during the year, but summer is our busiest season."
              },
              {
                "s": "f",
                "t": "At that time, we publish just over 300,000 copies.",
                "hl": 1
              }
            ]
          },
          {
            "q": "Who is the speaker going to see this weekend?",
            "o": [
              "His sister and her children",
              "His colleagues",
              "Miko"
            ],
            "a": 0,
            "e": "'My sister is coming to visit this weekend with her children' → gặp chị/em gái và các con; Miko chỉ giúp đón họ.",
            "script": [
              {
                "s": "m",
                "t": "My sister is coming to visit this weekend with her children.",
                "hl": 1
              },
              {
                "s": "m",
                "t": "I'm quite busy earlier in the day, so I've asked Miko to help me collect them. I should be free by 6 o'clock, and I'll meet them all then."
              }
            ]
          },
          {
            "q": "Where is the cafe located?",
            "o": [
              "Opposite the gift shop",
              "Behind gallery two",
              "Near the main entrance"
            ],
            "a": 0,
            "e": "'look to your left and you'll see the gift shop, and over on your right, you'll find the café' → quán cà phê bên phải, đối diện cửa hàng quà tặng bên trái.",
            "script": [
              {
                "s": "f",
                "t": "Listen carefully, everyone. I'll walk you through the layout here."
              },
              {
                "s": "f",
                "t": "On the ground floor, you've got several halls and a big gallery, and right where you're standing now is the main entrance."
              },
              {
                "s": "f",
                "t": "Up on the second floor, you'll find Gallery 2 and Gallery 3."
              },
              {
                "s": "f",
                "t": "As you go past Gallery 2 with all those nice historic paintings inside, look to your left and you'll see the gift shop, and over on your right, you'll find the café.",
                "hl": 1
              },
              {
                "s": "f",
                "t": "Enjoy your walk around."
              }
            ]
          }
        ]
      },
      {
        "type": "speakers",
        "title": "Part 2 · Câu 14",
        "instr": "Bốn người nói về hoạt động họ yêu thích. Chọn câu mô tả đúng nhất mỗi người. Có 2 lựa chọn thừa.",
        "topic": "Leisure and exercise",
        "options": [
          "Goes running before work",
          "Plays a team sport",
          "Rides horses every Saturday",
          "Walks every evening with a partner",
          "Swims at a local pool",
          "Rides a bike on forest trails"
        ],
        "speakers": [
          {
            "a": 5,
            "e": "Người A: 'I load the bike onto the car on Friday night' và 'flying down a forest trail with mud everywhere' → đạp xe địa hình trong rừng.",
            "script": [
              {
                "s": "m",
                "who": "A",
                "t": "My weekends belong to the hills. I load the bike onto the car on Friday night, and by eight the next morning I am flying down a forest trail with mud everywhere."
              },
              {
                "s": "m",
                "who": "A",
                "t": "My friends think I am mad – the bruises, the repairs, the cold. But nothing else empties my head like picking a line between the trees at speed."
              },
              {
                "s": "m",
                "who": "A",
                "t": "I have tried gentler hobbies, honestly. None of them ever made me feel so completely awake."
              }
            ]
          },
          {
            "a": 0,
            "e": "Người B: 'I just go for a run before work' → chạy bộ trước giờ làm; không dụng cụ, không phòng gym.",
            "script": [
              {
                "s": "f",
                "who": "B",
                "t": "For me it has to be simple, so I just go for a run before work."
              },
              {
                "s": "f",
                "who": "B",
                "t": "No equipment, no bookings, no team – shoes on, door shut, and thirty minutes later I am back, red-faced and happy."
              },
              {
                "s": "f",
                "who": "B",
                "t": "In summer I follow the river; in winter I do loops around my block under the streetlights. People keep inviting me to fancy gyms, and I always say the same thing: the pavement is free and it never closes."
              }
            ]
          },
          {
            "a": 3,
            "e": "Người C: 'every evening after dinner my husband and I head out on foot and do a slow hour' → đi bộ mỗi tối cùng chồng.",
            "script": [
              {
                "s": "f",
                "who": "C",
                "t": "My doctor told me to stay active without stressing my knees, so every evening after dinner my husband and I head out on foot and do a slow hour through the neighbourhood."
              },
              {
                "s": "f",
                "who": "C",
                "t": "We have done it so long that the neighbours joke they can set their clocks by us. It is gentle, it costs nothing, and we talk more in that hour than in the rest of the day."
              },
              {
                "s": "f",
                "who": "C",
                "t": "Not dramatic, I know – but at my age, steady beats spectacular."
              }
            ]
          },
          {
            "a": 2,
            "e": "Người D: 'I am there every Saturday, brushing, saddling, and taking my favourite mare across the fields' → cưỡi ngựa mỗi thứ bảy.",
            "script": [
              {
                "s": "m",
                "who": "D",
                "t": "Mine started with a birthday gift: one lesson at the stables outside town. Ten years later I am there every Saturday, brushing, saddling, and taking my favourite mare across the fields."
              },
              {
                "s": "m",
                "who": "D",
                "t": "Being carried by a living animal is nothing like any machine – you learn to listen with your whole body."
              },
              {
                "s": "m",
                "who": "D",
                "t": "It is not a cheap pastime, and my boots are permanently filthy, but walking into that yard is still the best moment of my week."
              }
            ]
          }
        ]
      },
      {
        "type": "conv",
        "title": "Part 3 · Câu 15",
        "instr": "Nghe hai người thảo luận về việc học đại học. Ai bày tỏ ý kiến sau: người đàn ông (Man), người phụ nữ (Woman) hay cả hai (Both)?",
        "topic": "University study and online learning",
        "script": [
          {
            "s": "f",
            "t": "My cousin in a mountain village just finished her first year of a business degree without ever leaving home. Ten years ago, someone in her situation simply could not have studied at that level."
          },
          {
            "s": "f",
            "t": "Now a laptop and a connection put the same lectures in front of everyone."
          },
          {
            "s": "m",
            "t": "That part is wonderful, I agree completely – doors that used to be locked are wide open now, wherever you live and whatever you earn."
          },
          {
            "s": "m",
            "t": "But let me defend the old campus for a moment. In my years at university, the real education happened between lectures: arguing in the corridor, late nights with flatmates, learning to live among strangers. Take those away and you keep the certificate but lose half the growing up."
          },
          {
            "s": "f",
            "t": "You always romanticise those corridors! Plenty of people grow up just fine without them."
          },
          {
            "s": "m",
            "t": "Maybe. Here is another unpopular opinion of mine, then. I think universities should be pushed to compete with each other – for students, for rankings, for research money."
          },
          {
            "s": "m",
            "t": "When my old department started chasing a rival's results, the teaching improved within two years. Rivalry keeps institutions awake."
          },
          {
            "s": "f",
            "t": "Hmm, rivalry can also make them chase numbers instead of learning – I would not cheer for that so quickly. My own complaint is different."
          },
          {
            "s": "f",
            "t": "Have you seen course lists lately? Eighty modules, everything from robotics to flower arranging in one degree. Everyone applauds the variety, but a student who samples everything masters nothing. Sometimes a short, focused menu feeds you better than an endless buffet."
          },
          {
            "s": "m",
            "t": "My daughter would disagree – she loves her strange mix of modules. We shall see whose graduate does better!"
          }
        ],
        "statements": [
          {
            "q": "Online study has opened university to people wherever they live.",
            "a": "Both",
            "e": "Nữ: 'a laptop and a connection put the same lectures in front of everyone'; nam: 'That part is wonderful, I agree completely' → cả hai đồng ý."
          },
          {
            "q": "Life on campus is an important part of a real education.",
            "a": "Man",
            "e": "Nam: 'the real education happened between lectures'; nữ chỉ nói anh 'romanticise those corridors' → chỉ người đàn ông."
          },
          {
            "q": "Universities should compete with each other.",
            "a": "Man",
            "e": "Nam: 'I think universities should be pushed to compete with each other'; nữ phản đối 'rivalry can also make them chase numbers' → chỉ người đàn ông."
          },
          {
            "q": "Degrees offer too many different modules.",
            "a": "Woman",
            "e": "Nữ: 'a student who samples everything masters nothing'; nam đáp lại con gái anh thích sự đa dạng → chỉ người phụ nữ."
          }
        ]
      },
      {
        "type": "mono",
        "title": "Part 4 · Câu 16–17",
        "instr": "Nghe bài nói và trả lời 2 câu hỏi cho mỗi bài.",
        "talks": [
          {
            "topic": "A new guidebook",
            "script": [
              {
                "s": "m",
                "t": "This guidebook is designed to inspire exploration and curiosity. Instead of simply listing famous landmarks, it encourages readers to step off the beaten path and discover hidden gems."
              },
              {
                "s": "m",
                "t": "For example, it includes local stories, unique activities, and tips for immersing oneself in the culture of the places they visit."
              },
              {
                "s": "m",
                "t": "Some might think it is a little bit difficult to navigate, but in reality, it makes each journey feel like an adventure, allowing travelers to create unforgettable memories and experiences that go beyond the typical sightseeing."
              },
              {
                "s": "m",
                "t": "This guidebook resonates well with younger travelers today. Some say it's only for seasoned explorers because it focuses on local cultures, which beginners might find confusing. Others think it's outdated for those who prefer modern apps."
              },
              {
                "s": "m",
                "t": "However, it encourages real connections and unique experiences, helping travelers engage with locals."
              }
            ],
            "questions": [
              {
                "q": "What does this guidebook offer to its audience?",
                "o": [
                  "It makes travel feel like an adventure",
                  "It is difficult to navigate",
                  "It focuses solely on historical landmarks"
                ],
                "a": 0,
                "e": "'it makes each journey feel like an adventure' → mỗi chuyến đi như một cuộc phiêu lưu; khó dùng chỉ là ý kiến của một số người, và sách không chỉ nói về di tích."
              },
              {
                "q": "What is the speaker's opinion about this guidebook?",
                "o": [
                  "It appeals especially to younger travellers",
                  "It caters only to seasoned travelers",
                  "It is outdated and irrelevant"
                ],
                "a": 0,
                "e": "'This guidebook resonates well with younger travelers today' → hợp với thế hệ trẻ; 'only for seasoned explorers' và 'outdated' chỉ là ý kiến của người khác."
              }
            ]
          },
          {
            "topic": "A book about the life of a scientist",
            "script": [
              {
                "s": "f",
                "t": "Today, I want to share my thoughts on a fascinating book about the life of renowned scientist Dr. Emily Carter."
              },
              {
                "s": "f",
                "t": "One of the standout features of this book is that the way of writing is exciting for readers. The author has a talent for bringing complex scientific concepts to life, making it an engaging experience."
              },
              {
                "s": "f",
                "t": "While some may expect a heavy focus on technical details, this book skillfully balances science with storytelling, ensuring that it remains accessible. It's definitely not more of a textbook than a biography; instead, it invites readers into the scientist's world in a relatable way."
              },
              {
                "s": "f",
                "t": "Overall, I'd say it has been written for a general audience. The author's aim seems to be to inspire curiosity about science and encourage readers from all backgrounds to appreciate the contributions of Dr. Carter."
              },
              {
                "s": "f",
                "t": "Unlike other works that are only suitable for experts in the field, this book truly welcomes everyone to explore the life of an extraordinary scientist."
              }
            ],
            "questions": [
              {
                "q": "What does the speaker say about the way of writing?",
                "o": [
                  "It is focused on technical details",
                  "It is exciting to read",
                  "It is more of a textbook than a biography"
                ],
                "a": 1,
                "e": "'the way of writing is exciting for readers' → cách viết hấp dẫn; người nói bác bỏ ý 'technical details' và 'textbook'."
              },
              {
                "q": "What does the speaker say about the overall content of the book?",
                "o": [
                  "It has been written for a general audience",
                  "It is only suitable for experts in the field",
                  "It lacks engaging storytelling"
                ],
                "a": 0,
                "e": "'it has been written for a general audience' → viết cho độc giả đại chúng, không chỉ chuyên gia."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "l17",
    "title": "Đề 14 — Ocean research and marine life",
    "parts": [
      {
        "type": "mcq",
        "title": "Part 1 · Câu 1–13",
        "instr": "Nghe đoạn ngắn và chọn đáp án đúng. Mỗi đoạn nghe tối đa 2 lần.",
        "items": [
          {
            "q": "Which pier will the vessel use?",
            "o": [
              "Pier 4",
              "Pier 6",
              "Pier 8"
            ],
            "a": 1,
            "e": "'will leave from Pier 6' → tàu nghiên cứu xuất phát ở cầu tàu số 6.",
            "script": [
              {
                "s": "m",
                "t": "The research vessel will leave from Pier 6 at 6:20 tomorrow morning.",
                "hl": 1
              },
              {
                "s": "m",
                "t": "Crew members should check in at the blue office beside the gate."
              }
            ]
          },
          {
            "q": "Which animals did the team record?",
            "o": [
              "Dolphins",
              "Sea turtles",
              "Seals"
            ],
            "a": 1,
            "e": "Định quay cá heo nhưng nước đục 'so the team recorded sea turtles instead' → rùa biển.",
            "script": [
              {
                "s": "f",
                "t": "We hoped to film dolphins near the reef, but the water was cloudy, so the team recorded sea turtles instead.",
                "hl": 1
              }
            ]
          },
          {
            "q": "How long is the talk?",
            "o": [
              "25 minutes",
              "35 minutes",
              "50 minutes"
            ],
            "a": 1,
            "e": "'The aquarium talk lasts 35 minutes' → 35 phút.",
            "script": [
              {
                "s": "m",
                "t": "The aquarium talk lasts 35 minutes.",
                "hl": 1
              },
              {
                "s": "m",
                "t": "The touch-pool demonstration begins immediately afterwards."
              }
            ]
          },
          {
            "q": "What did Nora forget?",
            "o": [
              "Her lunch",
              "A water bottle",
              "The map"
            ],
            "a": 1,
            "e": "Nora có mang bữa trưa nhưng 'forgot a water bottle' → quên bình nước.",
            "script": [
              {
                "s": "f",
                "t": "Nora brought her own lunch, but forgot a water bottle.",
                "hl": 1
              },
              {
                "s": "f",
                "t": "The visitor centre has a refill tap near the maps."
              }
            ]
          },
          {
            "q": "What will volunteers do?",
            "o": [
              "Sort shell samples",
              "Repair diving gear",
              "Guide visitors"
            ],
            "a": 0,
            "e": "'needs volunteers to sort shell samples' → phân loại mẫu vỏ sò.",
            "script": [
              {
                "s": "m",
                "t": "The marine lab needs volunteers to sort shell samples on Tuesday; no diving experience is required.",
                "hl": 1
              }
            ]
          },
          {
            "q": "Where will the survey team meet?",
            "o": [
              "At the southern path",
              "At the northern car park",
              "At the harbour"
            ],
            "a": 1,
            "e": "'will meet at the northern car park' vì lối đi phía nam đóng cửa.",
            "script": [
              {
                "s": "f",
                "t": "The coastal survey team will meet at the northern car park because the southern path is closed for nesting birds.",
                "hl": 1
              }
            ]
          },
          {
            "q": "Which camera part was replaced?",
            "o": [
              "The lens",
              "The outer casing",
              "The battery"
            ],
            "a": 1,
            "e": "'replaced its outer casing but kept the lens' → thay vỏ ngoài, giữ ống kính.",
            "script": [
              {
                "s": "m",
                "t": "Our camera was damaged by salt water, so the technician replaced its outer casing but kept the lens.",
                "hl": 1
              }
            ]
          },
          {
            "q": "What is special about the new chart?",
            "o": [
              "It is waterproof",
              "It shows moon phases only",
              "It is a digital file"
            ],
            "a": 0,
            "e": "'printed on waterproof paper' → hải đồ thủy triều mới chống nước.",
            "script": [
              {
                "s": "f",
                "t": "The new tide chart is printed on waterproof paper.",
                "hl": 1
              },
              {
                "s": "f",
                "t": "The older paper copies should be recycled."
              }
            ]
          },
          {
            "q": "How much does a child under twelve pay?",
            "o": [
              "9 pounds",
              "12 pounds",
              "18 pounds"
            ],
            "a": 0,
            "e": "'9 pounds for children under twelve' → 9 bảng (18 bảng là giá người lớn).",
            "script": [
              {
                "s": "m",
                "t": "The boat trip costs 18 pounds for adults and 9 pounds for children under twelve.",
                "hl": 1
              }
            ]
          },
          {
            "q": "Where is the lecture now?",
            "o": [
              "The main theatre",
              "Room 3",
              "The library"
            ],
            "a": 1,
            "e": "'moved from the main theatre to Room 3' → giờ ở phòng 3.",
            "script": [
              {
                "s": "f",
                "t": "The reef lecture was moved from the main theatre to Room 3 because the projector there has been repaired.",
                "hl": 1
              }
            ]
          },
          {
            "q": "What does the speaker do now?",
            "o": [
              "Takes photographs",
              "Collects stones",
              "Sells shells"
            ],
            "a": 0,
            "e": "Trước đây nhặt đá, 'now I photograph them in place' → giờ chụp ảnh.",
            "script": [
              {
                "s": "m",
                "t": "I used to collect polished stones, but now I photograph them in place so that the beach remains undisturbed.",
                "hl": 1
              }
            ]
          },
          {
            "q": "Which item is unavailable?",
            "o": [
              "Guidebooks",
              "Postcards",
              "Reusable cups"
            ],
            "a": 1,
            "e": "'has run out of postcards' → hết bưu thiếp; sách hướng dẫn và cốc tái sử dụng vẫn còn.",
            "script": [
              {
                "s": "f",
                "t": "The aquarium shop has run out of postcards, although the guidebooks and reusable cups are still available.",
                "hl": 1
              }
            ]
          },
          {
            "q": "When does the final ferry leave?",
            "o": [
              "8:20",
              "8:40",
              "9:00"
            ],
            "a": 1,
            "e": "'The final ferry leaves at 8:40' → chuyến phà cuối lúc 8:40.",
            "script": [
              {
                "s": "m",
                "t": "The final ferry leaves at 8:40, giving visitors twenty minutes after the exhibition closes.",
                "hl": 1
              }
            ]
          }
        ]
      },
      {
        "type": "speakers",
        "title": "Part 2 · Câu 14",
        "instr": "Bốn người nói về cách họ gắn bó với biển. Chọn câu mô tả đúng nhất mỗi người. Có 2 lựa chọn thừa.",
        "topic": "Different ways people connect with the sea",
        "options": [
          "Studies coastal wildlife through photography",
          "Uses the water for quiet recreation",
          "Works to protect shore habitats",
          "Enjoys learning maritime history",
          "Takes part in competitive sailing races",
          "Catches fish to sell at the local market"
        ],
        "speakers": [
          {
            "a": 1,
            "e": "Người A: chèo kayak lúc bình minh, 'The quiet water gives me time to think' → dùng mặt nước để thư giãn yên tĩnh.",
            "script": [
              {
                "s": "m",
                "who": "A",
                "t": "I take a kayak out before sunrise."
              },
              {
                "s": "m",
                "who": "A",
                "t": "The quiet water gives me time to think, and I can explore coves that are hard to reach on foot."
              }
            ]
          },
          {
            "a": 2,
            "e": "Người B: nhặt dây câu và rác nhựa trên đồi cát, 'keep people away from nesting areas' → bảo vệ môi trường sống ven bờ.",
            "script": [
              {
                "s": "f",
                "who": "B",
                "t": "I volunteer with a group that removes fishing line and plastic from the dunes."
              },
              {
                "s": "f",
                "who": "B",
                "t": "We also put up signs to keep people away from nesting areas."
              }
            ]
          },
          {
            "a": 0,
            "e": "Người C: 'photograph seabirds without disturbing them' và gửi ảnh cho khảo sát động vật hoang dã → tìm hiểu động vật ven biển qua nhiếp ảnh.",
            "script": [
              {
                "s": "m",
                "who": "C",
                "t": "My camera has a long lens, so I can photograph seabirds without disturbing them."
              },
              {
                "s": "m",
                "who": "C",
                "t": "I send the best pictures to a local wildlife survey."
              }
            ]
          },
          {
            "a": 3,
            "e": "Người D: thích đến cảng cũ 'reading the plaques about shipbuilders and explorers' → thích tìm hiểu lịch sử hàng hải.",
            "script": [
              {
                "s": "f",
                "who": "D",
                "t": "I like visiting old harbours and reading the plaques about shipbuilders and explorers."
              },
              {
                "s": "f",
                "who": "D",
                "t": "Each port seems to have a different story."
              }
            ]
          }
        ]
      },
      {
        "type": "conv",
        "title": "Part 3 · Câu 15",
        "instr": "Nghe hai người thảo luận về việc có nên hạn chế tàu thuyền gần rạn san hô. Ai bày tỏ ý kiến sau: người đàn ông (Man), người phụ nữ (Woman) hay cả hai (Both)?",
        "topic": "Should boats be restricted near coral reefs?",
        "script": [
          {
            "s": "f",
            "t": "Some boats anchor too close to the reef and damage the coral. I would create a no-anchor zone around the most fragile parts."
          },
          {
            "s": "m",
            "t": "I agree about protecting the reef, but small tour operators need clear places to stop. We could install fixed mooring buoys instead."
          },
          {
            "s": "f",
            "t": "That would help, as long as the buoys are inspected regularly."
          },
          {
            "s": "m",
            "t": "The fee for using them could fund maintenance and monitoring."
          },
          {
            "s": "f",
            "t": "Good, and visitors should be told why the rules exist, not just given a fine."
          }
        ],
        "statements": [
          {
            "q": "A no-anchor zone should be created around the most fragile coral.",
            "a": "Woman",
            "e": "Người phụ nữ: 'I would create a no-anchor zone around the most fragile parts'; người đàn ông đề xuất phao neo cố định 'instead' (thay vì vùng cấm neo)."
          },
          {
            "q": "Tour boats need safe stopping points.",
            "a": "Man",
            "e": "Người đàn ông: 'small tour operators need clear places to stop'; người phụ nữ không nêu ý này."
          },
          {
            "q": "Fees for using the buoys could pay for their maintenance.",
            "a": "Both",
            "e": "Người đàn ông: 'The fee for using them could fund maintenance'; người phụ nữ đồng ý 'Good'."
          },
          {
            "q": "Explaining the rules may improve visitor cooperation.",
            "a": "Woman",
            "e": "Người phụ nữ: 'visitors should be told why the rules exist, not just given a fine'; người đàn ông không nói về việc giải thích luật."
          }
        ]
      },
      {
        "type": "mono",
        "title": "Part 4 · Câu 16–17",
        "instr": "Nghe bài nói và trả lời 2 câu hỏi cho mỗi bài.",
        "talks": [
          {
            "topic": "Tracking a whale population",
            "script": [
              {
                "s": "f",
                "t": "For six years, a research team has tracked a group of humpback whales along the northern coast."
              },
              {
                "s": "f",
                "t": "Instead of attaching devices to every animal, researchers photograph the underside of each whale's tail, where patterns are unique."
              },
              {
                "s": "f",
                "t": "The method is less invasive and allows the team to recognise returning individuals."
              },
              {
                "s": "f",
                "t": "This season, fewer whales appeared near the usual feeding area."
              },
              {
                "s": "f",
                "t": "The team does not yet know whether the animals changed route or whether food levels shifted."
              },
              {
                "s": "f",
                "t": "They will compare the photographs with reports from other coastal stations before drawing conclusions."
              }
            ],
            "questions": [
              {
                "q": "How do researchers recognise individual whales?",
                "o": [
                  "By patterns on their tails",
                  "By coloured tags on their fins",
                  "By the sound of each call"
                ],
                "a": 0,
                "e": "Họ chụp mặt dưới đuôi cá voi, 'where patterns are unique' → nhận ra từng con nhờ hoa văn trên đuôi."
              },
              {
                "q": "What will the team do before reaching a conclusion?",
                "o": [
                  "Compare records from other stations",
                  "Move the feeding area",
                  "Attach more devices"
                ],
                "a": 0,
                "e": "'compare the photographs with reports from other coastal stations before drawing conclusions' → so sánh với dữ liệu của các trạm khác."
              }
            ]
          },
          {
            "topic": "Restoring a seagrass meadow",
            "script": [
              {
                "s": "m",
                "t": "Seagrass meadows provide shelter for young fish and help hold sediment in place."
              },
              {
                "s": "m",
                "t": "In West Bay, boat traffic had damaged a large patch, so a conservation group marked a low-speed zone and planted small seagrass shoots by hand."
              },
              {
                "s": "m",
                "t": "The work was done in stages because young plants are easily disturbed."
              },
              {
                "s": "m",
                "t": "After two summers, divers found new shoots spreading beyond the original planting lines."
              },
              {
                "s": "m",
                "t": "The project is not complete: volunteers still check the area for loose anchors and report changes in water clarity."
              }
            ],
            "questions": [
              {
                "q": "What was introduced to protect the meadow?",
                "o": [
                  "A low-speed zone",
                  "A permanent fishing ban",
                  "A new sea wall"
                ],
                "a": 0,
                "e": "Tàu thuyền làm hỏng thảm cỏ biển nên nhóm bảo tồn 'marked a low-speed zone' → khu vực giới hạn tốc độ."
              },
              {
                "q": "What do volunteers continue to monitor?",
                "o": [
                  "Anchors and water clarity",
                  "The price of boat fuel",
                  "The number of beach visitors"
                ],
                "a": 0,
                "e": "'volunteers still check the area for loose anchors and report changes in water clarity' → mỏ neo và độ trong của nước."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "l18",
    "title": "Đề 15 — Personal finance and small enterprise",
    "parts": [
      {
        "type": "mcq",
        "title": "Part 1 · Câu 1–13",
        "instr": "Nghe đoạn ngắn và chọn đáp án đúng. Mỗi đoạn nghe tối đa 2 lần.",
        "items": [
          {
            "q": "Where is the class held?",
            "o": [
              "At the college",
              "At the adult learning centre",
              "At the library"
            ],
            "a": 1,
            "e": "'in the adult learning centre, not at the college campus' → lớp học ở trung tâm học tập dành cho người lớn, không phải ở trường cao đẳng.",
            "script": [
              {
                "s": "f",
                "t": "The evening bookkeeping class starts at 6:45 in the adult learning centre, not at the college campus.",
                "hl": 1
              }
            ]
          },
          {
            "q": "How much did the desk cost?",
            "o": [
              "55 pounds",
              "70 pounds",
              "75 pounds"
            ],
            "a": 0,
            "e": "'the seller accepted 55 when I collected it' → thực tế trả 55 bảng; 70 là giá dự định ban đầu.",
            "script": [
              {
                "s": "m",
                "t": "I planned to buy a second-hand desk for 70 pounds, but the seller accepted 55 when I collected it.",
                "hl": 1
              }
            ]
          },
          {
            "q": "Which day brought in more sales?",
            "o": [
              "Saturday",
              "Sunday",
              "The sales were equal"
            ],
            "a": 0,
            "e": "'420 pounds on Saturday and 360 on Sunday' → thứ bảy bán được nhiều hơn.",
            "script": [
              {
                "s": "f",
                "t": "The market stall made 420 pounds on Saturday and 360 on Sunday, before the cost of supplies was deducted.",
                "hl": 1
              }
            ]
          },
          {
            "q": "Why did Ravi open another account?",
            "o": [
              "To separate business spending",
              "To borrow money",
              "To pay his rent"
            ],
            "a": 0,
            "e": "'so he could track shop expenses without mixing them with household bills' → để tách chi tiêu kinh doanh khỏi hóa đơn gia đình.",
            "script": [
              {
                "s": "m",
                "t": "Ravi opened a separate account for his business so he could track shop expenses without mixing them with household bills.",
                "hl": 1
              }
            ]
          },
          {
            "q": "When is the session now?",
            "o": [
              "7 May",
              "14 May",
              "21 May"
            ],
            "a": 1,
            "e": "'has moved to 14 May' → buổi tư vấn đã dời sang 14/5; ngày 7/5 không còn.",
            "script": [
              {
                "s": "f",
                "t": "The tax advice session has moved to 14 May.",
                "hl": 1
              },
              {
                "s": "f",
                "t": "The earlier date, 7 May, is no longer available."
              }
            ]
          },
          {
            "q": "How did the customer receive the receipt?",
            "o": [
              "By email",
              "By post",
              "From the terminal"
            ],
            "a": 0,
            "e": "'The shop emailed one instead' → biên lai được gửi qua email vì máy không in được.",
            "script": [
              {
                "s": "m",
                "t": "A customer paid by card, but the payment terminal did not print a receipt."
              },
              {
                "s": "m",
                "t": "The shop emailed one instead.",
                "hl": 1
              }
            ]
          },
          {
            "q": "What will the shop sell first?",
            "o": [
              "Imported pens",
              "Local notebooks",
              "Greeting cards"
            ],
            "a": 1,
            "e": "'will stock locally made notebooks first' → bán sổ tay sản xuất trong vùng trước; bút nhập khẩu thêm sau.",
            "script": [
              {
                "s": "f",
                "t": "The craft shop will stock locally made notebooks first; imported pens will be added later if customers ask for them.",
                "hl": 1
              }
            ]
          },
          {
            "q": "What did the speaker spend the savings on?",
            "o": [
              "A camera",
              "A photography course",
              "A business website"
            ],
            "a": 1,
            "e": "'used the money to pay for a professional photography course' → dùng tiền tiết kiệm trả cho khóa học nhiếp ảnh.",
            "script": [
              {
                "s": "m",
                "t": "I saved 12 pounds each week for six months, then used the money to pay for a professional photography course.",
                "hl": 1
              }
            ]
          },
          {
            "q": "When should the supplier receive the money?",
            "o": [
              "Wednesday morning",
              "Thursday afternoon",
              "Friday evening"
            ],
            "a": 1,
            "e": "'the supplier should receive payment by Thursday afternoon' → nhà cung cấp nhận tiền vào chiều thứ năm.",
            "script": [
              {
                "s": "f",
                "t": "The bank transfer takes one working day, so the supplier should receive payment by Thursday afternoon.",
                "hl": 1
              }
            ]
          },
          {
            "q": "How much is the almond cake?",
            "o": [
              "24 pounds",
              "28 pounds",
              "32 pounds"
            ],
            "a": 2,
            "e": "'the almond layer cake at 32 pounds' → bánh hạnh nhân 32 bảng; bánh chanh 24.",
            "script": [
              {
                "s": "m",
                "t": "The bakery's most expensive cake is the almond layer cake at 32 pounds.",
                "hl": 1
              },
              {
                "s": "m",
                "t": "The lemon cake costs 24."
              }
            ]
          },
          {
            "q": "What remains free?",
            "o": [
              "Home delivery",
              "Store collection",
              "Packaging"
            ],
            "a": 1,
            "e": "'collection from the store is still free' → nhận hàng tại cửa hàng vẫn miễn phí; giao hàng tận nơi đã bị bỏ.",
            "script": [
              {
                "s": "f",
                "t": "The shop owner stopped offering free delivery because fuel costs rose, but collection from the store is still free.",
                "hl": 1
              }
            ]
          },
          {
            "q": "What should Elena do first?",
            "o": [
              "Test the product at a market",
              "Rent a larger shop",
              "Hire another worker"
            ],
            "a": 0,
            "e": "'asked Elena to test her product at a weekend market before ordering a large quantity' → thử sản phẩm ở chợ cuối tuần trước.",
            "script": [
              {
                "s": "m",
                "t": "The business mentor asked Elena to test her product at a weekend market before ordering a large quantity.",
                "hl": 1
              }
            ]
          },
          {
            "q": "What is the new payment deadline?",
            "o": [
              "The 3rd",
              "The 10th",
              "The 13th"
            ],
            "a": 1,
            "e": "'asked for an extension until the 10th' → hạn mới là ngày 10; ngày 3 là hạn cũ.",
            "script": [
              {
                "s": "f",
                "t": "The invoice was due on the 3rd, but the client asked for an extension until the 10th.",
                "hl": 1
              }
            ]
          }
        ]
      },
      {
        "type": "speakers",
        "title": "Part 2 · Câu 14",
        "instr": "Bốn người nói về cách quản lý tiền bạc. Chọn câu mô tả đúng nhất mỗi người. Có 2 lựa chọn thừa.",
        "topic": "How people manage their money",
        "options": [
          "Builds a safety buffer for surprises",
          "Invests regularly in company shares",
          "Learns by managing a small venture",
          "Plans purchases before shopping",
          "Borrows from friends when money runs short",
          "Compares fees before choosing a service"
        ],
        "speakers": [
          {
            "a": 5,
            "e": "Người A: 'I look at the full cost of a bank account, including the monthly fee' → so sánh toàn bộ phí trước khi chọn dịch vụ.",
            "script": [
              {
                "s": "f",
                "who": "A",
                "t": "I look at the full cost of a bank account, including the monthly fee and charges for using cash machines abroad."
              },
              {
                "s": "f",
                "who": "A",
                "t": "The headline offer can be misleading."
              }
            ]
          },
          {
            "a": 2,
            "e": "Người B: 'I started selling knitted scarves at school fairs' → học qua việc tự điều hành một việc kinh doanh nhỏ.",
            "script": [
              {
                "s": "m",
                "who": "B",
                "t": "I started selling knitted scarves at school fairs."
              },
              {
                "s": "m",
                "who": "B",
                "t": "Keeping a record of the materials and hours taught me more than reading a business guide."
              }
            ]
          },
          {
            "a": 0,
            "e": "Người C: 'I move a little money into an account I do not use for everyday spending' → lập quỹ dự phòng cho việc bất ngờ như hỏng lò sưởi.",
            "script": [
              {
                "s": "f",
                "who": "C",
                "t": "Every payday I move a little money into an account I do not use for everyday spending."
              },
              {
                "s": "f",
                "who": "C",
                "t": "It is there for a broken boiler or an unexpected bill."
              }
            ]
          },
          {
            "a": 3,
            "e": "Người D: 'I write a meal plan and a list' → lên kế hoạch mua sắm trước khi đi siêu thị.",
            "script": [
              {
                "s": "m",
                "who": "D",
                "t": "Before I go to the supermarket, I write a meal plan and a list."
              },
              {
                "s": "m",
                "who": "D",
                "t": "It stops me buying ingredients that will sit unused in the cupboard."
              }
            ]
          }
        ]
      },
      {
        "type": "conv",
        "title": "Part 3 · Câu 15",
        "instr": "Nghe hai người thảo luận về thanh toán điện tử ở các cửa hàng nhỏ. Ai bày tỏ ý kiến sau: người đàn ông (Man), người phụ nữ (Woman) hay cả hai (Both)?",
        "topic": "Should cash shops be required to accept digital payments?",
        "script": [
          {
            "s": "m",
            "t": "Digital payments are fast and make it easier for businesses to keep accurate records."
          },
          {
            "s": "f",
            "t": "That is true, but some older customers and people without bank accounts rely on cash."
          },
          {
            "s": "m",
            "t": "Shops could offer both, though a card terminal has a monthly cost."
          },
          {
            "s": "f",
            "t": "Perhaps a city grant could help very small shops with those costs."
          },
          {
            "s": "m",
            "t": "I would support that if the shop still has a choice."
          },
          {
            "s": "f",
            "t": "Agreed. The aim should be access and convenience, not forcing one method on every customer."
          }
        ],
        "statements": [
          {
            "q": "Digital payments can simplify record keeping.",
            "a": "Both",
            "e": "Nam: 'make it easier for businesses to keep accurate records'; nữ đáp 'That is true' → cả hai đồng ý."
          },
          {
            "q": "Some customers depend on cash.",
            "a": "Woman",
            "e": "Nữ: 'some older customers and people without bank accounts rely on cash'; nam chỉ nói cửa hàng có thể nhận cả hai → chỉ người phụ nữ."
          },
          {
            "q": "Small shops may need help covering terminal costs.",
            "a": "Both",
            "e": "Nam: 'a card terminal has a monthly cost'; nữ: 'a city grant could help very small shops with those costs' và nam 'I would support that' → cả hai."
          },
          {
            "q": "Businesses should retain some choice about payment methods.",
            "a": "Both",
            "e": "Nam: 'if the shop still has a choice'; nữ: 'Agreed... not forcing one method on every customer' → cả hai."
          }
        ]
      },
      {
        "type": "mono",
        "title": "Part 4 · Câu 16–17",
        "instr": "Nghe bài nói và trả lời 2 câu hỏi cho mỗi bài.",
        "talks": [
          {
            "topic": "A repair business grows slowly",
            "script": [
              {
                "s": "f",
                "t": "When Aisha began repairing suitcases, she worked from a small table in her hallway and accepted jobs only from neighbours."
              },
              {
                "s": "f",
                "t": "She kept photographs of each repair and asked customers what had failed, which helped her choose durable materials. After a year, a luggage shop offered to refer customers to her."
              },
              {
                "s": "f",
                "t": "Aisha did not rent a workshop immediately; she first tracked how many jobs arrived each month."
              },
              {
                "s": "f",
                "t": "Once the work became steady, she moved into a shared makers' space, where rent and equipment costs were lower than in a private shop."
              }
            ],
            "questions": [
              {
                "q": "How did Aisha decide whether to rent a workshop?",
                "o": [
                  "She borrowed money from a bank",
                  "She tracked how many jobs came in",
                  "She hired a full-time assistant"
                ],
                "a": 1,
                "e": "'she first tracked how many jobs arrived each month' → cô theo dõi số việc nhận được mỗi tháng trước khi quyết định thuê xưởng."
              },
              {
                "q": "Why did she choose a shared makers' space?",
                "o": [
                  "It was closer to the airport",
                  "It had more retail customers",
                  "It reduced rent and equipment costs"
                ],
                "a": 2,
                "e": "'rent and equipment costs were lower' → chi phí thuê và thiết bị thấp hơn so với cửa hàng riêng."
              }
            ]
          },
          {
            "topic": "Understanding a credit agreement",
            "script": [
              {
                "s": "m",
                "t": "Before signing a credit agreement, borrowers should look beyond the monthly payment. The total amount repaid includes interest and sometimes additional fees."
              },
              {
                "s": "m",
                "t": "A low monthly figure may simply mean that payments continue for longer."
              },
              {
                "s": "m",
                "t": "It is also important to check whether the interest rate can change and what happens after a missed payment."
              },
              {
                "s": "m",
                "t": "If any term is unclear, the speaker recommends asking the provider to explain it in writing and comparing the offer with another lender. Taking time to compare can prevent an affordable-looking deal from becoming expensive."
              }
            ],
            "questions": [
              {
                "q": "What may a low monthly payment indicate?",
                "o": [
                  "No interest charges",
                  "A shorter contract",
                  "A longer repayment period"
                ],
                "a": 2,
                "e": "'payments continue for longer' → khoản trả hằng tháng thấp có thể nghĩa là thời gian trả nợ kéo dài hơn."
              },
              {
                "q": "What should a borrower do when a term is unclear?",
                "o": [
                  "Sign before the offer expires",
                  "Ask for a written explanation",
                  "Pay a larger deposit immediately"
                ],
                "a": 1,
                "e": "'asking the provider to explain it in writing' → yêu cầu bên cho vay giải thích bằng văn bản."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "l19",
    "title": "Đề 16 — Sport, training and competition",
    "parts": [
      {
        "type": "mcq",
        "title": "Part 1 · Câu 1–13",
        "instr": "Nghe đoạn ngắn và chọn đáp án đúng. Mỗi đoạn nghe tối đa 2 lần.",
        "items": [
          {
            "q": "Where will the fencing session take place?",
            "o": [
              "Court A",
              "Court B",
              "The outdoor field"
            ],
            "a": 1,
            "e": "'has moved to Court B because the main hall is being used' → buổi đấu kiếm chuyển sang Court B.",
            "script": [
              {
                "s": "f",
                "t": "The junior fencing session has moved to Court B because the main hall is being used for a volleyball match.",
                "hl": 1
              }
            ]
          },
          {
            "q": "What happened after the first set?",
            "o": [
              "They won two sets",
              "The match was cancelled",
              "They changed teams"
            ],
            "a": 0,
            "e": "Thua set đầu 'then won the next two sets to take the match' → thắng hai set tiếp theo.",
            "script": [
              {
                "s": "m",
                "t": "Our team lost the first set 21-18, then won the next two sets to take the match.",
                "hl": 1
              }
            ]
          },
          {
            "q": "By what time must runners collect a number?",
            "o": [
              "8:10",
              "8:30",
              "9:10"
            ],
            "a": 1,
            "e": "'must collect their number no later than 8:30' → 8:30 (9:10 là giờ xuất phát).",
            "script": [
              {
                "s": "f",
                "t": "The race begins at 9:10, but runners must collect their number no later than 8:30.",
                "hl": 1
              }
            ]
          },
          {
            "q": "When does the speaker train now?",
            "o": [
              "In the morning",
              "Late afternoon",
              "At night"
            ],
            "a": 1,
            "e": "'has made me switch to late afternoon' → giờ tập chuyển sang cuối giờ chiều.",
            "script": [
              {
                "s": "m",
                "t": "I used to train in the morning, but the new pool timetable has made me switch to late afternoon.",
                "hl": 1
              }
            ]
          },
          {
            "q": "What help does the club need?",
            "o": [
              "Score recording",
              "Coaching",
              "Transport"
            ],
            "a": 0,
            "e": "'needs a volunteer to record scores' → cần người ghi điểm.",
            "script": [
              {
                "s": "f",
                "t": "The club needs a volunteer to record scores at Saturday's junior basketball tournament.",
                "hl": 1
              }
            ]
          },
          {
            "q": "What extra service came with the shoes?",
            "o": [
              "A free gait check",
              "A training plan",
              "A second pair"
            ],
            "a": 0,
            "e": "'the shop offered a free gait check' → được kiểm tra dáng chạy miễn phí.",
            "script": [
              {
                "s": "f",
                "t": "Marta's new running shoes cost 68 euros."
              },
              {
                "s": "f",
                "t": "She chose them because the shop offered a free gait check.",
                "hl": 1
              }
            ]
          },
          {
            "q": "When does the wall reopen?",
            "o": [
              "Monday evening",
              "Tuesday at noon",
              "Wednesday morning"
            ],
            "a": 1,
            "e": "'it reopens at noon on Tuesday' → mở lại trưa thứ Ba.",
            "script": [
              {
                "s": "m",
                "t": "The climbing wall is closed on Mondays for safety inspections; it reopens at noon on Tuesday.",
                "hl": 1
              }
            ]
          },
          {
            "q": "What did the coach keep?",
            "o": [
              "The full warm-up",
              "Balance exercises",
              "The final race"
            ],
            "a": 1,
            "e": "'shortened the warm-up ... but kept the balance exercises' → giữ lại bài tập thăng bằng.",
            "script": [
              {
                "s": "f",
                "t": "Our coach shortened the warm-up after the team arrived late, but kept the balance exercises.",
                "hl": 1
              }
            ]
          },
          {
            "q": "How far is the route?",
            "o": [
              "10 kilometres",
              "18 kilometres",
              "28 kilometres"
            ],
            "a": 1,
            "e": "'The cycling route is 18 kilometres' → 18 km (10 km chỉ là chỗ dừng lấy nước).",
            "script": [
              {
                "s": "m",
                "t": "The cycling route is 18 kilometres, with a water stop at the old railway bridge after the first 10 kilometres.",
                "hl": 1
              }
            ]
          },
          {
            "q": "Which position will the speaker play?",
            "o": [
              "Goalkeeper",
              "Midfield",
              "Defence"
            ],
            "a": 0,
            "e": "'I was chosen as goalkeeper for the final' → chơi thủ môn (dù thường đá tiền vệ).",
            "script": [
              {
                "s": "m",
                "t": "I was chosen as goalkeeper for the final, even though I usually play in midfield.",
                "hl": 1
              }
            ]
          },
          {
            "q": "What does the monthly plan include?",
            "o": [
              "Two training sessions",
              "Free sports shoes",
              "A yearly pass"
            ],
            "a": 0,
            "e": "'the monthly plan includes two personal training sessions' → gói tháng gồm hai buổi tập cá nhân.",
            "script": [
              {
                "s": "f",
                "t": "The gym membership is cheaper if paid yearly, but the monthly plan includes two personal training sessions.",
                "hl": 1
              }
            ]
          },
          {
            "q": "Why was the game paused?",
            "o": [
              "The court became slippery",
              "A player lost a shoe",
              "The lights went out"
            ],
            "a": 0,
            "e": "'heavy rain made the court slippery' → mưa lớn làm sân trơn.",
            "script": [
              {
                "s": "m",
                "t": "The referee stopped the match for five minutes after heavy rain made the court slippery.",
                "hl": 1
              }
            ]
          },
          {
            "q": "What will the money support?",
            "o": [
              "New rescue equipment",
              "A swimming pool renovation",
              "A school sports trip"
            ],
            "a": 0,
            "e": "'enough to buy new equipment for the local rescue team' → mua thiết bị mới cho đội cứu hộ.",
            "script": [
              {
                "s": "f",
                "t": "The charity swim raised 2,400 pounds, enough to buy new equipment for the local rescue team.",
                "hl": 1
              }
            ]
          }
        ]
      },
      {
        "type": "speakers",
        "title": "Part 2 · Câu 14",
        "instr": "Bốn người nói về điều giữ chân mọi người với thể thao. Chọn câu mô tả đúng nhất mỗi người. Có 2 lựa chọn thừa.",
        "topic": "What keeps people involved in sport",
        "options": [
          "Enjoys measurable personal progress",
          "Values the social side of training",
          "Likes the tactical challenge",
          "Uses sport to explore outdoors",
          "Hopes to turn a hobby into a career",
          "Prefers to train completely alone"
        ],
        "speakers": [
          {
            "a": 2,
            "e": "Người A: 'working out which route will get us to each checkpoint' → thích thử thách chiến thuật chọn đường.",
            "script": [
              {
                "s": "f",
                "who": "A",
                "t": "I joined a weekend orienteering group. We run through the hills, but the best part is working out which route will get us to each checkpoint."
              }
            ]
          },
          {
            "a": 0,
            "e": "Người B: ghi lại thời gian bơi, 'it is satisfying to see a small improvement' → thích thấy tiến bộ đo được.",
            "script": [
              {
                "s": "m",
                "who": "B",
                "t": "I keep a simple log of my swim times. I am not trying to beat anyone else; it is satisfying to see a small improvement every few weeks."
              }
            ]
          },
          {
            "a": 1,
            "e": "Người C: 'the conversations between points are as enjoyable as the game' và cả nhóm ở lại uống trà → coi trọng khía cạnh xã hội.",
            "script": [
              {
                "s": "f",
                "who": "C",
                "t": "I play doubles tennis because the conversations between points are as enjoyable as the game. The group often stays for tea afterwards."
              }
            ]
          },
          {
            "a": 3,
            "e": "Người D: đạp xe địa hình trên đường mòn mới, 'Reaching a viewpoint' như một cuộc phiêu lưu → dùng thể thao để khám phá thiên nhiên.",
            "script": [
              {
                "s": "m",
                "who": "D",
                "t": "I ride a mountain bike on new trails. Reaching a viewpoint under my own effort makes the exercise feel like an adventure."
              }
            ]
          }
        ]
      },
      {
        "type": "conv",
        "title": "Part 3 · Câu 15",
        "instr": "Nghe hai người thảo luận về việc trẻ em có nên chuyên một môn thể thao từ sớm. Ai bày tỏ ý kiến sau: người đàn ông (Man), người phụ nữ (Woman) hay cả hai (Both)?",
        "topic": "Should children specialise in one sport early?",
        "script": [
          {
            "s": "f",
            "t": "Training in one sport from a young age can help a talented child develop strong skills."
          },
          {
            "s": "m",
            "t": "It can, but repeating the same movements may cause injuries, and children can burn out."
          },
          {
            "s": "f",
            "t": "Coaches could include general fitness and rest periods."
          },
          {
            "s": "m",
            "t": "I would also encourage children to try other activities before choosing a main sport."
          },
          {
            "s": "f",
            "t": "That gives them more experience, though families may struggle with the cost of several clubs."
          },
          {
            "s": "m",
            "t": "Schools could offer trial sessions so children can explore without paying for a full season."
          }
        ],
        "statements": [
          {
            "q": "Early focus may help a child build specialist skills.",
            "a": "Both",
            "e": "Người phụ nữ: 'can help a talented child develop strong skills'; người đàn ông đồng ý: 'It can, but...'."
          },
          {
            "q": "Too much repetition can lead to injury or loss of interest.",
            "a": "Man",
            "e": "Người đàn ông: 'repeating the same movements may cause injuries, and children can burn out'; người phụ nữ chỉ đề xuất bổ sung thể lực."
          },
          {
            "q": "Trying other sports can broaden a child's experience.",
            "a": "Both",
            "e": "Người đàn ông: 'try other activities before choosing a main sport'; người phụ nữ: 'That gives them more experience'."
          },
          {
            "q": "Schools could reduce the cost of trying activities.",
            "a": "Man",
            "e": "Người đàn ông: 'Schools could offer trial sessions ... without paying for a full season'; người phụ nữ chỉ nêu vấn đề chi phí."
          }
        ]
      },
      {
        "type": "mono",
        "title": "Part 4 · Câu 16–17",
        "instr": "Nghe bài nói và trả lời 2 câu hỏi cho mỗi bài.",
        "talks": [
          {
            "topic": "A community running track",
            "script": [
              {
                "s": "f",
                "t": "The town's old running track had a cracked surface and poor lighting."
              },
              {
                "s": "f",
                "t": "Rather than replacing it with a commercial sports centre, residents voted to repair the track and add a small covered area for stretching."
              },
              {
                "s": "f",
                "t": "The project was paid for through a council grant and a sponsored run organised by local schools."
              },
              {
                "s": "f",
                "t": "The track is open without charge in the daytime, while the lights switch off at 9 p.m."
              },
              {
                "s": "f",
                "t": "Organisers say the main improvement is not faster race times but the fact that beginners now feel comfortable using the space."
              }
            ],
            "questions": [
              {
                "q": "How was part of the track project funded?",
                "o": [
                  "A sponsored run",
                  "Membership fees",
                  "A ticketed concert"
                ],
                "a": 0,
                "e": "'a council grant and a sponsored run organised by local schools' → một phần tiền đến từ cuộc chạy gây quỹ."
              },
              {
                "q": "What change do organisers value most?",
                "o": [
                  "Beginners feel welcome",
                  "The track is longer",
                  "The town hosts more races"
                ],
                "a": 0,
                "e": "'beginners now feel comfortable using the space' → cải thiện chính là người mới thấy thoải mái, không phải thành tích nhanh hơn."
              }
            ]
          },
          {
            "topic": "Recovery after exercise",
            "script": [
              {
                "s": "m",
                "t": "Rest is part of training, not a reward for finishing it."
              },
              {
                "s": "m",
                "t": "Muscles need time to adapt after hard exercise, and sleep supports that process."
              },
              {
                "s": "m",
                "t": "A rest day does not always mean staying still: gentle walking or stretching may help someone feel less stiff."
              },
              {
                "s": "m",
                "t": "The right schedule depends on the person and the activity."
              },
              {
                "s": "m",
                "t": "If pain is sharp or continues to worsen, it should not be treated as ordinary tiredness."
              },
              {
                "s": "m",
                "t": "The speaker advises athletes to increase training gradually and seek professional guidance when an injury is suspected."
              }
            ],
            "questions": [
              {
                "q": "Why is rest important after hard exercise?",
                "o": [
                  "It gives muscles time to adapt",
                  "It immediately improves speed",
                  "It replaces the need for sleep"
                ],
                "a": 0,
                "e": "'Muscles need time to adapt after hard exercise' → cơ cần thời gian thích nghi; giấc ngủ hỗ trợ chứ không bị thay thế."
              },
              {
                "q": "What should someone do about worsening sharp pain?",
                "o": [
                  "Seek professional guidance",
                  "Train harder the next day",
                  "Ignore it as normal tiredness"
                ],
                "a": 0,
                "e": "'seek professional guidance when an injury is suspected' → tìm lời khuyên chuyên môn, không coi đó là mệt thông thường."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "l20",
    "title": "Đề 17 — Community theatre and storytelling",
    "parts": [
      {
        "type": "mcq",
        "title": "Part 1 · Câu 1–13",
        "instr": "Nghe đoạn ngắn và chọn đáp án đúng. Mỗi đoạn nghe tối đa 2 lần.",
        "items": [
          {
            "q": "Where is the fitting?",
            "o": [
              "In the wardrobe room",
              "In the lobby",
              "At the ticket office"
            ],
            "a": 0,
            "e": "'at 4:15 in the wardrobe room behind the stage' → buổi thử trang phục ở phòng phục trang.",
            "script": [
              {
                "s": "f",
                "t": "The costume fitting for the lead actor is at 4:15 in the wardrobe room behind the stage.",
                "hl": 1
              }
            ]
          },
          {
            "q": "When is opening night now?",
            "o": [
              "The 12th",
              "The 14th",
              "The 21st"
            ],
            "a": 1,
            "e": "Dự định mở màn ngày 12 nhưng sự cố ánh sáng 'has moved opening night to the 14th' → ngày 14.",
            "script": [
              {
                "s": "m",
                "t": "The play was due to open on the 12th, but a lighting problem has moved opening night to the 14th.",
                "hl": 1
              }
            ]
          },
          {
            "q": "What was removed?",
            "o": [
              "The final song",
              "The opening scene",
              "The interval"
            ],
            "a": 0,
            "e": "'The director cut the final song, not the opening scene' → bỏ bài hát cuối.",
            "script": [
              {
                "s": "f",
                "t": "The director cut the final song, not the opening scene, to keep the performance under two hours.",
                "hl": 1
              }
            ]
          },
          {
            "q": "What role did the speaker choose?",
            "o": [
              "Actor",
              "Props manager",
              "Stage musician"
            ],
            "a": 1,
            "e": "'I volunteered to manage props' và không muốn diễn trên sân khấu → quản lý đạo cụ.",
            "script": [
              {
                "s": "m",
                "t": "I volunteered to manage props because I enjoy organising objects, although I do not want to act on stage.",
                "hl": 1
              }
            ]
          },
          {
            "q": "How much is a child ticket?",
            "o": [
              "4 pounds",
              "6 pounds",
              "8 pounds"
            ],
            "a": 0,
            "e": "'8 pounds for adults and 4 pounds for children' → vé trẻ em 4 bảng.",
            "script": [
              {
                "s": "f",
                "t": "The community play costs 8 pounds for adults and 4 pounds for children under sixteen.",
                "hl": 1
              }
            ]
          },
          {
            "q": "Where is the current rehearsal recording?",
            "o": [
              "In Scene Three",
              "In Drafts",
              "On a memory stick"
            ],
            "a": 0,
            "e": "Bản ghi diễn tập nằm trong thư mục 'Scene Three'; 'Drafts' chỉ chứa bản cũ.",
            "script": [
              {
                "s": "m",
                "t": "The rehearsal recording is stored in the shared folder labelled \"Scene Three\"; the older version is in \"Drafts\".",
                "hl": 1
              }
            ]
          },
          {
            "q": "How many seats are reserved?",
            "o": [
              "Four",
              "Six",
              "Eight"
            ],
            "a": 1,
            "e": "'reserved six seats near the aisle' → giữ 6 ghế.",
            "script": [
              {
                "s": "f",
                "t": "The theatre has reserved six seats near the aisle for visitors who use wheelchairs and their companions.",
                "hl": 1
              }
            ]
          },
          {
            "q": "What item was missing?",
            "o": [
              "A silver necklace",
              "A pair of shoes",
              "A hat"
            ],
            "a": 0,
            "e": "'The actor forgot the silver necklace' → thiếu chiếc vòng cổ bạc nên phải mượn cái tương tự.",
            "script": [
              {
                "s": "m",
                "t": "The actor forgot the silver necklace, so the wardrobe team borrowed a similar one from the historical society.",
                "hl": 1
              }
            ]
          },
          {
            "q": "When is the sound check?",
            "o": [
              "At noon",
              "At 2 p.m.",
              "At 5 p.m."
            ],
            "a": 1,
            "e": "'at 2:00 in the afternoon' → 2 giờ chiều.",
            "script": [
              {
                "s": "f",
                "t": "The sound check will happen before the cast arrives, at 2:00 in the afternoon.",
                "hl": 1
              }
            ]
          },
          {
            "q": "How can online bookings be paid?",
            "o": [
              "By card",
              "By cash",
              "By bank cheque"
            ],
            "a": 0,
            "e": "Quầy vé nhận cả tiền mặt và thẻ, nhưng 'online bookings must be paid for by card' → đặt online chỉ trả bằng thẻ.",
            "script": [
              {
                "s": "m",
                "t": "The ticket desk accepts cash and card, but online bookings must be paid for by card.",
                "hl": 1
              }
            ]
          },
          {
            "q": "When is the play set?",
            "o": [
              "1958",
              "1998",
              "Last year"
            ],
            "a": 0,
            "e": "'set in a seaside hotel in 1958'; 'last year' là năm viết kịch bản.",
            "script": [
              {
                "s": "f",
                "t": "The play is set in a seaside hotel in 1958, even though the script was written last year.",
                "hl": 1
              }
            ]
          },
          {
            "q": "Who composed the pre-show music?",
            "o": [
              "A local musician",
              "The director",
              "The lead actor"
            ],
            "a": 0,
            "e": "'A local musician composed the short piece' phát khi khán giả vào chỗ → nhạc sĩ địa phương.",
            "script": [
              {
                "s": "m",
                "t": "A local musician composed the short piece that plays while the audience takes their seats.",
                "hl": 1
              }
            ]
          },
          {
            "q": "What do participants learn first?",
            "o": [
              "Stage movement",
              "Voice projection",
              "Lighting design"
            ],
            "a": 1,
            "e": "'teaches voice projection first, then ... movement' → học phát âm vang trước.",
            "script": [
              {
                "s": "f",
                "t": "The theatre workshop teaches voice projection first, then participants practise movement and stage positions.",
                "hl": 1
              }
            ]
          }
        ]
      },
      {
        "type": "speakers",
        "title": "Part 2 · Câu 14",
        "instr": "Bốn người nói về lý do tham gia sân khấu cộng đồng. Chọn câu mô tả đúng nhất mỗi người. Có 2 lựa chọn thừa.",
        "topic": "Why people take part in local theatre",
        "options": [
          "Enjoys designing visual details",
          "Likes performing for an audience",
          "Prefers the technical work backstage",
          "Uses theatre to build confidence",
          "Hopes to make acting a career",
          "Values the friendships made in the group"
        ],
        "speakers": [
          {
            "a": 3,
            "e": "Người A: từng 'nervous speaking in meetings', lớp diễn xuất giúp luyện giọng và giao tiếp bằng mắt → dùng sân khấu để tự tin hơn.",
            "script": [
              {
                "s": "f",
                "who": "A",
                "t": "I used to be nervous speaking in meetings. Acting classes gave me a safe place to practise projecting my voice and making eye contact."
              }
            ]
          },
          {
            "a": 0,
            "e": "Người B: 'I paint scenery and make paper props' — thích biến sân khấu trống thành con phố → thiết kế chi tiết hình ảnh.",
            "script": [
              {
                "s": "m",
                "who": "B",
                "t": "I paint scenery and make paper props. Seeing a blank stage turn into a believable street is the most satisfying part for me."
              }
            ]
          },
          {
            "a": 1,
            "e": "Người C: thích khoảnh khắc 'the audience reacts to a joke' → thích biểu diễn trước khán giả.",
            "script": [
              {
                "s": "f",
                "who": "C",
                "t": "I enjoy the moment when the audience reacts to a joke or becomes quiet during a serious scene. Their attention changes each performance."
              }
            ]
          },
          {
            "a": 2,
            "e": "Người D: 'I work on lights and sound from the control desk', thích làm việc 'without being seen' → công việc kỹ thuật hậu trường.",
            "script": [
              {
                "s": "m",
                "who": "D",
                "t": "I work on lights and sound from the control desk. I like solving problems without being seen, and the timing has to be precise."
              }
            ]
          }
        ]
      },
      {
        "type": "conv",
        "title": "Part 3 · Câu 15",
        "instr": "Nghe hai người thảo luận về việc nhà hát có nên cấm điện thoại trong buổi diễn. Ai bày tỏ ý kiến sau: người đàn ông (Man), người phụ nữ (Woman) hay cả hai (Both)?",
        "topic": "Should theatres use phone-free performances?",
        "script": [
          {
            "s": "m",
            "t": "A phone ringing can break the mood for everyone, so I would ask audiences to switch devices off."
          },
          {
            "s": "f",
            "t": "I agree about sound, but some people need to keep a phone available for family or medical reasons."
          },
          {
            "s": "m",
            "t": "The theatre could offer a quiet alert option with staff checking messages."
          },
          {
            "s": "f",
            "t": "That is more considerate. We should also explain the policy before the performance, rather than shaming someone in the room."
          },
          {
            "s": "m",
            "t": "Yes, and photography can be restricted during the show while still allowed at the curtain call."
          },
          {
            "s": "f",
            "t": "That seems like a fair balance."
          }
        ],
        "statements": [
          {
            "q": "Phone sounds can disturb a performance.",
            "a": "Both",
            "e": "Người đàn ông: 'A phone ringing can break the mood for everyone'; người phụ nữ đồng ý: 'I agree about sound'."
          },
          {
            "q": "Some audience members may need access to a phone.",
            "a": "Woman",
            "e": "Người phụ nữ: 'some people need to keep a phone available for family or medical reasons'; người đàn ông chỉ đề xuất cách xử lý."
          },
          {
            "q": "The policy should be explained in advance.",
            "a": "Both",
            "e": "Người phụ nữ: 'We should also explain the policy before the performance'; người đàn ông đồng ý ngay: 'Yes, and...'."
          },
          {
            "q": "Photos may be allowed after the performance.",
            "a": "Both",
            "e": "Người đàn ông: chụp ảnh 'still allowed at the curtain call'; người phụ nữ tán thành: 'That seems like a fair balance'."
          }
        ]
      },
      {
        "type": "mono",
        "title": "Part 4 · Câu 16–17",
        "instr": "Nghe bài nói và trả lời 2 câu hỏi cho mỗi bài.",
        "talks": [
          {
            "topic": "Reviving a village playhouse",
            "script": [
              {
                "s": "f",
                "t": "The Lantern Playhouse had been closed for twelve years when a group of residents began raising money to reopen it."
              },
              {
                "s": "f",
                "t": "They did not have enough to renovate the whole building, so they started with the smaller studio and made it accessible from the street."
              },
              {
                "s": "f",
                "t": "Local tradespeople donated several weekends of work, while a regional arts fund paid for fire-safety improvements."
              },
              {
                "s": "f",
                "t": "The first season featured short plays by local writers rather than well-known productions."
              },
              {
                "s": "f",
                "t": "Attendance was modest at first, but workshops for schools helped introduce new audiences."
              }
            ],
            "questions": [
              {
                "q": "Which part of the building reopened first?",
                "o": [
                  "The smaller studio",
                  "The main auditorium",
                  "The rehearsal loft"
                ],
                "a": 0,
                "e": "'so they started with the smaller studio' → không đủ tiền sửa cả tòa nhà nên mở phòng studio nhỏ trước."
              },
              {
                "q": "How did the project reach new audiences?",
                "o": [
                  "By offering school workshops",
                  "By lowering every ticket price",
                  "By inviting television actors"
                ],
                "a": 0,
                "e": "'workshops for schools helped introduce new audiences' → các buổi workshop cho trường học."
              }
            ]
          },
          {
            "topic": "How stories change on stage",
            "script": [
              {
                "s": "m",
                "t": "A story written for a novel cannot always be transferred directly to a stage."
              },
              {
                "s": "m",
                "t": "A book can describe a character's private thoughts, but theatre must show those thoughts through speech, movement, or design."
              },
              {
                "s": "m",
                "t": "The adaptation team may combine minor characters or remove events that would take too long to perform."
              },
              {
                "s": "m",
                "t": "These changes do not necessarily mean the writers have misunderstood the original."
              },
              {
                "s": "m",
                "t": "Their goal is to preserve the central conflict and emotional effect while using the resources of live performance."
              },
              {
                "s": "m",
                "t": "A successful adaptation feels complete in its new form."
              }
            ],
            "questions": [
              {
                "q": "How can a play show a character's private thoughts?",
                "o": [
                  "Through speech, movement, or design",
                  "By adding a narrator to every scene",
                  "By printing them on the programme"
                ],
                "a": 0,
                "e": "'theatre must show those thoughts through speech, movement, or design' → qua lời thoại, cử động hoặc thiết kế sân khấu."
              },
              {
                "q": "What should an adaptation preserve?",
                "o": [
                  "The central conflict and emotional effect",
                  "Every event in the book",
                  "The original chapter order"
                ],
                "a": 0,
                "e": "'Their goal is to preserve the central conflict and emotional effect' → giữ xung đột chính và hiệu quả cảm xúc; các sự kiện có thể bị lược bớt."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "l21",
    "title": "Đề 18 — Agriculture, seeds and resilient crops",
    "parts": [
      {
        "type": "mcq",
        "title": "Part 1 · Câu 1–13",
        "instr": "Nghe đoạn ngắn và chọn đáp án đúng. Mỗi đoạn nghe tối đa 2 lần.",
        "items": [
          {
            "q": "When is the seed library open?",
            "o": [
              "Wednesday afternoon",
              "Thursday morning",
              "Saturday evening"
            ],
            "a": 0,
            "e": "'open on Wednesday afternoons from 1 until 5' → chiều thứ Tư.",
            "script": [
              {
                "s": "f",
                "t": "The seed library is open on Wednesday afternoons from 1 until 5.",
                "hl": 1
              },
              {
                "s": "f",
                "t": "Members can return packets at the side entrance."
              }
            ]
          },
          {
            "q": "What did the gardener do first?",
            "o": [
              "Opened the roof vents",
              "Moved the seedlings outside",
              "Added fertilizer"
            ],
            "a": 0,
            "e": "'opened the roof vents before watering the seedlings' → mở cửa thông gió trên mái trước.",
            "script": [
              {
                "s": "m",
                "t": "The greenhouse temperature reached 31 degrees, so the gardener opened the roof vents before watering the seedlings.",
                "hl": 1
              }
            ]
          },
          {
            "q": "Which tomatoes can be picked now?",
            "o": [
              "Red",
              "Yellow",
              "Both varieties"
            ],
            "a": 0,
            "e": "'red tomatoes are ready for picking', loại vàng cần thêm một tuần → chỉ cà chua đỏ.",
            "script": [
              {
                "s": "f",
                "t": "The farm's red tomatoes are ready for picking, but the yellow variety needs another week.",
                "hl": 1
              }
            ]
          },
          {
            "q": "Which field was too acidic?",
            "o": [
              "The north field",
              "The lower field",
              "Both fields"
            ],
            "a": 0,
            "e": "'too much acidity in the north field', còn ruộng thấp 'close to neutral' → ruộng phía bắc.",
            "script": [
              {
                "s": "m",
                "t": "Our soil test showed too much acidity in the north field, while the lower field was close to neutral.",
                "hl": 1
              }
            ]
          },
          {
            "q": "What powers the pump at night?",
            "o": [
              "A battery",
              "A wind turbine",
              "The mains supply"
            ],
            "a": 0,
            "e": "Ban ngày dùng năng lượng mặt trời, 'switches to a battery after sunset' → ban đêm chạy bằng pin.",
            "script": [
              {
                "s": "f",
                "t": "The irrigation pump uses solar power during the day and switches to a battery after sunset.",
                "hl": 1
              }
            ]
          },
          {
            "q": "What happens at 11:30?",
            "o": [
              "A seed swap",
              "A cooking demonstration",
              "A farm tour"
            ],
            "a": 0,
            "e": "'a seed swap at 11:30', còn biểu diễn nấu ăn lúc 1 giờ → trao đổi hạt giống.",
            "script": [
              {
                "s": "m",
                "t": "The harvest festival will include a seed swap at 11:30, followed by a cooking demonstration at one.",
                "hl": 1
              }
            ]
          },
          {
            "q": "Why is the walk accessible?",
            "o": [
              "It follows a paved path",
              "It is very short",
              "A tractor carries visitors"
            ],
            "a": 0,
            "e": "'because the route follows a paved path' → lối đi được lát phẳng.",
            "script": [
              {
                "s": "f",
                "t": "The orchard walk is suitable for visitors with limited mobility because the route follows a paved path.",
                "hl": 1
              }
            ]
          },
          {
            "q": "Why were the beans planted near the corn?",
            "o": [
              "The corn provides support",
              "The crops need less sunlight",
              "The soil is drier there"
            ],
            "a": 0,
            "e": "'the climbing stems can use the taller plants for support' → cây ngô làm giá đỡ cho đậu leo.",
            "script": [
              {
                "s": "m",
                "t": "We planted beans beside the corn because the climbing stems can use the taller plants for support.",
                "hl": 1
              }
            ]
          },
          {
            "q": "How much is the larger jar?",
            "o": [
              "6 pounds",
              "8 pounds",
              "10 pounds"
            ],
            "a": 2,
            "e": "Hũ 250 gram giá 6 bảng, 'larger 500-gram jars for 10 pounds' → hũ lớn 10 bảng.",
            "script": [
              {
                "s": "f",
                "t": "The farmer sells honey in 250-gram jars for 6 pounds and larger 500-gram jars for 10 pounds.",
                "hl": 1
              }
            ]
          },
          {
            "q": "What caused the smaller crop?",
            "o": [
              "A late frost",
              "A dry autumn",
              "An insect survey"
            ],
            "a": 0,
            "e": "'A late frost damaged the peach blossoms' → sương giá muộn làm vụ mùa nhỏ hơn.",
            "script": [
              {
                "s": "m",
                "t": "A late frost damaged the peach blossoms, so the orchard expects a smaller crop this summer.",
                "hl": 1
              }
            ]
          },
          {
            "q": "What will participants do first?",
            "o": [
              "Sort garden waste",
              "Build the box",
              "Turn finished compost"
            ],
            "a": 0,
            "e": "'starts with sorting garden waste'; làm thùng ủ phân sau bài nói ngắn → phân loại rác vườn trước.",
            "script": [
              {
                "s": "f",
                "t": "The compost workshop starts with sorting garden waste; the group will build a compost box after the short talk.",
                "hl": 1
              }
            ]
          },
          {
            "q": "When should herbs be harvested?",
            "o": [
              "In the morning",
              "At midday",
              "After sunset"
            ],
            "a": 0,
            "e": "'harvesting herbs in the morning, before the sun has dried their leaves' → buổi sáng.",
            "script": [
              {
                "s": "m",
                "t": "The field guide recommends harvesting herbs in the morning, before the sun has dried their leaves.",
                "hl": 1
              }
            ]
          },
          {
            "q": "Which products can go into reusable containers?",
            "o": [
              "Flour and oats",
              "Milk and cheese",
              "All products"
            ],
            "a": 0,
            "e": "'reusable containers for flour and oats, but not for dairy products' → chỉ bột mì và yến mạch.",
            "script": [
              {
                "s": "f",
                "t": "The farm shop accepts reusable containers for flour and oats, but not for dairy products.",
                "hl": 1
              }
            ]
          }
        ]
      },
      {
        "type": "speakers",
        "title": "Part 2 · Câu 14",
        "instr": "Bốn người nói về cách người làm vườn thích nghi với điều kiện thay đổi. Chọn câu mô tả đúng nhất mỗi người. Có 2 lựa chọn thừa.",
        "topic": "How gardeners adapt to changing conditions",
        "options": [
          "Chooses crops suited to local weather",
          "Grows vegetables to sell at a local market",
          "Uses water carefully",
          "Shares seeds and practical knowledge",
          "Moved the garden to a sunnier spot",
          "Protects plants without chemical sprays"
        ],
        "speakers": [
          {
            "a": 0,
            "e": "Người A: trồng giống 'can cope with short summers', hạt từ vùng phía bắc nên 'a better fit here' → chọn cây hợp thời tiết địa phương.",
            "script": [
              {
                "s": "m",
                "who": "A",
                "t": "I grow varieties that can cope with short summers. The seed packets come from growers in northern regions, so the plants are a better fit here."
              }
            ]
          },
          {
            "a": 3,
            "e": "Người B: 'exchange seeds every spring' và 'share the notes with new gardeners' → chia sẻ hạt giống và kinh nghiệm.",
            "script": [
              {
                "s": "f",
                "who": "B",
                "t": "My neighbours and I exchange seeds every spring. We write down which ones did well and share the notes with new gardeners."
              }
            ]
          },
          {
            "a": 2,
            "e": "Người C: hứng nước mưa, tưới sáng sớm để 'less water evaporates' → dùng nước tiết kiệm.",
            "script": [
              {
                "s": "m",
                "who": "C",
                "t": "I collect rain from the shed roof and water the beds early in the morning. The soil stays damp longer, and less water evaporates."
              }
            ]
          },
          {
            "a": 5,
            "e": "Người D: phủ lưới, nuôi bọ rùa, đuổi sâu bọ 'without spraying' → bảo vệ cây không dùng thuốc phun.",
            "script": [
              {
                "s": "f",
                "who": "D",
                "t": "I cover young vegetables with fine mesh and encourage ladybirds to stay in the garden. That keeps many pests away without spraying."
              }
            ]
          }
        ]
      },
      {
        "type": "conv",
        "title": "Part 3 · Câu 15",
        "instr": "Nghe hai người thảo luận về việc trang trại có nên trồng nhiều loại cây. Ai bày tỏ ý kiến sau: người đàn ông (Man), người phụ nữ (Woman) hay cả hai (Both)?",
        "topic": "Should farms grow more than one crop?",
        "script": [
          {
            "s": "f",
            "t": "Growing several crops can protect a farm if one harvest fails, and it supports a wider range of insects."
          },
          {
            "s": "m",
            "t": "It can also make work more complicated. Specialised equipment and buyers may be organised around one crop."
          },
          {
            "s": "f",
            "t": "Cooperatives could share equipment and help smaller farms find markets."
          },
          {
            "s": "m",
            "t": "That might work, but farmers need reliable advice before changing what they plant."
          },
          {
            "s": "f",
            "t": "Agricultural colleges could run local trials and publish the results."
          },
          {
            "s": "m",
            "t": "Yes, practical evidence would make the change less risky."
          }
        ],
        "statements": [
          {
            "q": "A mix of crops can reduce the risk of one failed harvest.",
            "a": "Woman",
            "e": "Người phụ nữ: 'Growing several crops can protect a farm if one harvest fails'; người đàn ông chỉ nêu mặt khó khăn."
          },
          {
            "q": "Specialised equipment can make diversification difficult.",
            "a": "Man",
            "e": "Người đàn ông: 'It can also make work more complicated. Specialised equipment and buyers may be organised around one crop'."
          },
          {
            "q": "Shared resources may help smaller farms.",
            "a": "Woman",
            "e": "Người phụ nữ: 'Cooperatives could share equipment and help smaller farms'; người đàn ông còn dè dặt: 'That might work, but...'."
          },
          {
            "q": "Local trials could give farmers useful evidence.",
            "a": "Both",
            "e": "Người phụ nữ đề xuất 'run local trials and publish the results'; người đàn ông đồng ý: 'Yes, practical evidence would make the change less risky'."
          }
        ]
      },
      {
        "type": "mono",
        "title": "Part 4 · Câu 16–17",
        "instr": "Nghe bài nói và trả lời 2 câu hỏi cho mỗi bài.",
        "talks": [
          {
            "topic": "Saving seeds for the next season",
            "script": [
              {
                "s": "f",
                "t": "A seed-saving group in the hill district collects seeds from plants that grow well in local conditions."
              },
              {
                "s": "f",
                "t": "Members leave a few healthy plants unpicked, then dry and label the seeds after harvest."
              },
              {
                "s": "f",
                "t": "They avoid saving seeds from some hybrid varieties because the next generation may not keep the same characteristics."
              },
              {
                "s": "f",
                "t": "Each packet includes the plant name, collection year, and notes about soil and rainfall."
              },
              {
                "s": "f",
                "t": "The group shares seeds at a winter meeting and keeps a small reserve in case a growing season is unusually poor."
              }
            ],
            "questions": [
              {
                "q": "Why does the group avoid saving some hybrid seeds?",
                "o": [
                  "The next generation may vary",
                  "The seeds cannot be dried",
                  "The plants grow only indoors"
                ],
                "a": 0,
                "e": "'the next generation may not keep the same characteristics' → thế hệ sau có thể khác cây mẹ."
              },
              {
                "q": "What information is written on each packet?",
                "o": [
                  "Plant name, year, and growing notes",
                  "The price and shop address",
                  "The member's home location"
                ],
                "a": 0,
                "e": "'the plant name, collection year, and notes about soil and rainfall' → tên cây, năm thu và ghi chú trồng trọt."
              }
            ]
          },
          {
            "topic": "Farming with less water",
            "script": [
              {
                "s": "m",
                "t": "A dry summer does not always mean that a farm must stop growing vegetables."
              },
              {
                "s": "m",
                "t": "One approach is to cover bare soil with organic mulch, which slows evaporation and reduces weeds."
              },
              {
                "s": "m",
                "t": "Drip lines can deliver water close to plant roots, although they need regular checks for blockages."
              },
              {
                "s": "m",
                "t": "Farmers can also choose planting dates that avoid the hottest period."
              },
              {
                "s": "m",
                "t": "These methods require planning and may involve an initial cost, but they can reduce water use over time."
              },
              {
                "s": "m",
                "t": "The speaker says no single technique works everywhere; local soil and climate matter."
              }
            ],
            "questions": [
              {
                "q": "What does organic mulch help reduce?",
                "o": [
                  "Evaporation and weeds",
                  "Soil nutrients",
                  "The number of roots"
                ],
                "a": 0,
                "e": "'organic mulch, which slows evaporation and reduces weeds' → giảm bốc hơi nước và cỏ dại."
              },
              {
                "q": "What does the speaker say about water-saving methods?",
                "o": [
                  "They should fit local conditions",
                  "One method works everywhere",
                  "They require no planning"
                ],
                "a": 0,
                "e": "'no single technique works everywhere; local soil and climate matter' → phải phù hợp điều kiện địa phương."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "l22",
    "title": "Đề 19 — Astronomy and night skies",
    "parts": [
      {
        "type": "mcq",
        "title": "Part 1 · Câu 1–13",
        "instr": "Nghe đoạn ngắn và chọn đáp án đúng. Mỗi đoạn nghe tối đa 2 lần.",
        "items": [
          {
            "q": "When does the show begin?",
            "o": [
              "7:00",
              "7:20",
              "7:40"
            ],
            "a": 1,
            "e": "'The planetarium show begins at 7:20' → 7 giờ 20.",
            "script": [
              {
                "s": "f",
                "t": "The planetarium show begins at 7:20.",
                "hl": 1
              },
              {
                "s": "f",
                "t": "Please collect your seat card from the desk beside the north entrance."
              }
            ]
          },
          {
            "q": "Which planet did the group observe?",
            "o": [
              "Mars",
              "Jupiter",
              "Venus"
            ],
            "a": 1,
            "e": "Mây che mặt trăng nên 'our group observed Jupiter through the telescope instead' → sao Mộc.",
            "script": [
              {
                "s": "m",
                "t": "Clouds covered the moon, so our group observed Jupiter through the telescope instead.",
                "hl": 1
              }
            ]
          },
          {
            "q": "How often does the club meet?",
            "o": [
              "Every Thursday",
              "Every second Thursday",
              "Once a month"
            ],
            "a": 1,
            "e": "'meets every second Thursday' → hai tuần một lần vào thứ Năm.",
            "script": [
              {
                "s": "f",
                "t": "The astronomy club meets every second Thursday, and its next meeting is on the 16th.",
                "hl": 1
              }
            ]
          },
          {
            "q": "What did the speaker use?",
            "o": [
              "A small camera stand",
              "A telescope",
              "A borrowed tripod"
            ],
            "a": 0,
            "e": "Chân máy quá nặng 'so I used a small camera stand' → dùng giá đỡ máy ảnh nhỏ.",
            "script": [
              {
                "s": "m",
                "t": "I wanted to photograph the meteor shower, but my tripod was too heavy, so I used a small camera stand.",
                "hl": 1
              }
            ]
          },
          {
            "q": "What condition must be met before the roof opens?",
            "o": [
              "The wind must stay low",
              "The sky must be warm",
              "The moon must be full"
            ],
            "a": 0,
            "e": "Mái mở lúc 9 giờ 'if the wind stays below twenty kilometres per hour' → gió phải yếu.",
            "script": [
              {
                "s": "f",
                "t": "The observatory roof will open at nine if the wind stays below twenty kilometres per hour.",
                "hl": 1
              }
            ]
          },
          {
            "q": "What did the guide explain after Saturn?",
            "o": [
              "How to find the North Star",
              "How to use a compass",
              "Where Mars rises"
            ],
            "a": 0,
            "e": "Chỉ vành đai sao Thổ trước, 'then showed us how to find the North Star' → cách tìm sao Bắc Cực.",
            "script": [
              {
                "s": "m",
                "t": "Our guide pointed out Saturn's rings first, then showed us how to find the North Star.",
                "hl": 1
              }
            ]
          },
          {
            "q": "How much does the printed star map cost?",
            "o": [
              "Free",
              "Five pounds",
              "Ten pounds"
            ],
            "a": 1,
            "e": "'The star map costs five pounds at the entrance'; miễn phí chỉ là bản tải về cho trẻ em → bản in 5 bảng.",
            "script": [
              {
                "s": "f",
                "t": "The star map costs five pounds at the entrance, but children can download the same chart for free.",
                "hl": 1
              }
            ]
          },
          {
            "q": "Which telescope can adult visitors use?",
            "o": [
              "The one in Room 2",
              "The terrace telescope",
              "Neither telescope"
            ],
            "a": 1,
            "e": "Kính ở phòng 2 dành cho đoàn học sinh, 'adult visitors should use the instrument on the terrace' → kính ngoài sân thượng.",
            "script": [
              {
                "s": "m",
                "t": "The telescope in Room 2 is reserved for school groups, so adult visitors should use the instrument on the terrace.",
                "hl": 1
              }
            ]
          },
          {
            "q": "Where will the lecture take place?",
            "o": [
              "In the heated dome",
              "In the garden",
              "At the main gate"
            ],
            "a": 0,
            "e": "Trời lạnh đột ngột nên 'the event moved into the heated dome' → trong mái vòm có sưởi.",
            "script": [
              {
                "s": "f",
                "t": "We planned an outdoor lecture, but the temperature dropped sharply, so the event moved into the heated dome.",
                "hl": 1
              }
            ]
          },
          {
            "q": "What can visitors buy after 10 p.m.?",
            "o": [
              "Hot chocolate",
              "Bottled water",
              "Coffee"
            ],
            "a": 1,
            "e": "Sô-cô-la nóng bán đến 10 giờ tối; 'after that, only bottled water is available' → chỉ còn nước đóng chai.",
            "script": [
              {
                "s": "m",
                "t": "The observatory café serves hot chocolate until 10 p.m.; after that, only bottled water is available.",
                "hl": 1
              }
            ]
          },
          {
            "q": "Who gave the speaker the first telescope?",
            "o": [
              "A teacher",
              "An aunt",
              "A friend"
            ],
            "a": 1,
            "e": "'My first telescope was a gift from my aunt' → người cô/dì tặng.",
            "script": [
              {
                "s": "f",
                "t": "My first telescope was a gift from my aunt when I turned twelve; I still use it to view the moon.",
                "hl": 1
              }
            ]
          },
          {
            "q": "Which course still has places?",
            "o": [
              "Astrophotography",
              "Constellation identification",
              "Telescope repair"
            ],
            "a": 1,
            "e": "Lớp chụp ảnh đã đầy, 'places left on the beginner course about identifying constellations' → lớp nhận biết chòm sao.",
            "script": [
              {
                "s": "m",
                "t": "The photography workshop is full, but there are places left on the beginner course about identifying constellations.",
                "hl": 1
              }
            ]
          },
          {
            "q": "When does the last shuttle leave?",
            "o": [
              "10:45",
              "11:00",
              "11:15"
            ],
            "a": 2,
            "e": "'The last shuttle to town leaves at 11:15'; 11:00 là giờ đài quan sát đóng cửa.",
            "script": [
              {
                "s": "f",
                "t": "The last shuttle to town leaves at 11:15, fifteen minutes after the observatory closes.",
                "hl": 1
              }
            ]
          }
        ]
      },
      {
        "type": "speakers",
        "title": "Part 2 · Câu 14",
        "instr": "Bốn người nói về cách họ tận hưởng thú vui thiên văn. Chọn câu mô tả đúng nhất mỗi người. Có 2 lựa chọn thừa.",
        "topic": "How people enjoy astronomy",
        "options": [
          "Uses sky watching to relax",
          "Likes recording observations systematically",
          "Wants to buy a more powerful telescope",
          "Shares astronomy with children",
          "Takes photographs of the night sky",
          "Enjoys learning the history of space science"
        ],
        "speakers": [
          {
            "a": 1,
            "e": "Người A: 'I keep a notebook with the date, the weather, and what I can see' rồi so sánh qua các tháng → ghi chép quan sát có hệ thống.",
            "script": [
              {
                "s": "f",
                "who": "A",
                "t": "I keep a notebook with the date, the weather, and what I can see. After a few months, I can compare how the sky changes. I also note the sunset time because the best viewing window changes through the year."
              }
            ]
          },
          {
            "a": 3,
            "e": "Người B: 'I take my daughter to the roof on clear evenings', cùng con tìm sao và kể chuyện → chia sẻ thiên văn với trẻ em.",
            "script": [
              {
                "s": "m",
                "who": "B",
                "t": "I take my daughter to the roof on clear evenings. We use a simple star app and make up stories about the shapes we find. We take turns choosing an object to find, and she draws it afterwards."
              }
            ]
          },
          {
            "a": 5,
            "e": "Người C: 'I read about early astronomers and the tools they built' → thích tìm hiểu lịch sử khoa học vũ trụ.",
            "script": [
              {
                "s": "m",
                "who": "C",
                "t": "I read about early astronomers and the tools they built. It is fascinating how much they worked out without modern equipment. I recently read about early observatories and the tools their local craftspeople built."
              }
            ]
          },
          {
            "a": 0,
            "e": "Người D: ngắm trăng mọc 'helps me slow down after work' → ngắm trời để thư giãn.",
            "script": [
              {
                "s": "f",
                "who": "D",
                "t": "I do not know many star names, but sitting outside and watching the moon rise helps me slow down after work. I leave my phone away and listen to the night sounds for a while."
              }
            ]
          }
        ]
      },
      {
        "type": "conv",
        "title": "Part 3 · Câu 15",
        "instr": "Nghe hai người thảo luận về việc thành phố có nên tắt bớt đèn vào ban đêm. Ai bày tỏ ý kiến sau: người đàn ông (Man), người phụ nữ (Woman) hay cả hai (Both)?",
        "topic": "Should cities turn off some lights at night?",
        "script": [
          {
            "s": "f",
            "t": "Bright signs and office lights make it difficult to see stars, and they waste electricity when buildings are empty."
          },
          {
            "s": "m",
            "t": "I agree about empty offices, but darker streets may make people feel unsafe."
          },
          {
            "s": "f",
            "t": "Lights could be dimmed rather than switched off, especially near crossings."
          },
          {
            "s": "m",
            "t": "That seems sensible. The city should test it in one district and ask residents and businesses for feedback."
          },
          {
            "s": "f",
            "t": "It should also protect parks, where darkness helps nocturnal animals."
          },
          {
            "s": "m",
            "t": "Yes, the trial needs to measure energy use and public safety, not just visibility of stars. The trial should last across seasons, since traffic and daylight change. Residents can report dark spots as well as places that feel safer with less glare."
          }
        ],
        "statements": [
          {
            "q": "Empty buildings should not keep all their lights on.",
            "a": "Both",
            "e": "Người phụ nữ: đèn 'waste electricity when buildings are empty'; người đàn ông: 'I agree about empty offices'."
          },
          {
            "q": "Street lighting may affect people's sense of safety.",
            "a": "Man",
            "e": "Người đàn ông: 'darker streets may make people feel unsafe'."
          },
          {
            "q": "A dimming trial should gather local feedback.",
            "a": "Man",
            "e": "Người đàn ông: 'test it in one district and ask residents and businesses for feedback'."
          },
          {
            "q": "Dark areas can benefit nocturnal wildlife.",
            "a": "Woman",
            "e": "Chỉ người phụ nữ nêu ý này: 'protect parks, where darkness helps nocturnal animals'. Câu 'Yes, the trial needs to measure…' của người đàn ông nói về việc đo năng lượng và an toàn, không nhắc tới động vật."
          }
        ]
      },
      {
        "type": "mono",
        "title": "Part 4 · Câu 16–17",
        "instr": "Nghe bài nói và trả lời 2 câu hỏi cho mỗi bài.",
        "talks": [
          {
            "topic": "A small observatory in the desert",
            "script": [
              {
                "s": "m",
                "t": "The Red Mesa observatory was built far from towns because artificial light can hide faint objects in the sky."
              },
              {
                "s": "m",
                "t": "Its team studies variable stars, whose brightness changes over time."
              },
              {
                "s": "m",
                "t": "Volunteers take images on clear nights and upload them for astronomers to compare."
              },
              {
                "s": "m",
                "t": "The observatory has recently installed a wider internet connection, allowing images to be checked the next morning instead of waiting for a monthly visit."
              },
              {
                "s": "m",
                "t": "The site still limits visitor numbers because vehicles can disturb the quiet conditions."
              },
              {
                "s": "m",
                "t": "The project director says the most useful contribution from visitors is careful, repeated observation rather than one dramatic photograph."
              },
              {
                "s": "m",
                "t": "Amateur astronomers nearby also submit observations."
              },
              {
                "s": "m",
                "t": "The team checks them against its own equipment before adding them to the dataset."
              }
            ],
            "questions": [
              {
                "q": "Why was the observatory built far from towns?",
                "o": [
                  "To avoid artificial light",
                  "To be closer to a university",
                  "To protect its internet connection"
                ],
                "a": 0,
                "e": "'because artificial light can hide faint objects in the sky' → tránh ánh sáng nhân tạo."
              },
              {
                "q": "What has the new internet connection improved?",
                "o": [
                  "Images can be checked sooner",
                  "More visitors can stay overnight",
                  "The telescope needs less power"
                ],
                "a": 0,
                "e": "'allowing images to be checked the next morning instead of waiting for a monthly visit' → ảnh được kiểm tra sớm hơn."
              }
            ]
          },
          {
            "topic": "Reading a lunar calendar",
            "script": [
              {
                "s": "f",
                "t": "A lunar calendar follows the phases of the moon rather than dividing every month in the same way as a solar calendar."
              },
              {
                "s": "f",
                "t": "Different communities have used lunar systems to plan festivals, fishing, and agricultural activities."
              },
              {
                "s": "f",
                "t": "Today, many people encounter the moon through phone apps, but the underlying pattern is easy to observe without technology."
              },
              {
                "s": "f",
                "t": "A full cycle takes a little over twenty-nine days."
              },
              {
                "s": "f",
                "t": "The speaker suggests watching the moon at the same time each evening for a week; its changing position and shape become easier to notice."
              },
              {
                "s": "f",
                "t": "The calendar is not a weather forecast, but it can help people describe recurring patterns in the night sky."
              },
              {
                "s": "f",
                "t": "Lunar calendars differ between cultures, even when they follow the same cycle."
              },
              {
                "s": "f",
                "t": "Learning the pattern can connect scientific observation with local traditions."
              }
            ],
            "questions": [
              {
                "q": "How long is a full lunar cycle?",
                "o": [
                  "A little over twenty-nine days",
                  "Exactly thirty-one days",
                  "About two weeks"
                ],
                "a": 0,
                "e": "'A full cycle takes a little over twenty-nine days' → hơn 29 ngày một chút."
              },
              {
                "q": "What does the speaker recommend?",
                "o": [
                  "Observe the moon at the same time",
                  "Use the moon to predict rain",
                  "Watch only during a full moon"
                ],
                "a": 0,
                "e": "'watching the moon at the same time each evening for a week' → quan sát trăng vào cùng một giờ mỗi tối."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "l23",
    "title": "Đề 20 — Film making and production",
    "parts": [
      {
        "type": "mcq",
        "title": "Part 1 · Câu 1–13",
        "instr": "Nghe đoạn ngắn và chọn đáp án đúng. Mỗi đoạn nghe tối đa 2 lần.",
        "items": [
          {
            "q": "Where will the final scene be filmed?",
            "o": [
              "At the old station",
              "In the studio",
              "By the river"
            ],
            "a": 0,
            "e": "'film the final scene at the old station on Friday' → cảnh cuối quay ở nhà ga cũ.",
            "script": [
              {
                "s": "m",
                "t": "The crew will film the final scene at the old station on Friday, after the morning train has passed.",
                "hl": 1
              }
            ]
          },
          {
            "q": "What colour is the coat now?",
            "o": [
              "Black",
              "Green",
              "Grey"
            ],
            "a": 1,
            "e": "'changed the lead actor's coat from black to green' → áo khoác giờ màu xanh lá (xám là màu con phố).",
            "script": [
              {
                "s": "f",
                "t": "The director changed the lead actor's coat from black to green so it would stand out against the grey street.",
                "hl": 1
              }
            ]
          },
          {
            "q": "What is the team editing out?",
            "o": [
              "Wind",
              "Traffic noise",
              "Background music"
            ],
            "a": 1,
            "e": "'another hour to remove traffic noise' → đang loại bỏ tiếng xe cộ.",
            "script": [
              {
                "s": "m",
                "t": "The sound team needs another hour to remove traffic noise from the recording.",
                "hl": 1
              }
            ]
          },
          {
            "q": "How long is the film?",
            "o": [
              "15 minutes",
              "18 minutes",
              "25 minutes"
            ],
            "a": 1,
            "e": "'The short film runs for 18 minutes' → phim dài 18 phút.",
            "script": [
              {
                "s": "f",
                "t": "The short film runs for 18 minutes, including the opening titles and credits.",
                "hl": 1
              }
            ]
          },
          {
            "q": "Where will the speaker work?",
            "o": [
              "Camera team",
              "Costume department",
              "Ticket office"
            ],
            "a": 1,
            "e": "'the production offered me a job in the costume department' → được nhận vào bộ phận trang phục (không phải đội quay).",
            "script": [
              {
                "s": "f",
                "t": "I applied to work as a camera assistant, but the production offered me a job in the costume department.",
                "hl": 1
              }
            ]
          },
          {
            "q": "When will the kitchen scene be filmed?",
            "o": [
              "Before lunch",
              "After lunch",
              "Tomorrow"
            ],
            "a": 1,
            "e": "'the director will film it after lunch' → quay sau bữa trưa.",
            "script": [
              {
                "s": "m",
                "t": "The actors rehearsed the kitchen scene twice; the director will film it after lunch.",
                "hl": 1
              }
            ]
          },
          {
            "q": "What should visitors do before attending?",
            "o": [
              "Reserve a seat",
              "Pay at the door",
              "Bring a printed review"
            ],
            "a": 0,
            "e": "'visitors should reserve a seat online' → nên đặt chỗ trước (suất chiếu miễn phí).",
            "script": [
              {
                "s": "f",
                "t": "The film festival screening is free, but visitors should reserve a seat online because the room is small.",
                "hl": 1
              }
            ]
          },
          {
            "q": "What was missing?",
            "o": [
              "A light bulb",
              "A stand",
              "A camera lens"
            ],
            "a": 1,
            "e": "'one stand was missing from the delivery' → thiếu một chân đèn.",
            "script": [
              {
                "s": "m",
                "t": "The lighting equipment arrived in two cases, but one stand was missing from the delivery.",
                "hl": 1
              }
            ]
          },
          {
            "q": "Why was the hall selected?",
            "o": [
              "It has large windows and a wooden floor",
              "It is near the director's home",
              "It has a cinema screen"
            ],
            "a": 0,
            "e": "'it has large windows and a wooden floor' → chọn hội trường vì cửa sổ lớn và sàn gỗ.",
            "script": [
              {
                "s": "f",
                "t": "The location manager chose the school hall because it has large windows and a wooden floor.",
                "hl": 1
              }
            ]
          },
          {
            "q": "Which part stayed in the film?",
            "o": [
              "The chase",
              "The quiet ending",
              "The opening speech"
            ],
            "a": 1,
            "e": "'kept the quiet ending but removed the long chase' → giữ lại đoạn kết lặng, cắt cảnh rượt đuổi.",
            "script": [
              {
                "s": "m",
                "t": "The editor kept the quiet ending but removed the long chase because it slowed the story down.",
                "hl": 1
              }
            ]
          },
          {
            "q": "Why will the cast stay nearby?",
            "o": [
              "The production starts early",
              "The hotel is cheaper",
              "The cast has another event"
            ],
            "a": 0,
            "e": "'The production begins at 6 a.m. on Monday, so the cast will stay overnight' → vì bắt đầu quay sớm.",
            "script": [
              {
                "s": "f",
                "t": "The production begins at 6 a.m. on Monday, so the cast will stay overnight near the coastal location.",
                "hl": 1
              }
            ]
          },
          {
            "q": "What is the documentary mainly about?",
            "o": [
              "A baker's routine",
              "The town's history",
              "A cooking contest"
            ],
            "a": 0,
            "e": "'focuses on the baker's daily routine, rather than the history of the whole town' → tập trung vào thói quen hằng ngày của người thợ bánh.",
            "script": [
              {
                "s": "m",
                "t": "The documentary focuses on the baker's daily routine, rather than the history of the whole town.",
                "hl": 1
              }
            ]
          },
          {
            "q": "What type of film is the next project?",
            "o": [
              "A comedy",
              "A historical drama",
              "A documentary"
            ],
            "a": 0,
            "e": "'next project is a comedy' → dự án tiếp theo là phim hài (phim hiện tại mới là chính kịch lịch sử).",
            "script": [
              {
                "s": "f",
                "t": "The director's next project is a comedy, although the current film is a historical drama.",
                "hl": 1
              }
            ]
          }
        ]
      },
      {
        "type": "speakers",
        "title": "Part 2 · Câu 14",
        "instr": "Bốn người nói về các vai trò khác nhau trong làm phim. Chọn câu mô tả đúng nhất mỗi người. Có 2 lựa chọn thừa.",
        "topic": "Different roles in film making",
        "options": [
          "Enjoys shaping the visual look",
          "Keeps production schedules organised",
          "Creates believable sound",
          "Helps performers feel prepared",
          "Writes the story for the film",
          "Performs on screen as the lead actor"
        ],
        "speakers": [
          {
            "a": 0,
            "e": "Người A: làm việc với quay phim để chọn ống kính và ánh sáng, 'test the colours' → định hình diện mạo hình ảnh.",
            "script": [
              {
                "s": "f",
                "who": "A",
                "t": "I work with the cinematographer to choose lenses and lighting."
              },
              {
                "s": "f",
                "who": "A",
                "t": "We test the colours before filming so the scenes feel consistent."
              },
              {
                "s": "f",
                "who": "A",
                "t": "We check a shot on a monitor before moving on, because a small lighting change can alter the mood."
              }
            ]
          },
          {
            "a": 1,
            "e": "Người B: 'track locations, meal breaks, and call times' và xác nhận lịch với các bộ phận → giữ lịch sản xuất ngăn nắp.",
            "script": [
              {
                "s": "m",
                "who": "B",
                "t": "My job is to track locations, meal breaks, and call times."
              },
              {
                "s": "m",
                "who": "B",
                "t": "If the schedule changes, everyone needs the new information quickly."
              },
              {
                "s": "m",
                "who": "B",
                "t": "I confirm each call sheet with every department so nobody waits unnecessarily on set."
              }
            ]
          },
          {
            "a": 2,
            "e": "Người C: thu 'footsteps and doors closing' làm cảnh phim chân thực → tạo âm thanh đáng tin.",
            "script": [
              {
                "s": "f",
                "who": "C",
                "t": "I collect small sounds such as footsteps and doors closing."
              },
              {
                "s": "f",
                "who": "C",
                "t": "They make a scene feel real even when the audience does not notice them."
              },
              {
                "s": "f",
                "who": "C",
                "t": "We record several versions of a sound and label them for the editor."
              }
            ]
          },
          {
            "a": 3,
            "e": "Người D: 'I help actors practise lines' và thích thấy họ tự tin → giúp diễn viên chuẩn bị tốt.",
            "script": [
              {
                "s": "m",
                "who": "D",
                "t": "I help actors practise lines and understand what is happening before a scene."
              },
              {
                "s": "m",
                "who": "D",
                "t": "I enjoy seeing someone become confident in a role."
              },
              {
                "s": "m",
                "who": "D",
                "t": "I ask performers what helps them prepare; some want repeated rehearsal and others prefer quiet."
              }
            ]
          }
        ]
      },
      {
        "type": "conv",
        "title": "Part 3 · Câu 15",
        "instr": "Nghe hai người thảo luận về việc phim có nên chiếu rạp trước khi lên nền tảng trực tuyến. Ai bày tỏ ý kiến sau: người đàn ông (Man), người phụ nữ (Woman) hay cả hai (Both)?",
        "topic": "Should films be released in cinemas before streaming?",
        "script": [
          {
            "s": "m",
            "t": "A cinema release gives a film a shared event and supports local theatres."
          },
          {
            "s": "f",
            "t": "But streaming can reach people who live far from a cinema or cannot afford a ticket."
          },
          {
            "s": "m",
            "t": "A short exclusive window could help both."
          },
          {
            "s": "f",
            "t": "Maybe, although smaller films should not have to wait months to reach viewers."
          },
          {
            "s": "m",
            "t": "The release plan could depend on the film's budget and audience."
          },
          {
            "s": "f",
            "t": "I would also like filmmakers to explain where a film can be watched, since people often find the information confusing."
          },
          {
            "s": "m",
            "t": "Clear dates would help everyone plan. Theatres and streaming platforms could publish one clear release schedule. Viewers could then choose a format that suits them without searching several sites."
          }
        ],
        "statements": [
          {
            "q": "A cinema showing can support local theatres.",
            "a": "Man",
            "e": "Người đàn ông: 'supports local theatres'; người phụ nữ phản biện bằng lợi ích của streaming."
          },
          {
            "q": "Streaming may improve access for some viewers.",
            "a": "Woman",
            "e": "Người phụ nữ: 'streaming can reach people who live far from a cinema or cannot afford a ticket'; người đàn ông chỉ đề xuất cửa sổ độc quyền ngắn."
          },
          {
            "q": "Release timing could vary by film.",
            "a": "Man",
            "e": "Người đàn ông: 'The release plan could depend on the film's budget and audience'; người phụ nữ chỉ nói phim nhỏ không nên chờ nhiều tháng."
          },
          {
            "q": "Viewers need clearer release information.",
            "a": "Both",
            "e": "Người phụ nữ: 'people often find the information confusing'; người đàn ông: 'Clear dates would help everyone plan'."
          }
        ]
      },
      {
        "type": "mono",
        "title": "Part 4 · Câu 16–17",
        "instr": "Nghe bài nói và trả lời 2 câu hỏi cho mỗi bài.",
        "talks": [
          {
            "topic": "Recording a documentary interview",
            "script": [
              {
                "s": "f",
                "t": "For a documentary about night-shift workers, the crew first planned to film in a busy factory."
              },
              {
                "s": "f",
                "t": "Several employees felt uncomfortable being recorded while operating machinery, so the team changed its approach."
              },
              {
                "s": "f",
                "t": "They interviewed workers in a quiet break room and filmed the factory floor later, without close-ups of individuals."
              },
              {
                "s": "f",
                "t": "This gave the workers more control and made the sound clearer."
              },
              {
                "s": "f",
                "t": "The director says that trust matters as much as technical quality: people should understand how footage will be used before they agree to appear."
              },
              {
                "s": "f",
                "t": "The film will include a short explanation of the production process at the end."
              },
              {
                "s": "f",
                "t": "Workers reviewed their interviews before the final cut."
              },
              {
                "s": "f",
                "t": "A few asked for technical details to be removed, and the editor made the changes."
              }
            ],
            "questions": [
              {
                "q": "Why did the crew change its interview location?",
                "o": [
                  "Workers felt uncomfortable on the factory floor",
                  "The factory closed early",
                  "The cameras could not fit through the door"
                ],
                "a": 0,
                "e": "'Several employees felt uncomfortable being recorded while operating machinery' → nhân viên không thoải mái khi bị quay ở xưởng nên đổi sang phòng nghỉ."
              },
              {
                "q": "What does the director say people should know?",
                "o": [
                  "How their footage will be used",
                  "Who will edit the soundtrack",
                  "When the film will win an award"
                ],
                "a": 0,
                "e": "'people should understand how footage will be used before they agree to appear' → cần hiểu cảnh quay sẽ được dùng thế nào."
              }
            ]
          },
          {
            "topic": "Film restoration",
            "script": [
              {
                "s": "m",
                "t": "Older films can deteriorate as the original material becomes scratched or faded."
              },
              {
                "s": "m",
                "t": "Restoration specialists scan each frame and compare it with other copies, such as international releases or archive prints."
              },
              {
                "s": "m",
                "t": "They repair visible damage carefully, but they try not to make the image look unnaturally sharp."
              },
              {
                "s": "m",
                "t": "Sound is also cleaned, although removing every background noise can erase part of the original atmosphere."
              },
              {
                "s": "m",
                "t": "The work can take months for a single film."
              },
              {
                "s": "m",
                "t": "A restored version is not a new edit; its purpose is to make the existing work easier to see and hear while preserving the choices made by its creators."
              },
              {
                "s": "m",
                "t": "Archives keep different releases because distributors sometimes shortened films for particular markets."
              },
              {
                "s": "m",
                "t": "Restorers document each repair so future researchers can tell what is original."
              }
            ],
            "questions": [
              {
                "q": "What sources may specialists compare?",
                "o": [
                  "Other copies of the film",
                  "Modern audience reviews",
                  "The director's later films"
                ],
                "a": 0,
                "e": "'compare it with other copies, such as international releases or archive prints' → so sánh với các bản sao khác của phim."
              },
              {
                "q": "Why do restorers avoid removing every background sound?",
                "o": [
                  "It could change the original atmosphere",
                  "It makes the film too long",
                  "The sound is always music"
                ],
                "a": 0,
                "e": "'removing every background noise can erase part of the original atmosphere' → có thể xóa mất không khí gốc của phim."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "l24",
    "title": "Đề 21 — Libraries and access to knowledge",
    "parts": [
      {
        "type": "mcq",
        "title": "Part 1 · Câu 1–13",
        "instr": "Nghe đoạn ngắn và chọn đáp án đúng. Mỗi đoạn nghe tối đa 2 lần.",
        "items": [
          {
            "q": "When does the repair desk close?",
            "o": [
              "4:00",
              "4:30",
              "5:30"
            ],
            "a": 1,
            "e": "'The library's repair desk is open until 4:30 today' → bàn sửa chữa mở đến 4:30.",
            "script": [
              {
                "s": "f",
                "t": "The library's repair desk is open until 4:30 today.",
                "hl": 1
              },
              {
                "s": "f",
                "t": "Book returns can still be left in the outside box."
              }
            ]
          },
          {
            "q": "Where can reference books be used?",
            "o": [
              "At home",
              "Inside the library",
              "On the bus"
            ],
            "a": 1,
            "e": "'reference books can only be used inside the building' → chỉ dùng trong thư viện.",
            "script": [
              {
                "s": "m",
                "t": "I borrowed a travel guide for three weeks, but reference books can only be used inside the building.",
                "hl": 1
              }
            ]
          },
          {
            "q": "Where is the reading group?",
            "o": [
              "The garden room",
              "The main hall",
              "The computer lab"
            ],
            "a": 0,
            "e": "'meets in the garden room because the main hall is hosting an exhibition' → phòng garden room; main hall đang có triển lãm.",
            "script": [
              {
                "s": "f",
                "t": "The children's reading group meets in the garden room because the main hall is hosting an exhibition.",
                "hl": 1
              }
            ]
          },
          {
            "q": "Which book did Mina keep?",
            "o": [
              "The history book",
              "The dictionary",
              "Both books"
            ],
            "a": 1,
            "e": "'returned the history book but kept the language dictionary' → Mina giữ lại cuốn từ điển.",
            "script": [
              {
                "s": "m",
                "t": "Mina returned the history book but kept the language dictionary for another week.",
                "hl": 1
              }
            ]
          },
          {
            "q": "What is the library adding?",
            "o": [
              "Quiet study rooms",
              "Computer desks",
              "A cafe"
            ],
            "a": 0,
            "e": "'adding two quiet study rooms, not more computer desks' → thêm phòng học yên tĩnh, không phải bàn máy tính.",
            "script": [
              {
                "s": "f",
                "t": "The library is adding two quiet study rooms, not more computer desks, after students requested a calmer space.",
                "hl": 1
              }
            ]
          },
          {
            "q": "How much is one colour page?",
            "o": [
              "8 pence",
              "20 pence",
              "25 pence"
            ],
            "a": 2,
            "e": "'8 pence per black-and-white page and 25 pence for colour' → trang màu 25 pence; 8 pence là trang đen trắng.",
            "script": [
              {
                "s": "m",
                "t": "The printer charges 8 pence per black-and-white page and 25 pence for colour.",
                "hl": 1
              }
            ]
          },
          {
            "q": "What will the club read this month?",
            "o": [
              "A biography",
              "Short stories",
              "A travel guide"
            ],
            "a": 1,
            "e": "'will read short stories this month; next month's selection is a biography' → tháng này đọc truyện ngắn, tiểu sử là tháng sau.",
            "script": [
              {
                "s": "f",
                "t": "The new book club will read short stories this month; next month's selection is a biography.",
                "hl": 1
              }
            ]
          },
          {
            "q": "Where was the atlas found?",
            "o": [
              "Under a chair",
              "At the front desk",
              "In the return box"
            ],
            "a": 0,
            "e": "'found the missing atlas under a chair' → dưới một chiếc ghế.",
            "script": [
              {
                "s": "m",
                "t": "The librarian found the missing atlas under a chair near the world history shelves.",
                "hl": 1
              }
            ]
          },
          {
            "q": "What is needed to download full articles?",
            "o": [
              "A library card",
              "A monthly fee",
              "A staff password"
            ],
            "a": 0,
            "e": "'free to use, but you need a library card to download full articles' → cần thẻ thư viện; kho lưu trữ miễn phí.",
            "script": [
              {
                "s": "f",
                "t": "The digital archive is free to use, but you need a library card to download full articles.",
                "hl": 1
              }
            ]
          },
          {
            "q": "When can the group enter?",
            "o": [
              "9:30",
              "9:45",
              "10:15"
            ],
            "a": 1,
            "e": "'the group can enter the room from 9:45 to set up' → vào phòng từ 9:45; buổi học bắt đầu lúc 10.",
            "script": [
              {
                "s": "m",
                "t": "Our study session starts at 10, but the group can enter the room from 9:45 to set up.",
                "hl": 1
              }
            ]
          },
          {
            "q": "What will go to the art class?",
            "o": [
              "Old magazines",
              "Textbooks",
              "Newspapers"
            ],
            "a": 0,
            "e": "'donate old magazines to the art class, while outdated textbooks will be recycled' → tạp chí cũ tặng lớp vẽ; sách giáo khoa đem tái chế.",
            "script": [
              {
                "s": "f",
                "t": "The library will donate old magazines to the art class, while outdated textbooks will be recycled.",
                "hl": 1
              }
            ]
          },
          {
            "q": "Who benefits from the reading session?",
            "o": [
              "Visitors with limited vision",
              "New library staff",
              "School teachers"
            ],
            "a": 0,
            "e": "'for visitors who have difficulty seeing small print' → người đọc khó nhìn chữ nhỏ (thị lực kém).",
            "script": [
              {
                "s": "m",
                "t": "A volunteer reads newspapers aloud every Friday for visitors who have difficulty seeing small print.",
                "hl": 1
              }
            ]
          },
          {
            "q": "When does the history exhibition close?",
            "o": [
              "The 20th",
              "The 27th",
              "The 3rd"
            ],
            "a": 1,
            "e": "'The local history exhibition closes on the 27th' → ngày 27; triển lãm ảnh đóng muộn hơn một tuần.",
            "script": [
              {
                "s": "f",
                "t": "The local history exhibition closes on the 27th, one week earlier than the photography display.",
                "hl": 1
              }
            ]
          }
        ]
      },
      {
        "type": "speakers",
        "title": "Part 2 · Câu 14",
        "instr": "Bốn người nói về điều họ quý ở thư viện. Chọn câu mô tả đúng nhất mỗi người. Có 2 lựa chọn thừa.",
        "topic": "What people value about libraries",
        "options": [
          "Finds a welcoming place to work",
          "Uses specialist materials for research",
          "Enjoys exchanging book recommendations",
          "Values help with digital services",
          "Attends talks by visiting authors",
          "Brings children to story sessions"
        ],
        "speakers": [
          {
            "a": 0,
            "e": "Người A: 'I use a desk at the library after work... the staff never rush me' → nơi làm việc yên tĩnh, thân thiện.",
            "script": [
              {
                "s": "f",
                "who": "A",
                "t": "I have a small flat, so I use a desk at the library after work."
              },
              {
                "s": "f",
                "who": "A",
                "t": "It is quiet, and I can focus better than at home."
              },
              {
                "s": "f",
                "who": "A",
                "t": "I can leave books open on the library table while I work, and the staff never rush me."
              }
            ]
          },
          {
            "a": 1,
            "e": "Người B: 'old maps and local newspapers that I cannot find online... for a family history project' → dùng tài liệu chuyên biệt để nghiên cứu.",
            "script": [
              {
                "s": "m",
                "who": "B",
                "t": "The archive has old maps and local newspapers that I cannot find online."
              },
              {
                "s": "m",
                "who": "B",
                "t": "I use them for a family history project."
              },
              {
                "s": "m",
                "who": "B",
                "t": "I compare old maps with present-day streets; an archive assistant explained the changing symbols."
              }
            ]
          },
          {
            "a": 2,
            "e": "Người C: 'ask the staff what they have enjoyed recently... leave my own suggestions on the noticeboard' → trao đổi gợi ý sách.",
            "script": [
              {
                "s": "f",
                "who": "C",
                "t": "I often ask the staff what they have enjoyed recently, and I leave my own suggestions on the noticeboard for other readers."
              },
              {
                "s": "f",
                "who": "C",
                "t": "The noticeboard has introduced me to books beyond my usual interests."
              }
            ]
          },
          {
            "a": 3,
            "e": "Người D: 'showed me how to fill in an online form and scan the documents' → được giúp với dịch vụ trực tuyến.",
            "script": [
              {
                "s": "m",
                "who": "D",
                "t": "The librarian showed me how to fill in an online form and scan the documents I needed."
              },
              {
                "s": "m",
                "who": "D",
                "t": "I would have struggled to do it alone."
              },
              {
                "s": "m",
                "who": "D",
                "t": "I can now book appointments online and send forms without crossing town."
              }
            ]
          }
        ]
      },
      {
        "type": "conv",
        "title": "Part 3 · Câu 15",
        "instr": "Nghe hai người thảo luận về việc thư viện có nên thu phí trả sách muộn. Ai bày tỏ ý kiến sau: người đàn ông (Man), người phụ nữ (Woman) hay cả hai (Both)?",
        "topic": "Should libraries charge late return fees?",
        "script": [
          {
            "s": "f",
            "t": "Late fees encourage people to return books on time, so others can borrow them."
          },
          {
            "s": "m",
            "t": "They can also discourage families who cannot pay, even when the delay was accidental."
          },
          {
            "s": "f",
            "t": "The library could send a reminder before charging anything."
          },
          {
            "s": "m",
            "t": "That would be fair, and people could renew a book online if nobody else is waiting."
          },
          {
            "s": "f",
            "t": "Some items are in high demand, so the rules may need to differ by book."
          },
          {
            "s": "m",
            "t": "Yes, but the library should explain the policy clearly and offer a simple way to ask for help."
          },
          {
            "s": "m",
            "t": "A reminder could be followed by a modest fee for a reserved title, while general books might need reminders only. The aim is fair access."
          }
        ],
        "statements": [
          {
            "q": "Returning books promptly helps other readers.",
            "a": "Woman",
            "e": "Người phụ nữ: 'return books on time, so others can borrow them'; người đàn ông không nêu ý này."
          },
          {
            "q": "Fees may create a barrier for some families.",
            "a": "Man",
            "e": "Người đàn ông: 'They can also discourage families who cannot pay'."
          },
          {
            "q": "A reminder could be sent before a charge.",
            "a": "Both",
            "e": "Người phụ nữ đề xuất 'send a reminder before charging anything'; người đàn ông đồng ý 'That would be fair' và nhắc lại 'A reminder could be followed by a modest fee'."
          },
          {
            "q": "Rules can vary according to demand.",
            "a": "Both",
            "e": "Người phụ nữ: 'the rules may need to differ by book'; người đàn ông đáp 'Yes' và đề xuất phí cho sách được đặt trước, sách thường chỉ cần nhắc nhở."
          }
        ]
      },
      {
        "type": "mono",
        "title": "Part 4 · Câu 16–17",
        "instr": "Nghe bài nói và trả lời 2 câu hỏi cho mỗi bài.",
        "talks": [
          {
            "topic": "A mobile library service",
            "script": [
              {
                "s": "f",
                "t": "In the northern district, several villages are too far from a permanent library for regular visits."
              },
              {
                "s": "f",
                "t": "A mobile library now follows a weekly route, stopping at schools, a health centre, and three village halls."
              },
              {
                "s": "f",
                "t": "The van carries popular books, but residents can request other titles in advance."
              },
              {
                "s": "f",
                "t": "The service also offers help with online forms and printing."
              },
              {
                "s": "f",
                "t": "A recent survey found that the school stops are busiest in the morning, while older residents tend to visit the village hall in the afternoon."
              },
              {
                "s": "f",
                "t": "The library is adjusting its schedule so people do not have to wait as long."
              },
              {
                "s": "f",
                "t": "Readers can request titles not carried on the van, and staff send them from the central branch."
              },
              {
                "s": "f",
                "t": "A text message now alerts people before the stop."
              }
            ],
            "questions": [
              {
                "q": "What can residents do if a title is not on the van?",
                "o": [
                  "Request it in advance",
                  "Borrow it from the health centre",
                  "Wait until next year"
                ],
                "a": 0,
                "e": "'residents can request other titles in advance' → đặt trước, nhân viên gửi sách từ chi nhánh trung tâm."
              },
              {
                "q": "When do older residents often visit?",
                "o": [
                  "In the morning",
                  "In the afternoon",
                  "In the evening"
                ],
                "a": 1,
                "e": "'older residents tend to visit the village hall in the afternoon' → buổi chiều; buổi sáng là các điểm trường học đông."
              }
            ]
          },
          {
            "topic": "Choosing trustworthy information",
            "script": [
              {
                "s": "m",
                "t": "A search engine can produce thousands of results, but the first result is not always the most reliable."
              },
              {
                "s": "m",
                "t": "Readers should check who published the information, when it was updated, and whether it refers to evidence that can be examined."
              },
              {
                "s": "m",
                "t": "A personal blog may be useful for describing an experience, while a government report may be better for official figures."
              },
              {
                "s": "m",
                "t": "The right source depends on the question."
              },
              {
                "s": "m",
                "t": "Librarians can help people search databases and compare sources."
              },
              {
                "s": "m",
                "t": "The speaker recommends opening more than one result before deciding whether a claim is well supported."
              },
              {
                "s": "m",
                "t": "Publication dates matter because advice changes, especially in health and technology."
              },
              {
                "s": "m",
                "t": "Readers should check evidence and distinguish personal opinion from verified information."
              }
            ],
            "questions": [
              {
                "q": "What should readers check about a source?",
                "o": [
                  "Who published it and when it was updated",
                  "How colourful the page looks",
                  "How many advertisements it has"
                ],
                "a": 0,
                "e": "'check who published the information, when it was updated' → ai xuất bản và cập nhật khi nào."
              },
              {
                "q": "Why might someone use more than one source?",
                "o": [
                  "To compare support for a claim",
                  "To finish searching more quickly",
                  "To avoid reading any reports"
                ],
                "a": 0,
                "e": "'opening more than one result before deciding whether a claim is well supported' → để so sánh xem một nhận định có được ủng hộ hay không."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "l25",
    "title": "Đề 22 — Wildlife care and rehabilitation",
    "parts": [
      {
        "type": "mcq",
        "title": "Part 1 · Câu 1–13",
        "instr": "Nghe đoạn ngắn và chọn đáp án đúng. Mỗi đoạn nghe tối đa 2 lần.",
        "items": [
          {
            "q": "When does the centre accept animals?",
            "o": [
              "8 a.m. to 6 p.m.",
              "All night",
              "Only at weekends"
            ],
            "a": 0,
            "e": "'accepts injured animals from 8 a.m. to 6 p.m.' → nhận từ 8 giờ sáng đến 6 giờ chiều; ban đêm chỉ có đường dây khẩn cấp.",
            "script": [
              {
                "s": "f",
                "t": "The hedgehog centre accepts injured animals from 8 a.m. to 6 p.m.; call the night line for emergencies.",
                "hl": 1
              }
            ]
          },
          {
            "q": "What must the fox be able to do before release?",
            "o": [
              "Find food independently",
              "Climb a fence",
              "Follow a keeper"
            ],
            "a": 0,
            "e": "'will not release it until it can find food on its own' → phải tự kiếm được thức ăn.",
            "script": [
              {
                "s": "m",
                "t": "The young fox is recovering well, but staff will not release it until it can find food on its own.",
                "hl": 1
              }
            ]
          },
          {
            "q": "Where is the workshop now?",
            "o": [
              "The greenhouse",
              "The education room",
              "The outdoor aviary"
            ],
            "a": 0,
            "e": "'has moved to the greenhouse because the education room is being cleaned' → chuyển sang nhà kính.",
            "script": [
              {
                "s": "f",
                "t": "The bird-care workshop has moved to the greenhouse because the education room is being cleaned.",
                "hl": 1
              }
            ]
          },
          {
            "q": "What did the speaker use to carry the bat?",
            "o": [
              "A cardboard box",
              "A glass jar",
              "A plastic bag"
            ],
            "a": 0,
            "e": "'I brought a small bat in a cardboard box' → hộp các-tông.",
            "script": [
              {
                "s": "m",
                "t": "I brought a small bat in a cardboard box, following the advice on the rescue centre's website.",
                "hl": 1
              }
            ]
          },
          {
            "q": "What supplies does the centre need?",
            "o": [
              "Towels and newspaper",
              "Pet food",
              "Medicine"
            ],
            "a": 0,
            "e": "'needs clean towels and newspaper this week; donations of pet food are not needed' → cần khăn và giấy báo, không cần thức ăn cho thú cưng.",
            "script": [
              {
                "s": "f",
                "t": "The centre needs clean towels and newspaper this week; donations of pet food are not needed.",
                "hl": 1
              }
            ]
          },
          {
            "q": "Why was the release scheduled for 5:30?",
            "o": [
              "There are fewer people nearby",
              "The field is warmer",
              "The vet finishes work then"
            ],
            "a": 0,
            "e": "'at 5:30, when fewer people are walking nearby' → lúc đó ít người qua lại.",
            "script": [
              {
                "s": "m",
                "t": "The animal release is planned for the field at 5:30, when fewer people are walking nearby.",
                "hl": 1
              }
            ]
          },
          {
            "q": "What is taught first?",
            "o": [
              "Safe handling",
              "Feeding routines",
              "Record keeping"
            ],
            "a": 1,
            "e": "'includes feeding routines first and safe handling after lunch' → học quy trình cho ăn trước; cách cầm giữ an toàn học sau bữa trưa.",
            "script": [
              {
                "s": "f",
                "t": "The volunteer course includes feeding routines first and safe handling after lunch.",
                "hl": 1
              }
            ]
          },
          {
            "q": "Where is the owl staying?",
            "o": [
              "In the quiet enclosure",
              "In the flight aviary",
              "At the vet clinic"
            ],
            "a": 0,
            "e": "'staying in the quiet enclosure, not the flight aviary' → ở chuồng yên tĩnh.",
            "script": [
              {
                "s": "m",
                "t": "The injured owl is staying in the quiet enclosure, not the flight aviary, until its wing is stronger.",
                "hl": 1
              }
            ]
          },
          {
            "q": "How many animals were treated in April?",
            "o": [
              "39",
              "46",
              "49"
            ],
            "a": 1,
            "e": "'treated 46 animals in April, compared with 39 in March' → tháng Tư 46 con; 39 là tháng Ba.",
            "script": [
              {
                "s": "f",
                "t": "The centre treated 46 animals in April, compared with 39 in March.",
                "hl": 1
              }
            ]
          },
          {
            "q": "Why was the path closed?",
            "o": [
              "To avoid disturbing deer and fawns",
              "A tree had fallen",
              "The path was flooded"
            ],
            "a": 0,
            "e": "'closed the visitor path when the deer began feeding their fawns' → đóng lối đi để không làm phiền hươu mẹ và hươu con.",
            "script": [
              {
                "s": "m",
                "t": "The keeper closed the visitor path when the deer began feeding their fawns near the fence.",
                "hl": 1
              }
            ]
          },
          {
            "q": "What needs to happen before the move?",
            "o": [
              "The water must be tested",
              "The pool must be painted",
              "The turtle must be fed"
            ],
            "a": 0,
            "e": "'once the water has been tested' → phải kiểm tra nước trước khi chuyển rùa.",
            "script": [
              {
                "s": "f",
                "t": "The rescued turtle will be moved to a larger pool tomorrow, once the water has been tested.",
                "hl": 1
              }
            ]
          },
          {
            "q": "What happens after the talk?",
            "o": [
              "A short walk",
              "A film screening",
              "A feeding demonstration"
            ],
            "a": 0,
            "e": "'a talk about bats, followed by a short walk' → sau buổi nói chuyện là một cuộc đi bộ ngắn.",
            "script": [
              {
                "s": "m",
                "t": "The centre's open day includes a talk about bats, followed by a short walk to look for signs of them.",
                "hl": 1
              }
            ]
          },
          {
            "q": "When is the last bus?",
            "o": [
              "5:30",
              "5:50",
              "6:10"
            ],
            "a": 1,
            "e": "'The last bus from the wildlife centre leaves at 5:50' → chuyến cuối lúc 5:50.",
            "script": [
              {
                "s": "f",
                "t": "The last bus from the wildlife centre leaves at 5:50, so visitors should finish the tour by then.",
                "hl": 1
              }
            ]
          }
        ]
      },
      {
        "type": "speakers",
        "title": "Part 2 · Câu 14",
        "instr": "Bốn người nói về lý do họ giúp đỡ động vật hoang dã. Chọn câu mô tả đúng nhất mỗi người. Có 2 lựa chọn thừa.",
        "topic": "People's reasons for helping wildlife",
        "options": [
          "Enjoys preparing food and care routines",
          "Helps with public education",
          "Prefers hands-on habitat work",
          "Supports the centre through record keeping",
          "Raises money for the centre",
          "Drives injured animals to the vet"
        ],
        "speakers": [
          {
            "a": 0,
            "e": "Người A: 'I weigh the food and write down what each animal eats. Routine is important' → chuẩn bị thức ăn và theo quy trình chăm sóc.",
            "script": [
              {
                "s": "f",
                "who": "A",
                "t": "I weigh the food and write down what each animal eats."
              },
              {
                "s": "f",
                "who": "A",
                "t": "Routine is important, especially when different animals need different diets."
              },
              {
                "s": "f",
                "who": "A",
                "t": "I follow the care plan and ask a senior keeper if an animal refuses food."
              }
            ]
          },
          {
            "a": 1,
            "e": "Người B: 'I take visitors around the centre and explain why wild animals should not be treated like pets' → giáo dục cộng đồng.",
            "script": [
              {
                "s": "m",
                "who": "B",
                "t": "I take visitors around the centre and explain why wild animals should not be treated like pets."
              },
              {
                "s": "m",
                "who": "B",
                "t": "Children ask the best questions."
              },
              {
                "s": "m",
                "who": "B",
                "t": "We explain what to do when a young animal is found alone; often it is safest to observe first."
              }
            ]
          },
          {
            "a": 2,
            "e": "Người C: 'I help clear invasive plants from the wetland and repair small nesting boxes' → trực tiếp cải tạo môi trường sống.",
            "script": [
              {
                "s": "f",
                "who": "C",
                "t": "I help clear invasive plants from the wetland and repair small nesting boxes."
              },
              {
                "s": "f",
                "who": "C",
                "t": "It is satisfying to see animals return to the area."
              },
              {
                "s": "f",
                "who": "C",
                "t": "We avoid nesting seasons and use hand tools where machinery could damage the wetland."
              }
            ]
          },
          {
            "a": 3,
            "e": "Người D: 'I organise intake forms and update the release records' → hỗ trợ bằng việc ghi chép hồ sơ.",
            "script": [
              {
                "s": "m",
                "who": "D",
                "t": "I organise intake forms and update the release records."
              },
              {
                "s": "m",
                "who": "D",
                "t": "Accurate notes help the staff understand which treatments are working."
              },
              {
                "s": "m",
                "who": "D",
                "t": "I check that intake forms include the location and time, which can help plan a release."
              }
            ]
          }
        ]
      },
      {
        "type": "conv",
        "title": "Part 3 · Câu 15",
        "instr": "Nghe hai người thảo luận về việc trung tâm cứu hộ có nên cho khách xem động vật đang hồi phục. Ai bày tỏ ý kiến sau: người đàn ông (Man), người phụ nữ (Woman) hay cả hai (Both)?",
        "topic": "Should wildlife centres allow visitors to see recovering animals?",
        "script": [
          {
            "s": "m",
            "t": "Visitors learn why rescue work matters when they can see the animals being cared for."
          },
          {
            "s": "f",
            "t": "Some animals become stressed by noise and movement, so access should be limited."
          },
          {
            "s": "m",
            "t": "Viewing windows could keep people at a distance."
          },
          {
            "s": "f",
            "t": "That helps, but staff should still be able to close the area if an animal needs quiet."
          },
          {
            "s": "m",
            "t": "Agreed. The centre could also use live camera feeds for animals that cannot be shown safely."
          },
          {
            "s": "f",
            "t": "Yes, education is valuable, but the animal's recovery must come first."
          },
          {
            "s": "f",
            "t": "The centre can explain each restriction at the entrance. Visitors are more patient when they understand that quiet conditions are part of treatment."
          }
        ],
        "statements": [
          {
            "q": "Visitors may learn from seeing rescue work.",
            "a": "Both",
            "e": "Người đàn ông: 'Visitors learn why rescue work matters when they can see the animals'; người phụ nữ cũng đồng ý: 'education is valuable' (dù muốn hạn chế việc tiếp cận)."
          },
          {
            "q": "Noise can affect an animal's recovery.",
            "a": "Woman",
            "e": "Người phụ nữ: 'Some animals become stressed by noise and movement' và 'quiet conditions are part of treatment'."
          },
          {
            "q": "Viewing areas should be closed when needed.",
            "a": "Both",
            "e": "Người phụ nữ: 'staff should still be able to close the area if an animal needs quiet'; người đàn ông đáp 'Agreed'."
          },
          {
            "q": "Explaining restrictions makes visitors more patient.",
            "a": "Woman",
            "e": "Người phụ nữ: 'explain each restriction at the entrance. Visitors are more patient when they understand'; người đàn ông không nói ý này."
          }
        ]
      },
      {
        "type": "mono",
        "title": "Part 4 · Câu 16–17",
        "instr": "Nghe bài nói và trả lời 2 câu hỏi cho mỗi bài.",
        "talks": [
          {
            "topic": "Returning a rescued owl to the wild",
            "script": [
              {
                "s": "f",
                "t": "A young tawny owl arrived at the centre after being found beside a road."
              },
              {
                "s": "f",
                "t": "It had no serious injuries, but it was weak and could not fly far."
              },
              {
                "s": "f",
                "t": "Keepers first offered food with minimal contact, then placed it in a larger flight enclosure where it could practise short flights."
              },
              {
                "s": "f",
                "t": "The release team selected woodland close to the discovery site because the owl was likely to know the area."
              },
              {
                "s": "f",
                "t": "They waited until dusk, when the bird would normally begin moving."
              },
              {
                "s": "f",
                "t": "After release, volunteers checked the site from a distance for several evenings."
              },
              {
                "s": "f",
                "t": "The team watched from a nearby path and recorded whether the owl returned."
              },
              {
                "s": "f",
                "t": "It was not tagged, to avoid unnecessary handling."
              }
            ],
            "questions": [
              {
                "q": "Why was the owl moved to a larger enclosure?",
                "o": [
                  "To practise flying",
                  "To meet other owls",
                  "To become used to visitors"
                ],
                "a": 0,
                "e": "'where it could practise short flights' → để tập bay."
              },
              {
                "q": "Why was the release held at dusk?",
                "o": [
                  "That is when the owl normally becomes active",
                  "The keepers finish at dusk",
                  "The woodland is warmer then"
                ],
                "a": 0,
                "e": "'when the bird would normally begin moving' → lúc chạng vạng là khi cú bắt đầu hoạt động."
              }
            ]
          },
          {
            "topic": "Why wildlife records matter",
            "script": [
              {
                "s": "m",
                "t": "Wildlife rescue centres collect details about where animals are found, what injuries they have, and how they recover."
              },
              {
                "s": "m",
                "t": "One record alone may not show a pattern, but information from many seasons can reveal risks."
              },
              {
                "s": "m",
                "t": "A rise in hedgehogs with road injuries near one junction, for example, could lead the council to review traffic signs or add a crossing."
              },
              {
                "s": "m",
                "t": "Centres must protect personal information from people who report an animal, while still sharing useful location data with conservation groups."
              },
              {
                "s": "m",
                "t": "The speaker says consistent records turn individual rescues into evidence for wider action."
              },
              {
                "s": "m",
                "t": "The centre shares summaries without personal details."
              },
              {
                "s": "m",
                "t": "Over several seasons, the records have helped identify patterns and safer release locations."
              }
            ],
            "questions": [
              {
                "q": "What might a rise in road injuries lead the council to do?",
                "o": [
                  "Review signs or add a crossing",
                  "Close the rescue centre",
                  "Move every animal to a new area"
                ],
                "a": 0,
                "e": "'review traffic signs or add a crossing' → xem lại biển báo hoặc thêm lối qua đường."
              },
              {
                "q": "What is the purpose of keeping consistent records?",
                "o": [
                  "To support wider conservation action",
                  "To identify every person who called",
                  "To replace animal treatment"
                ],
                "a": 0,
                "e": "'consistent records turn individual rescues into evidence for wider action' → làm bằng chứng cho hành động bảo tồn rộng hơn."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "l26",
    "title": "Đề 23 — Local business and community",
    "parts": [
      {
        "type": "mcq",
        "title": "Part 1 · Câu 1–13",
        "instr": "Nghe đoạn ngắn và chọn đáp án đúng. Mỗi đoạn nghe tối đa 2 lần.",
        "items": [
          {
            "q": "When can visitors use the sewing table?",
            "o": [
              "10 a.m.",
              "Noon",
              "2 p.m."
            ],
            "a": 1,
            "e": "'The sewing table is available from noon' → từ trưa; quán mở lúc 10 giờ.",
            "script": [
              {
                "s": "f",
                "t": "The repair cafe opens at 10 on the first Saturday of each month."
              },
              {
                "s": "f",
                "t": "The sewing table is available from noon.",
                "hl": 1
              }
            ]
          },
          {
            "q": "Where is the bookshop moving?",
            "o": [
              "Into the old travel agency",
              "Next to the bakery",
              "Into the library"
            ],
            "a": 0,
            "e": "'into the former travel agency' → chuyển vào chỗ đại lý du lịch cũ.",
            "script": [
              {
                "s": "m",
                "t": "The corner bookshop will move across the road next month, into the former travel agency.",
                "hl": 1
              }
            ]
          },
          {
            "q": "Which seller requires cash?",
            "o": [
              "The cheese seller",
              "The flower seller",
              "Both"
            ],
            "a": 1,
            "e": "'the flower seller only takes cash' → người bán hoa chỉ nhận tiền mặt; quầy phô mai nhận thẻ.",
            "script": [
              {
                "s": "f",
                "t": "The market's cheese stall accepts cards, but the flower seller only takes cash.",
                "hl": 1
              }
            ]
          },
          {
            "q": "How many people will attend?",
            "o": [
              "Four",
              "Five",
              "Six"
            ],
            "a": 1,
            "e": "'booked a table for six, but one friend has cancelled, so we only need five chairs' → 5 người.",
            "script": [
              {
                "s": "m",
                "t": "I booked a table for six, but one friend has cancelled, so we only need five chairs.",
                "hl": 1
              }
            ]
          },
          {
            "q": "What will be ready by Friday?",
            "o": [
              "Shortened sleeves",
              "A new lining",
              "A replacement jacket"
            ],
            "a": 0,
            "e": "'can shorten the jacket sleeves by Friday' → tay áo được cắt ngắn trước thứ Sáu; thay lớp lót mất thêm một tuần.",
            "script": [
              {
                "s": "f",
                "t": "The tailor can shorten the jacket sleeves by Friday.",
                "hl": 1
              },
              {
                "s": "f",
                "t": "Replacing the lining would take another week."
              }
            ]
          },
          {
            "q": "When do office deliveries arrive?",
            "o": [
              "Before 8:30",
              "At 10",
              "After noon"
            ],
            "a": 0,
            "e": "'delivers to offices before 8:30' → trước 8:30; giao tận nhà bắt đầu lúc 10.",
            "script": [
              {
                "s": "m",
                "t": "The local bakery delivers to offices before 8:30, but home deliveries begin at 10.",
                "hl": 1
              }
            ]
          },
          {
            "q": "Where may the fair be held?",
            "o": [
              "The school playground",
              "The library hall",
              "The train station"
            ],
            "a": 0,
            "e": "'will use the school playground if the town square is still under construction' → có thể tổ chức ở sân trường.",
            "script": [
              {
                "s": "f",
                "t": "The annual street fair will use the school playground if the town square is still under construction.",
                "hl": 1
              }
            ]
          },
          {
            "q": "Where should books be left?",
            "o": [
              "By the centre entrance",
              "In the cafe",
              "At the school"
            ],
            "a": 0,
            "e": "'in the labelled box by the community centre entrance, not in the cafe' → cạnh lối vào trung tâm.",
            "script": [
              {
                "s": "m",
                "t": "Please leave donated books in the labelled box by the community centre entrance, not in the cafe.",
                "hl": 1
              }
            ]
          },
          {
            "q": "What is free for new traders?",
            "o": [
              "Their first two weekends of space",
              "All supplies",
              "Advertising for a year"
            ],
            "a": 0,
            "e": "'free stall space to new traders for their first two weekends' → miễn phí chỗ bán trong hai cuối tuần đầu.",
            "script": [
              {
                "s": "f",
                "t": "The market association is offering free stall space to new traders for their first two weekends.",
                "hl": 1
              }
            ]
          },
          {
            "q": "When will the plumber visit?",
            "o": [
              "Before opening",
              "Around 6:30 p.m.",
              "At lunchtime"
            ],
            "a": 1,
            "e": "'after closing time, around half past six' → khoảng 6:30 tối.",
            "script": [
              {
                "s": "m",
                "t": "The plumber will check the shop's heating system after closing time, around half past six.",
                "hl": 1
              }
            ]
          },
          {
            "q": "What soup is available today?",
            "o": [
              "Pumpkin",
              "Mushroom",
              "Tomato"
            ],
            "a": 0,
            "e": "'Today's option is pumpkin, while tomorrow's will be mushroom' → hôm nay là súp bí đỏ.",
            "script": [
              {
                "s": "f",
                "t": "The cafe's soup changes every day."
              },
              {
                "s": "f",
                "t": "Today's option is pumpkin, while tomorrow's will be mushroom.",
                "hl": 1
              }
            ]
          },
          {
            "q": "Why are winter hours shorter?",
            "o": [
              "Customer numbers fall after dark",
              "Staff requested holidays",
              "The heating is broken"
            ],
            "a": 0,
            "e": "'because fewer customers come after dark' → trời tối ít khách hơn.",
            "script": [
              {
                "s": "m",
                "t": "The owner reduced the opening hours in winter because fewer customers come after dark.",
                "hl": 1
              }
            ]
          },
          {
            "q": "What will members vote on?",
            "o": [
              "A playground design",
              "A new bus route",
              "The market schedule"
            ],
            "a": 0,
            "e": "'will vote on the playground design' → bỏ phiếu về thiết kế sân chơi.",
            "script": [
              {
                "s": "f",
                "t": "The neighbourhood association will vote on the playground design at its meeting on Wednesday evening.",
                "hl": 1
              }
            ]
          }
        ]
      },
      {
        "type": "speakers",
        "title": "Part 2 · Câu 14",
        "instr": "Bốn người nói về lý do họ ủng hộ cửa hàng địa phương. Chọn câu mô tả đúng nhất mỗi người. Có 2 lựa chọn thừa.",
        "topic": "Why people support local businesses",
        "options": [
          "Values personal service",
          "Wants to keep money in the area",
          "Seeks unusual handmade goods",
          "Likes learning a business's story",
          "Prefers lower prices than in big shops",
          "Finds local shops easier to reach"
        ],
        "speakers": [
          {
            "a": 3,
            "e": "Người A: 'showed me how she made the blue glaze... I enjoy knowing who made what I buy' → thích biết câu chuyện đằng sau sản phẩm.",
            "script": [
              {
                "s": "f",
                "who": "A",
                "t": "The potter showed me how she made the blue glaze and explained why no two bowls look exactly alike."
              },
              {
                "s": "f",
                "who": "A",
                "t": "I enjoy knowing who made what I buy."
              }
            ]
          },
          {
            "a": 0,
            "e": "Người B: 'remembers which apples my children like... That personal attention keeps me coming back' → quý sự phục vụ tận tình.",
            "script": [
              {
                "s": "m",
                "who": "B",
                "t": "The grocer remembers which apples my children like and sets aside a bag when they are in season."
              },
              {
                "s": "m",
                "who": "B",
                "t": "That personal attention keeps me coming back."
              }
            ]
          },
          {
            "a": 2,
            "e": "Người C: 'their designs are different from the mass-produced things in big shops' → tìm đồ thủ công độc đáo.",
            "script": [
              {
                "s": "f",
                "who": "C",
                "t": "I buy my gifts from small makers because their designs are different from the mass-produced things in big shops."
              }
            ]
          },
          {
            "a": 1,
            "e": "Người D: 'the money helps pay local staff and supports other nearby suppliers' → muốn giữ tiền ở lại khu vực.",
            "script": [
              {
                "s": "m",
                "who": "D",
                "t": "When I spend at the neighbourhood bakery, the money helps pay local staff and supports other nearby suppliers."
              }
            ]
          }
        ]
      },
      {
        "type": "conv",
        "title": "Part 3 · Câu 15",
        "instr": "Nghe hai người thảo luận về việc chợ địa phương có nên giảm tiền thuê cho người bán. Ai bày tỏ ý kiến sau: người đàn ông (Man), người phụ nữ (Woman) hay cả hai (Both)?",
        "topic": "Should local markets charge traders less rent?",
        "script": [
          {
            "s": "f",
            "t": "Lower rent could help small traders stay in the market, especially new businesses."
          },
          {
            "s": "m",
            "t": "But the market needs income to pay for cleaning, lighting, and repairs."
          },
          {
            "s": "f",
            "t": "The council could offer a reduced rate for the first six months, then review how each stall is doing."
          },
          {
            "s": "m",
            "t": "That is more balanced than a permanent discount."
          },
          {
            "s": "f",
            "t": "Traders could also help with events and promotion."
          },
          {
            "s": "m",
            "t": "Yes, shared responsibility may be better than simply cutting every fee."
          },
          {
            "s": "f",
            "t": "The council should publish the costs so traders understand the decision."
          }
        ],
        "statements": [
          {
            "q": "Lower rent may help new traders.",
            "a": "Woman",
            "e": "Người phụ nữ: 'Lower rent could help small traders stay in the market, especially new businesses'; người đàn ông phản đối 'But the market needs income'."
          },
          {
            "q": "Market services need stable funding.",
            "a": "Man",
            "e": "Người đàn ông: 'the market needs income to pay for cleaning, lighting, and repairs'."
          },
          {
            "q": "Temporary discounts could be reviewed later.",
            "a": "Both",
            "e": "Người phụ nữ đề xuất 'a reduced rate for the first six months, then review'; người đàn ông đồng tình 'That is more balanced than a permanent discount'."
          },
          {
            "q": "Traders could contribute to promotion and events.",
            "a": "Both",
            "e": "Người phụ nữ: 'Traders could also help with events and promotion'; người đàn ông: 'Yes, shared responsibility may be better'."
          }
        ]
      },
      {
        "type": "mono",
        "title": "Part 4 · Câu 16–17",
        "instr": "Nghe bài nói và trả lời 2 câu hỏi cho mỗi bài.",
        "talks": [
          {
            "topic": "A neighbourhood repair shop",
            "script": [
              {
                "s": "m",
                "t": "A bicycle repair shop on Mill Street nearly closed when its owner retired."
              },
              {
                "s": "m",
                "t": "Instead of selling the tools, she trained two apprentices and transferred the business to them over six months."
              },
              {
                "s": "m",
                "t": "They kept the old name but added an online booking system and evening appointments."
              },
              {
                "s": "m",
                "t": "The shop now works with a nearby school to teach basic maintenance."
              },
              {
                "s": "m",
                "t": "The new owners say the partnership matters as much as the extra appointments because it introduces young people to safe cycling and gives the shop a steady stream of customers."
              }
            ],
            "questions": [
              {
                "q": "How did the previous owner prepare for retirement?",
                "o": [
                  "Trained apprentices and transferred the business",
                  "Sold the tools at auction",
                  "Closed immediately"
                ],
                "a": 0,
                "e": "'she trained two apprentices and transferred the business to them' → đào tạo học việc rồi chuyển giao cửa hàng."
              },
              {
                "q": "Why is the school partnership useful?",
                "o": [
                  "It teaches maintenance and brings customers",
                  "It provides free bicycles to staff",
                  "It reduces the shop's rent"
                ],
                "a": 0,
                "e": "'to teach basic maintenance' và 'gives the shop a steady stream of customers' → dạy bảo dưỡng xe và mang lại khách hàng."
              }
            ]
          },
          {
            "topic": "Paying for public events",
            "script": [
              {
                "s": "f",
                "t": "Community events often look free to visitors, but they still require permits, waste collection, and safe equipment."
              },
              {
                "s": "f",
                "t": "A town can pay for these costs through small grants, local sponsorship, or voluntary donations."
              },
              {
                "s": "f",
                "t": "Each option has limits: grants may be short term, sponsors may want visibility, and donations vary from year to year."
              },
              {
                "s": "f",
                "t": "The organiser recommends publishing a simple budget after each event."
              },
              {
                "s": "f",
                "t": "When people can see what the money covered, they are more likely to support the next one."
              },
              {
                "s": "f",
                "t": "Clear accounts also help volunteers plan realistically."
              }
            ],
            "questions": [
              {
                "q": "Which expense is mentioned?",
                "o": [
                  "Waste collection",
                  "Artist accommodation",
                  "Road construction"
                ],
                "a": 0,
                "e": "'permits, waste collection, and safe equipment' → chi phí thu gom rác được nhắc đến."
              },
              {
                "q": "Why publish a budget?",
                "o": [
                  "To show how money was used",
                  "To guarantee a larger grant",
                  "To avoid asking for volunteers"
                ],
                "a": 0,
                "e": "'When people can see what the money covered' → để mọi người thấy tiền đã được dùng vào việc gì."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "l27",
    "title": "Đề 24 — Environment and practical change",
    "parts": [
      {
        "type": "mcq",
        "title": "Part 1 · Câu 1–13",
        "instr": "Nghe đoạn ngắn và chọn đáp án đúng. Mỗi đoạn nghe tối đa 2 lần.",
        "items": [
          {
            "q": "Where do volunteers meet?",
            "o": [
              "The south car park",
              "The harbour cafe",
              "The north gate"
            ],
            "a": 0,
            "e": "'The beach clean-up starts at the south car park' → tập trung ở bãi đỗ xe phía nam.",
            "script": [
              {
                "s": "f",
                "t": "The beach clean-up starts at the south car park.",
                "hl": 1
              },
              {
                "s": "f",
                "t": "Gloves and bags will be handed out beside the blue information board."
              }
            ]
          },
          {
            "q": "When is glass collected?",
            "o": [
              "Thursday",
              "Monday",
              "Saturday"
            ],
            "a": 0,
            "e": "'collects glass on Thursdays' → thứ Năm; thứ Hai (cách tuần) là rác vườn.",
            "script": [
              {
                "s": "m",
                "t": "The council collects glass on Thursdays and garden waste every second Monday.",
                "hl": 1
              }
            ]
          },
          {
            "q": "Where is the refill station?",
            "o": [
              "By the bicycle racks",
              "Inside the cafe",
              "Near the swimming pool"
            ],
            "a": 0,
            "e": "'beside the bicycle racks' → cạnh chỗ để xe đạp.",
            "script": [
              {
                "s": "f",
                "t": "The new refill station is beside the bicycle racks, outside the main entrance to the sports centre.",
                "hl": 1
              }
            ]
          },
          {
            "q": "Which trees will they plant?",
            "o": [
              "Oak",
              "Willow",
              "Pine"
            ],
            "a": 1,
            "e": "'We planned to plant oak trees... so we chose willow instead' → đất quá ướt nên chọn cây liễu.",
            "script": [
              {
                "s": "m",
                "t": "We planned to plant oak trees, but the soil test showed the ground is too wet, so we chose willow instead.",
                "hl": 1
              }
            ]
          },
          {
            "q": "Which item cannot be accepted?",
            "o": [
              "A toaster",
              "A desk lamp",
              "A refrigerator"
            ],
            "a": 2,
            "e": "'it cannot accept refrigerators because there is no lifting equipment' → không nhận tủ lạnh; đồ gia dụng nhỏ thì sửa được.",
            "script": [
              {
                "s": "f",
                "t": "The repair workshop can mend small appliances, but it cannot accept refrigerators because there is no lifting equipment.",
                "hl": 1
              }
            ]
          },
          {
            "q": "Why did the speaker buy a pass?",
            "o": [
              "It costs less than separate tickets",
              "It includes bicycle repairs",
              "It works in another country"
            ],
            "a": 0,
            "e": "'six single tickets cost more each week' → vé tháng rẻ hơn mua vé lẻ.",
            "script": [
              {
                "s": "m",
                "t": "I switched to a monthly travel pass after calculating that six single tickets cost more each week.",
                "hl": 1
              }
            ]
          },
          {
            "q": "When do the panels produce most power?",
            "o": [
              "In the morning",
              "In the afternoon",
              "After sunset"
            ],
            "a": 1,
            "e": "'produce most power in the afternoon' → buổi chiều; sau hoàng hôn tòa nhà dùng điện đã tích trữ.",
            "script": [
              {
                "s": "f",
                "t": "The solar panels produce most power in the afternoon.",
                "hl": 1
              },
              {
                "s": "f",
                "t": "The building uses stored energy after sunset."
              }
            ]
          },
          {
            "q": "What can go into the compost bin?",
            "o": [
              "Fruit and vegetable scraps",
              "Cooked meat",
              "Plastic packaging"
            ],
            "a": 0,
            "e": "'for fruit and vegetable scraps only' → chỉ vỏ, vụn rau quả; đồ ăn chín thu hút côn trùng.",
            "script": [
              {
                "s": "m",
                "t": "The community compost bin is for fruit and vegetable scraps only; cooked food attracts pests.",
                "hl": 1
              }
            ]
          },
          {
            "q": "What must cyclists do on the bridge?",
            "o": [
              "Dismount",
              "Use the road",
              "Wait for a guide"
            ],
            "a": 0,
            "e": "'cyclists must dismount on the wooden bridge' → phải xuống xe dắt bộ.",
            "script": [
              {
                "s": "f",
                "t": "The river walk is open again, but cyclists must dismount on the wooden bridge while repairs continue.",
                "hl": 1
              }
            ]
          },
          {
            "q": "When should cups be returned?",
            "o": [
              "Within three days",
              "By the end of the month",
              "The same day"
            ],
            "a": 0,
            "e": "'Return them within three days' → trả trong vòng ba ngày để khỏi bị phạt.",
            "script": [
              {
                "s": "m",
                "t": "The library lends reusable cups for outdoor events."
              },
              {
                "s": "m",
                "t": "Return them within three days to avoid a replacement fee.",
                "hl": 1
              }
            ]
          },
          {
            "q": "What caused most energy waste?",
            "o": [
              "Heating empty rooms",
              "Old computers",
              "Lights in the car park"
            ],
            "a": 0,
            "e": "'the biggest waste came from heating empty meeting rooms overnight' → sưởi ấm phòng họp trống.",
            "script": [
              {
                "s": "f",
                "t": "The energy audit found that the biggest waste came from heating empty meeting rooms overnight.",
                "hl": 1
              }
            ]
          },
          {
            "q": "When will washable trays be introduced?",
            "o": [
              "After the kitchen renovation",
              "Before the kitchen renovation",
              "Next week"
            ],
            "a": 0,
            "e": "'will replace disposable lunch trays with washable ones after the kitchen renovation' → sau khi sửa xong bếp (tháng Bảy).",
            "script": [
              {
                "s": "m",
                "t": "The school will replace disposable lunch trays with washable ones after the kitchen renovation in July.",
                "hl": 1
              }
            ]
          },
          {
            "q": "What should dog owners do?",
            "o": [
              "Keep dogs on leads",
              "Avoid the whole park",
              "Feed the birds"
            ],
            "a": 0,
            "e": "'keep dogs on a lead near the nesting area' → giữ chó bằng dây xích.",
            "script": [
              {
                "s": "f",
                "t": "The wildlife group asks visitors to keep dogs on a lead near the nesting area until the chicks leave.",
                "hl": 1
              }
            ]
          }
        ]
      },
      {
        "type": "speakers",
        "title": "Part 2 · Câu 14",
        "instr": "Bốn người nói về những lựa chọn vì môi trường hằng ngày. Chọn câu mô tả đúng nhất mỗi người. Có 2 lựa chọn thừa.",
        "topic": "Everyday environmental choices",
        "options": [
          "Avoids unnecessary packaging",
          "Repairs items instead of replacing them",
          "Reduces energy use at home",
          "Changes travel habits",
          "Buys second-hand clothes",
          "Volunteers for local clean-up events"
        ],
        "speakers": [
          {
            "a": 1,
            "e": "Người A: 'When my kettle broke, I took it to a repair shop' → sửa đồ thay vì mua mới.",
            "script": [
              {
                "s": "m",
                "who": "A",
                "t": "When my kettle broke, I took it to a repair shop."
              },
              {
                "s": "m",
                "who": "A",
                "t": "A new switch cost less than a replacement kettle, and I avoided throwing away a useful appliance."
              }
            ]
          },
          {
            "a": 3,
            "e": "Người B: 'I now walk to the station and take the train for work' → thay đổi thói quen đi lại (không lái xe).",
            "script": [
              {
                "s": "f",
                "who": "B",
                "t": "I now walk to the station and take the train for work."
              },
              {
                "s": "f",
                "who": "B",
                "t": "It takes a little longer than driving, but I can read on the way."
              }
            ]
          },
          {
            "a": 0,
            "e": "Người C: 'I carry cloth bags... I choose products with less wrapping' → tránh bao bì không cần thiết.",
            "script": [
              {
                "s": "m",
                "who": "C",
                "t": "I carry cloth bags and buy loose vegetables when possible."
              },
              {
                "s": "m",
                "who": "C",
                "t": "I choose products with less wrapping, even if the package looks less convenient."
              }
            ]
          },
          {
            "a": 2,
            "e": "Người D: 'We set the heating lower and close the curtains at dusk... our winter energy bill has fallen' → tiết kiệm năng lượng ở nhà.",
            "script": [
              {
                "s": "f",
                "who": "D",
                "t": "We set the heating lower and close the curtains at dusk."
              },
              {
                "s": "f",
                "who": "D",
                "t": "The house stays comfortable, and our winter energy bill has fallen."
              }
            ]
          }
        ]
      },
      {
        "type": "conv",
        "title": "Part 3 · Câu 15",
        "instr": "Nghe hai người thảo luận về việc thành phố có nên thu phí ô tô vào trung tâm. Ai bày tỏ ý kiến sau: người đàn ông (Man), người phụ nữ (Woman) hay cả hai (Both)?",
        "topic": "Should cities charge cars to enter the centre?",
        "script": [
          {
            "s": "m",
            "t": "A small charge could reduce traffic and help fund better buses."
          },
          {
            "s": "f",
            "t": "It could also burden people who have no reasonable alternative, especially shift workers from outside the city."
          },
          {
            "s": "m",
            "t": "The fee could be waived for low-income drivers and people with disabilities."
          },
          {
            "s": "f",
            "t": "That helps, but the bus service must improve first."
          },
          {
            "s": "m",
            "t": "We could introduce the charge only after adding early and late routes."
          },
          {
            "s": "f",
            "t": "I would support a trial if the city publishes traffic and air-quality results."
          },
          {
            "s": "m",
            "t": "Agreed. The policy should be reviewed, not treated as permanent from day one."
          }
        ],
        "statements": [
          {
            "q": "A road charge could support better buses.",
            "a": "Man",
            "e": "Người đàn ông: 'A small charge could reduce traffic and help fund better buses'."
          },
          {
            "q": "Some drivers may lack a practical alternative.",
            "a": "Woman",
            "e": "Người phụ nữ: 'burden people who have no reasonable alternative, especially shift workers'."
          },
          {
            "q": "Transit should improve before the fee begins.",
            "a": "Both",
            "e": "Người phụ nữ: 'the bus service must improve first'; người đàn ông: 'introduce the charge only after adding early and late routes'."
          },
          {
            "q": "The policy should be tested and evaluated.",
            "a": "Both",
            "e": "Người phụ nữ: 'I would support a trial if the city publishes... results'; người đàn ông: 'Agreed. The policy should be reviewed'."
          }
        ]
      },
      {
        "type": "mono",
        "title": "Part 4 · Câu 16–17",
        "instr": "Nghe bài nói và trả lời 2 câu hỏi cho mỗi bài.",
        "talks": [
          {
            "topic": "Restoring a city stream",
            "script": [
              {
                "s": "m",
                "t": "For years, concrete walls hid the Brookfield stream beneath the main road."
              },
              {
                "s": "m",
                "t": "During a flood study, engineers found that opening part of the channel could slow water and create a green walking route."
              },
              {
                "s": "m",
                "t": "The first stage removed a short section of concrete and planted native grasses along the banks."
              },
              {
                "s": "m",
                "t": "The work did not solve every flood risk, so the city also upgraded drains upstream."
              },
              {
                "s": "m",
                "t": "Residents now use the path, and schools visit to test water quality."
              },
              {
                "s": "m",
                "t": "The project shows that a public space can be useful while supporting local wildlife."
              }
            ],
            "questions": [
              {
                "q": "Why was the stream project started?",
                "o": [
                  "To reduce flood risk and create a green route",
                  "To build a new road",
                  "To move the school"
                ],
                "a": 0,
                "e": "'opening part of the channel could slow water and create a green walking route' → giảm nguy cơ lũ và tạo lối đi xanh."
              },
              {
                "q": "What else did the city do about flooding?",
                "o": [
                  "Upgraded upstream drains",
                  "Removed every bridge",
                  "Closed the walking path"
                ],
                "a": 0,
                "e": "'the city also upgraded drains upstream' → nâng cấp cống thoát nước ở thượng nguồn."
              }
            ]
          },
          {
            "topic": "Buying second-hand electronics",
            "script": [
              {
                "s": "f",
                "t": "Buying a used phone can save money and reduce demand for new materials, but it helps to check the device carefully."
              },
              {
                "s": "f",
                "t": "Ask whether the battery has been tested, whether the phone is unlocked, and if the seller can show proof of ownership."
              },
              {
                "s": "f",
                "t": "A lower price is not a good deal if the device cannot receive security updates."
              },
              {
                "s": "f",
                "t": "Reputable refurbishers usually describe the condition and offer a limited warranty."
              },
              {
                "s": "f",
                "t": "The speaker suggests comparing the total expected cost, including a new battery, rather than looking only at the price on the listing."
              }
            ],
            "questions": [
              {
                "q": "What should buyers check besides price?",
                "o": [
                  "Battery, lock status, and ownership",
                  "The original box colour",
                  "The seller's social media followers"
                ],
                "a": 0,
                "e": "'Ask whether the battery has been tested, whether the phone is unlocked, and if the seller can show proof of ownership' → kiểm tra pin, tình trạng khóa máy và giấy tờ sở hữu."
              },
              {
                "q": "Why might a low-priced phone be a poor deal?",
                "o": [
                  "It may not receive security updates",
                  "It uses too little storage",
                  "It has a large screen"
                ],
                "a": 0,
                "e": "'A lower price is not a good deal if the device cannot receive security updates' → có thể không nhận được bản cập nhật bảo mật."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "l28",
    "title": "Đề 25 — Public transport and urban commuting",
    "parts": [
      {
        "type": "mcq",
        "title": "Part 1 · Câu 1–13",
        "instr": "Nghe từng đoạn ngắn (tối đa 2 lần) và chọn đáp án đúng.",
        "items": [
          {
            "q": "Which platform does the 08:15 train to Bristol leave from?",
            "o": [
              "Platform 3",
              "Platform 7",
              "Platform 9"
            ],
            "a": 1,
            "e": "'The 08:15 service to Bristol has moved from Platform 3 to Platform 7' → chuyến tàu chuyển sang sân ga số 7.",
            "script": [
              {
                "s": "f",
                "t": "Attention passengers. The 08:15 service to Bristol has moved from Platform 3 to Platform 7.",
                "hl": 1
              },
              {
                "s": "f",
                "t": "Passengers for Cardiff should continue to wait at Platform 9."
              }
            ]
          },
          {
            "q": "How much does a weekly student bus pass cost?",
            "o": [
              "£12",
              "£15",
              "£18"
            ],
            "a": 0,
            "e": "'With a student card, the weekly pass is £12 instead of the usual £18' → thẻ tuần sinh viên giá £12.",
            "script": [
              {
                "s": "m",
                "t": "Can I buy a weekly bus pass? I have my university ID."
              },
              {
                "s": "f",
                "t": "Sure. With a student card, the weekly pass is £12 instead of the usual £18.",
                "hl": 1
              }
            ]
          },
          {
            "q": "Why is the riverside ferry delayed this morning?",
            "o": [
              "Heavy fog on the river",
              "A broken ticket machine",
              "A bridge repair"
            ],
            "a": 0,
            "e": "'Because of thick fog along the river, the ferry will depart twenty minutes late' → trễ do sương mù dày trên sông.",
            "script": [
              {
                "s": "m",
                "t": "Good morning commuters. Because of thick fog along the river, the ferry will depart twenty minutes late.",
                "hl": 1
              },
              {
                "s": "m",
                "t": "You can use your ferry ticket on the number 14 bus in the meantime."
              }
            ]
          },
          {
            "q": "Where did Liam leave his umbrella?",
            "o": [
              "On the train",
              "At the ticket office",
              "In the station cafe"
            ],
            "a": 2,
            "e": "'I had it when I bought my coffee, so it must still be under the table in the station cafe' → để quên ở quán cà phê nhà ga.",
            "script": [
              {
                "s": "f",
                "t": "Did you drop your umbrella on the train, Liam?"
              },
              {
                "s": "m",
                "t": "No, I had it when I bought my coffee, so it must still be under the table in the station cafe.",
                "hl": 1
              }
            ]
          },
          {
            "q": "What time does the last airport shuttle leave the city centre?",
            "o": [
              "22:30",
              "23:15",
              "23:45"
            ],
            "a": 1,
            "e": "'The final coach departs the main square at 23:15' → chuyến cuối rời trung tâm lúc 23:15.",
            "script": [
              {
                "s": "f",
                "t": "Airport Express coaches run every half hour until 22:30."
              },
              {
                "s": "f",
                "t": "After that, the final coach departs the main square at 23:15 and reaches Terminal 2 by 23:45.",
                "hl": 1
              }
            ]
          },
          {
            "q": "What should cyclists do at the west entrance of the station?",
            "o": [
              "Walk their bikes",
              "Park on the pavement",
              "Show a helmet"
            ],
            "a": 0,
            "e": "'Please get off and push your bicycle through the west entrance' → xuống xe và dắt bộ.",
            "script": [
              {
                "s": "m",
                "t": "For everyone's safety, please get off and push your bicycle through the west entrance.",
                "hl": 1
              },
              {
                "s": "m",
                "t": "Covered racks are located fifty metres ahead on the left."
              }
            ]
          },
          {
            "q": "Which bus stop is closed until Friday?",
            "o": [
              "Market Street",
              "Green Park",
              "Hospital Gate"
            ],
            "a": 1,
            "e": "'Roadworks mean the Green Park stop is closed until Friday evening' → trạm Green Park đóng cửa đến thứ Sáu.",
            "script": [
              {
                "s": "f",
                "t": "Route 22 is running normally between Market Street and Hospital Gate."
              },
              {
                "s": "f",
                "t": "However, roadworks mean the Green Park stop is closed until Friday evening.",
                "hl": 1
              }
            ]
          },
          {
            "q": "What did Nora decide to buy for her commute?",
            "o": [
              "A folding bicycle",
              "A new raincoat",
              "Noise-cancelling headphones"
            ],
            "a": 2,
            "e": "'I went for noise-cancelling headphones so I can listen to podcasts on the train' → chọn mua tai nghe chống ồn.",
            "script": [
              {
                "s": "m",
                "t": "Did you end up getting that folding bike?"
              },
              {
                "s": "f",
                "t": "It was too heavy to carry up the stairs, so I went for noise-cancelling headphones so I can listen to podcasts on the train.",
                "hl": 1
              }
            ]
          },
          {
            "q": "What phone number should passengers call about lost property?",
            "o": [
              "01632 960 412",
              "01632 960 421",
              "01632 960 142"
            ],
            "a": 0,
            "e": "'call our lost property desk on 01632 960 412' → số điện thoại là 01632 960 412.",
            "script": [
              {
                "s": "m",
                "t": "If you have left an item on any tram or bus, please call our lost property desk on 01632 960 412.",
                "hl": 1
              },
              {
                "s": "m",
                "t": "The line is open Monday to Saturday from nine to five."
              }
            ]
          },
          {
            "q": "Why does Ben prefer taking the early tram?",
            "o": [
              "Tickets are cheaper",
              "He always gets a seat",
              "It stops closer to his office"
            ],
            "a": 1,
            "e": "'if I catch the 7:20 tram, I can always sit down and read' → luôn có chỗ ngồi.",
            "script": [
              {
                "s": "f",
                "t": "Why do you leave home so early, Ben? Is the fare cheaper?"
              },
              {
                "s": "m",
                "t": "The price is the same, but if I catch the 7:20 tram, I can always sit down and read.",
                "hl": 1
              }
            ]
          },
          {
            "q": "Where can travellers top up their smart travel cards?",
            "o": [
              "Only at the main station",
              "At any corner newsagent",
              "Inside the bus driver's cabin"
            ],
            "a": 1,
            "e": "'You can add credit at any local newsagent showing the blue travel sign' → nạp tiền tại bất kỳ quầy báo nào có biển hiệu.",
            "script": [
              {
                "s": "f",
                "t": "Drivers no longer accept cash top-ups on board."
              },
              {
                "s": "f",
                "t": "You can add credit at any local newsagent showing the blue travel sign, or use the mobile app.",
                "hl": 1
              }
            ]
          },
          {
            "q": "What change is happening to the night metro this weekend?",
            "o": [
              "It will close at midnight",
              "Trains will run every twenty minutes",
              "It will skip Central Station"
            ],
            "a": 1,
            "e": "'trains will operate every twenty minutes instead of every ten' → tàu chạy cách nhau 20 phút.",
            "script": [
              {
                "s": "m",
                "t": "Due to signal testing this Saturday night, trains will operate every twenty minutes instead of every ten.",
                "hl": 1
              },
              {
                "s": "m",
                "t": "All stations including Central Station will remain open."
              }
            ]
          },
          {
            "q": "What does the woman ask her colleague to bring to the carpool?",
            "o": [
              "A spare phone charger",
              "Coins for the toll road",
              "Directions to the hotel"
            ],
            "a": 0,
            "e": "'Could you bring a spare phone charger? Mine stopped working yesterday' → nhờ mang sạc điện thoại dự phòng.",
            "script": [
              {
                "s": "f",
                "t": "I've already paid the motorway toll online and saved the hotel map."
              },
              {
                "s": "f",
                "t": "Could you bring a spare phone charger? Mine stopped working yesterday.",
                "hl": 1
              }
            ]
          }
        ]
      },
      {
        "type": "speakers",
        "title": "Part 2 · Câu 14",
        "instr": "Nghe 4 người (A, B, C, D) nói về cách họ đi làm hằng ngày. Ghép mỗi người với mô tả đúng (có 2 lựa chọn thừa).",
        "topic": "How people commute to work",
        "options": [
          "Walks part of the journey for exercise",
          "Shares a car with neighbours",
          "Works on a laptop during the train ride",
          "Cycles along a quiet canal path",
          "Changed working hours to avoid rush hour",
          "Takes the ferry to enjoy the view"
        ],
        "speakers": [
          {
            "a": 0,
            "e": "Người A: 'I get off two stops early and walk the last twenty minutes' → đi bộ một đoạn để tập thể dục.",
            "script": [
              {
                "s": "m",
                "who": "A",
                "t": "I take the bus most of the way, but I get off two stops early and walk the last twenty minutes."
              },
              {
                "s": "m",
                "who": "A",
                "t": "It wakes me up before my first meeting and saves me a gym trip."
              }
            ]
          },
          {
            "a": 3,
            "e": "Người B: 'I follow the flat towpath beside the canal on my bike' → đạp xe dọc lối đi ven kênh.",
            "script": [
              {
                "s": "f",
                "who": "B",
                "t": "I stopped driving last spring and now I follow the flat towpath beside the canal on my bike."
              },
              {
                "s": "f",
                "who": "B",
                "t": "There are no traffic lights there, so my journey always takes exactly twenty-five minutes."
              }
            ]
          },
          {
            "a": 4,
            "e": "Người C: 'My manager agreed I could start at ten and finish at six' → đổi giờ làm để tránh giờ cao điểm.",
            "script": [
              {
                "s": "m",
                "who": "C",
                "t": "The eight o'clock train used to leave me exhausted before work even began."
              },
              {
                "s": "m",
                "who": "C",
                "t": "My manager agreed I could start at ten and finish at six, and now the carriages are almost empty."
              }
            ]
          },
          {
            "a": 1,
            "e": "Người D: 'Three of us on the same street take turns driving into the business park' → đi chung xe với hàng xóm.",
            "script": [
              {
                "s": "f",
                "who": "D",
                "t": "Public transport doesn't reach our industrial estate, so three of us on the same street take turns driving into the business park."
              },
              {
                "s": "f",
                "who": "D",
                "t": "We split the fuel bill and the drive passes much faster when you have company."
              }
            ]
          }
        ]
      },
      {
        "type": "conv",
        "title": "Part 3 · Câu 15",
        "instr": "Nghe hai người thảo luận về việc xây thêm làn xe đạp trong thành phố. Ai bày tỏ ý kiến sau: người đàn ông (Man), người phụ nữ (Woman) hay cả hai (Both)?",
        "topic": "Should cities build more cycle lanes?",
        "script": [
          {
            "s": "f",
            "t": "If the council builds separated cycle lanes on main roads, far more parents will let their children bike to school."
          },
          {
            "s": "m",
            "t": "I agree that painted lines alone don't feel safe, especially near junctions."
          },
          {
            "s": "f",
            "t": "Exactly. Physical kerbs make the biggest difference."
          },
          {
            "s": "m",
            "t": "My main worry is delivery vans. On narrow shopping streets, removing a lane can block shops from unloading goods."
          },
          {
            "s": "f",
            "t": "That's fair, though many towns solve it by setting early-morning delivery windows."
          },
          {
            "s": "m",
            "t": "True. Whatever they build, the routes need to connect smoothly instead of ending suddenly at roundabouts."
          },
          {
            "s": "f",
            "t": "Yes, a disconnected network is the quickest way to waste public money."
          }
        ],
        "statements": [
          {
            "q": "Separated lanes would encourage more families to cycle.",
            "a": "Woman",
            "e": "Người phụ nữ: 'far more parents will let their children bike to school'."
          },
          {
            "q": "Painted lines by themselves are not safe enough.",
            "a": "Both",
            "e": "Người đàn ông: 'painted lines alone don't feel safe'; người phụ nữ: 'Exactly. Physical kerbs make the biggest difference'."
          },
          {
            "q": "Narrow shopping streets may face delivery difficulties.",
            "a": "Man",
            "e": "Người đàn ông: 'On narrow shopping streets, removing a lane can block shops from unloading goods'."
          },
          {
            "q": "Cycle routes must form a continuous network.",
            "a": "Both",
            "e": "Người đàn ông: 'the routes need to connect smoothly'; người phụ nữ: 'Yes, a disconnected network is the quickest way to waste public money'."
          }
        ]
      },
      {
        "type": "mono",
        "title": "Part 4 · Câu 16–17",
        "instr": "Nghe bài nói và trả lời 2 câu hỏi cho mỗi bài.",
        "talks": [
          {
            "topic": "Night buses for shift workers",
            "script": [
              {
                "s": "m",
                "t": "When people think of city transport, they usually picture the weekday rush hour."
              },
              {
                "s": "m",
                "t": "Yet thousands of hospital staff, bakers, and warehouse workers travel between midnight and five in the morning."
              },
              {
                "s": "m",
                "t": "Last year, our transport authority launched three circular night routes linking residential estates directly to the hospital and distribution hub."
              },
              {
                "s": "m",
                "t": "Rather than using full-sized double-deckers, we chose smaller electric minibuses that are quieter on residential streets."
              },
              {
                "s": "m",
                "t": "Passenger numbers doubled within six months, and several employers now subsidise their staff passes."
              }
            ],
            "questions": [
              {
                "q": "Who were the new night routes mainly designed for?",
                "o": [
                  "Tourists arriving at the airport",
                  "People working overnight shifts",
                  "University students going home late"
                ],
                "a": 1,
                "e": "'hospital staff, bakers, and warehouse workers travel between midnight and five' → người làm ca đêm."
              },
              {
                "q": "Why did the authority choose smaller electric minibuses?",
                "o": [
                  "They carry more luggage",
                  "They make less noise in housing areas",
                  "They travel faster on motorways"
                ],
                "a": 1,
                "e": "'smaller electric minibuses that are quieter on residential streets' → ít ồn hơn ở khu dân cư."
              }
            ]
          },
          {
            "topic": "Contactless ticketing in regional towns",
            "script": [
              {
                "s": "f",
                "t": "Small towns often struggle to modernise bus tickets because each private operator uses a different fare system."
              },
              {
                "s": "f",
                "t": "A passenger switching from a rural bus to a town shuttle used to buy two separate paper tickets."
              },
              {
                "s": "f",
                "t": "Our regional partnership introduced a single tap-on, tap-off system with an automatic daily price cap."
              },
              {
                "s": "f",
                "t": "Crucially, we kept cash payments available so older residents without bank cards are not excluded."
              },
              {
                "s": "f",
                "t": "Boarding times have dropped by nearly a third, which helps buses stay on schedule."
              }
            ],
            "questions": [
              {
                "q": "What problem did passengers face before the new system?",
                "o": [
                  "They had to buy separate tickets for different operators",
                  "Buses only accepted foreign currency",
                  "Online booking charged a high fee"
                ],
                "a": 0,
                "e": "'used to buy two separate paper tickets' → phải mua vé rời cho từng hãng xe."
              },
              {
                "q": "Why did the partnership keep cash as an option?",
                "o": [
                  "Card readers often fail in winter",
                  "To ensure residents without bank cards can still travel",
                  "Because drivers preferred handling coins"
                ],
                "a": 1,
                "e": "'so older residents without bank cards are not excluded' → để người không có thẻ ngân hàng vẫn đi được."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "l29",
    "title": "Đề 26 — Healthy eating and food culture",
    "parts": [
      {
        "type": "mcq",
        "title": "Part 1 · Câu 1–13",
        "instr": "Nghe từng đoạn ngắn (tối đa 2 lần) và chọn đáp án đúng.",
        "items": [
          {
            "q": "What ingredient is missing from the kitchen?",
            "o": [
              "Garlic",
              "Olive oil",
              "Fresh basil"
            ],
            "a": 2,
            "e": "'we're completely out of fresh basil' → hết lá húng quế tươi.",
            "script": [
              {
                "s": "f",
                "t": "I've chopped the garlic and there's plenty of olive oil left."
              },
              {
                "s": "f",
                "t": "Could you grab a bunch of fresh basil on your way back? We're completely out.",
                "hl": 1
              }
            ]
          },
          {
            "q": "When does the Saturday farmers' market close?",
            "o": [
              "13:00",
              "14:30",
              "16:00"
            ],
            "a": 1,
            "e": "'stalls pack up at 2:30 p.m.' → đóng cửa lúc 14:30.",
            "script": [
              {
                "s": "m",
                "t": "The farmers' market opens at eight in the morning, and most bakers sell out by one."
              },
              {
                "s": "m",
                "t": "All stalls pack up at 2:30 p.m., so don't leave it too late.",
                "hl": 1
              }
            ]
          },
          {
            "q": "Why did Sam return his soup at the restaurant?",
            "o": [
              "It was too salty",
              "It was lukewarm",
              "It contained nuts"
            ],
            "a": 1,
            "e": "'it arrived barely warm' → súp mang ra chỉ hơi âm ấm (nguội).",
            "script": [
              {
                "s": "f",
                "t": "Was there something wrong with the seasoning?"
              },
              {
                "s": "m",
                "t": "No, the flavour was fine, it just arrived barely warm, so I asked them to heat it up.",
                "hl": 1
              }
            ]
          },
          {
            "q": "How much is the cooking workshop including ingredients?",
            "o": [
              "£25",
              "£30",
              "£35"
            ],
            "a": 2,
            "e": "'£30 for the lesson plus £5 for ingredients, so £35 in total' → tổng cộng £35.",
            "script": [
              {
                "s": "f",
                "t": "Our Saturday pastry workshop costs £30 for the lesson plus £5 for ingredients, so £35 in total.",
                "hl": 1
              },
              {
                "s": "f",
                "t": "Aprons and recipe cards are provided free of charge."
              }
            ]
          },
          {
            "q": "Which drink does Maya order?",
            "o": [
              "Iced green tea",
              "Oat milk latte",
              "Fresh orange juice"
            ],
            "a": 0,
            "e": "'I'll just have an iced green tea with lemon' → gọi trà xanh đá.",
            "script": [
              {
                "s": "m",
                "t": "Would you like your usual oat milk latte?"
              },
              {
                "s": "f",
                "t": "I've already had two coffees today. I'll just have an iced green tea with lemon.",
                "hl": 1
              }
            ]
          },
          {
            "q": "Where is the new vegetarian bakery located?",
            "o": [
              "Next to the cinema",
              "Opposite the post office",
              "Inside the shopping mall"
            ],
            "a": 1,
            "e": "'It's right across the street from the old post office' → đối diện bưu điện.",
            "script": [
              {
                "s": "m",
                "t": "Have you tried the new bakery near the cinema?"
              },
              {
                "s": "f",
                "t": "That one closed last month. The new vegetarian place is right across the street from the old post office.",
                "hl": 1
              }
            ]
          },
          {
            "q": "What should guests mention when booking the dinner?",
            "o": [
              "Their seating preference",
              "Any food allergies",
              "Their arrival time"
            ],
            "a": 1,
            "e": "'please let us know about any food allergies at least two days in advance' → báo trước nếu bị dị ứng thực phẩm.",
            "script": [
              {
                "s": "f",
                "t": "Everyone sits together at one long table starting at seven."
              },
              {
                "s": "f",
                "t": "When you reserve your place, please let us know about any food allergies at least two days in advance.",
                "hl": 1
              }
            ]
          },
          {
            "q": "Why did the man stop buying pre-cut vegetables?",
            "o": [
              "They spoil too quickly",
              "They have too much plastic",
              "They taste bitter"
            ],
            "a": 0,
            "e": "'they always seemed to go soft after just one day in the fridge' → nhanh hỏng.",
            "script": [
              {
                "s": "f",
                "t": "Don't pre-cut vegetables save you a lot of time?"
              },
              {
                "s": "m",
                "t": "They do, but they always seemed to go soft after just one day in the fridge, so I ended up throwing half away.",
                "hl": 1
              }
            ]
          },
          {
            "q": "What day is the supermarket offering double loyalty points?",
            "o": [
              "Tuesday",
              "Wednesday",
              "Thursday"
            ],
            "a": 2,
            "e": "'double points are now awarded every Thursday' → áp dụng vào thứ Năm.",
            "script": [
              {
                "s": "m",
                "t": "Shoppers, please note that our midweek promotion has moved from Tuesday."
              },
              {
                "s": "m",
                "t": "Double points are now awarded every Thursday on all fresh produce.",
                "hl": 1
              }
            ]
          },
          {
            "q": "What is the woman's main tip for cooking rice?",
            "o": [
              "Use boiling water",
              "Rinse it several times first",
              "Stir it while it cooks"
            ],
            "a": 1,
            "e": "'the real secret is rinsing the grains three times before cooking' → vo gạo vài lần trước khi nấu.",
            "script": [
              {
                "s": "f",
                "t": "People often worry about the exact pot they use, but the real secret is rinsing the grains three times before cooking.",
                "hl": 1
              },
              {
                "s": "f",
                "t": "And once the lid is on, never lift it to stir."
              }
            ]
          },
          {
            "q": "How will the grocery box be delivered?",
            "o": [
              "By electric cargo bike",
              "By refrigerated van",
              "Left at a pickup locker"
            ],
            "a": 0,
            "e": "'our riders deliver within the city by electric cargo bike' → giao bằng xe đạp chở hàng chạy điện.",
            "script": [
              {
                "s": "m",
                "t": "To cut emissions, our riders deliver within the city by electric cargo bike every Friday morning.",
                "hl": 1
              },
              {
                "s": "m",
                "t": "Just leave last week's empty wooden crate on your doorstep."
              }
            ]
          },
          {
            "q": "What did David forget to pack for the picnic?",
            "o": [
              "Paper napkins",
              "A bottle opener",
              "Plastic cups"
            ],
            "a": 2,
            "e": "'I packed napkins and the bottle opener, but I left the cups on the kitchen counter' → quên mang cốc.",
            "script": [
              {
                "s": "f",
                "t": "Great, you remembered the lemonade! Where are the cups?"
              },
              {
                "s": "m",
                "t": "Oh no—I packed napkins and the bottle opener, but I left the cups on the kitchen counter.",
                "hl": 1
              }
            ]
          },
          {
            "q": "Why does the nutritionist recommend eating breakfast within an hour of waking?",
            "o": [
              "It improves sleep quality",
              "It helps keep energy levels steady",
              "It speeds up lunch digestion"
            ],
            "a": 1,
            "e": "'helps keep your blood sugar and energy steady throughout the morning' → giữ mức năng lượng ổn định.",
            "script": [
              {
                "s": "f",
                "t": "You don't need a huge breakfast, just something with protein and fibre."
              },
              {
                "s": "f",
                "t": "Eating within an hour of waking helps keep your blood sugar and energy steady throughout the morning.",
                "hl": 1
              }
            ]
          }
        ]
      },
      {
        "type": "speakers",
        "title": "Part 2 · Câu 14",
        "instr": "Nghe 4 người (A, B, C, D) nói về cách họ chuẩn bị bữa ăn trong tuần. Ghép mỗi người với mô tả đúng (có 2 lựa chọn thừa).",
        "topic": "How people plan their weekly meals",
        "options": [
          "Cooks large batches on Sunday afternoon",
          "Orders meal kits with measured ingredients",
          "Writes a strict shopping list before visiting the store",
          "Grows herbs and salad leaves on a balcony",
          "Swaps home-cooked dishes with a friend",
          "Eats the main hot meal at lunchtime"
        ],
        "speakers": [
          {
            "a": 0,
            "e": "Người A: 'Every Sunday afternoon I roast two trays of vegetables and make a big pot of soup' → nấu sẵn lượng lớn vào chiều Chủ nhật.",
            "script": [
              {
                "s": "f",
                "who": "A",
                "t": "Every Sunday afternoon I roast two trays of vegetables and make a big pot of soup."
              },
              {
                "s": "f",
                "who": "A",
                "t": "Then on busy weeknights I only need ten minutes to heat dinner."
              }
            ]
          },
          {
            "a": 2,
            "e": "Người B: 'I check the cupboards first and write down every single item I need' → lập danh sách mua sắm chặt chẽ trước khi đi chợ.",
            "script": [
              {
                "s": "m",
                "who": "B",
                "t": "I used to buy random snacks whenever I shopped hungry."
              },
              {
                "s": "m",
                "who": "B",
                "t": "Now I check the cupboards first and write down every single item I need, and I never buy anything off the list."
              }
            ]
          },
          {
            "a": 4,
            "e": "Người C: 'my neighbour and I each cook double portions twice a week and trade containers' → trao đổi món ăn tự nấu với bạn/hàng xóm.",
            "script": [
              {
                "s": "f",
                "who": "C",
                "t": "Cooking for one person gets boring, so my neighbour and I each cook double portions twice a week and trade containers."
              },
              {
                "s": "f",
                "who": "C",
                "t": "We both get more variety without spending extra time in the kitchen."
              }
            ]
          },
          {
            "a": 5,
            "e": "Người D: 'I have my proper cooked meal at midday and just eat fruit or toast in the evening' → ăn bữa chính nóng vào buổi trưa.",
            "script": [
              {
                "s": "m",
                "who": "D",
                "t": "Eating heavily at nine o'clock always gave me a restless night."
              },
              {
                "s": "m",
                "who": "D",
                "t": "Now I have my proper cooked meal at midday and just eat fruit or toast in the evening."
              }
            ]
          }
        ]
      },
      {
        "type": "conv",
        "title": "Part 3 · Câu 15",
        "instr": "Nghe hai người thảo luận về việc trường học cung cấp bữa trưa nóng miễn phí cho tất cả học sinh. Ai bày tỏ ý kiến sau: người đàn ông (Man), người phụ nữ (Woman) hay cả hai (Both)?",
        "topic": "Should schools provide free hot lunches for all pupils?",
        "script": [
          {
            "s": "m",
            "t": "Providing free hot lunches for every pupil removes the embarrassment some families feel about applying for help."
          },
          {
            "s": "f",
            "t": "I see that benefit, and teachers always say children concentrate better after a warm meal."
          },
          {
            "s": "m",
            "t": "Exactly. Afternoon lessons are much calmer when nobody is hungry."
          },
          {
            "s": "f",
            "t": "My concern is the budget. Paying for families who can easily afford lunch might take money away from classroom equipment."
          },
          {
            "s": "m",
            "t": "Buying ingredients in bulk actually lowers the cost per meal quite a lot."
          },
          {
            "s": "f",
            "t": "Maybe, as long as kitchens are funded properly so the food is genuinely nutritious and not just cheap processed snacks."
          },
          {
            "s": "m",
            "t": "Completely agree—quality standards have to be written into the contract."
          }
        ],
        "statements": [
          {
            "q": "Universal free meals avoid stigma for lower-income families.",
            "a": "Man",
            "e": "Người đàn ông: 'removes the embarrassment some families feel about applying for help'."
          },
          {
            "q": "A warm lunch helps pupils focus in the afternoon.",
            "a": "Both",
            "e": "Người phụ nữ: 'children concentrate better after a warm meal'; người đàn ông: 'Exactly. Afternoon lessons are much calmer'."
          },
          {
            "q": "Funding free meals for everyone could reduce other school resources.",
            "a": "Woman",
            "e": "Người phụ nữ: 'might take money away from classroom equipment'."
          },
          {
            "q": "Strict nutritional quality must be guaranteed.",
            "a": "Both",
            "e": "Người phụ nữ: 'the food is genuinely nutritious'; người đàn ông: 'Completely agree—quality standards have to be written into the contract'."
          }
        ]
      },
      {
        "type": "mono",
        "title": "Part 4 · Câu 16–17",
        "instr": "Nghe bài nói và trả lời 2 câu hỏi cho mỗi bài.",
        "talks": [
          {
            "topic": "Reducing food waste in supermarkets",
            "script": [
              {
                "s": "f",
                "t": "A surprising amount of edible food never even reaches supermarket shelves simply because of its shape or size."
              },
              {
                "s": "f",
                "t": "Curved carrots or slightly scarred apples taste identical, yet strict cosmetic rules used to reject them at the farm."
              },
              {
                "s": "f",
                "t": "Over the past three years, several chains have introduced 'imperfect produce' boxes sold at twenty percent below standard prices."
              },
              {
                "s": "f",
                "t": "At the same time, stores are replacing 'best before' dates on fresh fruit with clearer storage advice so shoppers rely on sight and smell."
              },
              {
                "s": "f",
                "t": "Early audits suggest these two steps together have cut store-level vegetable waste by nearly a quarter."
              }
            ],
            "questions": [
              {
                "q": "Why was a lot of edible produce previously rejected?",
                "o": [
                  "It failed appearance standards",
                  "It was harvested too late",
                  "It cost too much to transport"
                ],
                "a": 0,
                "e": "'strict cosmetic rules used to reject them' → bị loại vì không đạt tiêu chuẩn hình thức."
              },
              {
                "q": "What change have stores made to labels on fresh fruit?",
                "o": [
                  "Printed larger nutrition tables",
                  "Replaced 'best before' dates with storage tips",
                  "Added the farmer's photograph"
                ],
                "a": 1,
                "e": "'replacing best before dates on fresh fruit with clearer storage advice' → thay bằng hướng dẫn bảo quản."
              }
            ]
          },
          {
            "topic": "Reviving traditional fermented foods",
            "script": [
              {
                "s": "m",
                "t": "Long before refrigerators existed, families preserved seasonal harvests through fermentation—turning cabbage into kimchi or milk into yoghurt."
              },
              {
                "s": "m",
                "t": "Recently, young chefs and home cooks have returned to these slow techniques, partly because of growing interest in gut health."
              },
              {
                "s": "m",
                "t": "Unlike quick pickling with vinegar, natural fermentation relies on salt, time, and beneficial bacteria."
              },
              {
                "s": "m",
                "t": "Community workshops now teach beginners how to sterilise jars and judge temperature so batches turn out crisp and safe."
              },
              {
                "s": "m",
                "t": "Many participants say the best part is reconnecting with recipes their grandparents used to make."
              }
            ],
            "questions": [
              {
                "q": "How does natural fermentation differ from quick pickling?",
                "o": [
                  "It requires freezing the vegetables",
                  "It uses salt, time, and bacteria instead of vinegar",
                  "It can only be done in winter"
                ],
                "a": 1,
                "e": "'Unlike quick pickling with vinegar, natural fermentation relies on salt, time, and beneficial bacteria'."
              },
              {
                "q": "What do beginners learn in the community workshops?",
                "o": [
                  "How to clean jars and control temperature",
                  "How to sell products online",
                  "How to grow cabbages indoors"
                ],
                "a": 0,
                "e": "'teach beginners how to sterilise jars and judge temperature' → tiệt trùng hũ và kiểm soát nhiệt độ."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "l30",
    "title": "Đề 27 — Remote work and digital habits",
    "parts": [
      {
        "type": "mcq",
        "title": "Part 1 · Câu 1–13",
        "instr": "Nghe từng đoạn ngắn (tối đa 2 lần) và chọn đáp án đúng.",
        "items": [
          {
            "q": "When will the team video call take place now?",
            "o": [
              "10:00",
              "11:30",
              "14:00"
            ],
            "a": 1,
            "e": "'we've pushed it back to 11:30' → dời sang 11:30.",
            "script": [
              {
                "s": "f",
                "t": "Hi Tom, the ten o'clock design call clashed with a client demo, so we've pushed it back to 11:30.",
                "hl": 1
              },
              {
                "s": "f",
                "t": "That still leaves the afternoon free for the 2 p.m. workshop."
              }
            ]
          },
          {
            "q": "Where should visitors collect a temporary Wi-Fi password?",
            "o": [
              "From the security desk",
              "In the third-floor lounge",
              "At reception"
            ],
            "a": 2,
            "e": "'ask for a guest voucher at the main reception desk' → lấy tại quầy lễ tân chính.",
            "script": [
              {
                "s": "m",
                "t": "The old guest password expired this morning."
              },
              {
                "s": "m",
                "t": "If you have clients visiting, please ask for a guest voucher at the main reception desk.",
                "hl": 1
              }
            ]
          },
          {
            "q": "Why couldn't Hannah join the webinar?",
            "o": [
              "Her internet cut out",
              "Her microphone broke",
              "She got the wrong link"
            ],
            "a": 0,
            "e": "'my home router lost connection right before it started' → mất kết nối mạng.",
            "script": [
              {
                "s": "m",
                "t": "Sorry you missed the webinar, Hannah. Did the link fail?"
              },
              {
                "s": "f",
                "t": "No, the link was fine—my home router lost connection right before it started.",
                "hl": 1
              }
            ]
          },
          {
            "q": "How long will the IT maintenance last on Sunday?",
            "o": [
              "One hour",
              "Two hours",
              "Four hours"
            ],
            "a": 1,
            "e": "'between six and eight a.m.' → kéo dài 2 tiếng.",
            "script": [
              {
                "s": "f",
                "t": "Email and shared drives will be offline this Sunday between six and eight a.m. for server updates.",
                "hl": 1
              },
              {
                "s": "f",
                "t": "Everything will be back to normal well before the working week begins."
              }
            ]
          },
          {
            "q": "What item does Alex want to borrow from the office supply room?",
            "o": [
              "A laptop stand",
              "A second monitor",
              "A wireless mouse"
            ],
            "a": 0,
            "e": "'I'm looking for a folding laptop stand for my home desk' → muốn mượn giá đỡ laptop.",
            "script": [
              {
                "s": "m",
                "t": "I already have a spare mouse, so I'm looking for a folding laptop stand for my home desk.",
                "hl": 1
              },
              {
                "s": "f",
                "t": "Check the top shelf next to the spare keyboards."
              }
            ]
          },
          {
            "q": "Which room has the colour printer?",
            "o": [
              "Room 204",
              "Room 210",
              "Room 305"
            ],
            "a": 2,
            "e": "'the colour printer was moved upstairs to Room 305' → chuyển lên phòng 305.",
            "script": [
              {
                "s": "f",
                "t": "Room 204 only has the black-and-white photocopier now."
              },
              {
                "s": "f",
                "t": "The colour printer was moved upstairs to Room 305 last week.",
                "hl": 1
              }
            ]
          },
          {
            "q": "What does the manager ask staff to do before leaving a shared desk?",
            "o": [
              "Turn off the monitor",
              "Unplug the cables",
              "Wipe the surface clean"
            ],
            "a": 2,
            "e": "'please wipe the desk with the sanitising cloths provided' → lau sạch mặt bàn.",
            "script": [
              {
                "s": "m",
                "t": "Leave the cables plugged in for the next person, as they are colour-coded."
              },
              {
                "s": "m",
                "t": "Before you head home, please wipe the desk with the sanitising cloths provided.",
                "hl": 1
              }
            ]
          },
          {
            "q": "How much is the monthly coworking membership for part-time users?",
            "o": [
              "£65",
              "£85",
              "£120"
            ],
            "a": 1,
            "e": "'our part-time plan for ten days a month is £85' → gói bán thời gian giá £85.",
            "script": [
              {
                "s": "f",
                "t": "Full-time access is £120 a month, while our part-time plan for ten days a month is £85.",
                "hl": 1
              },
              {
                "s": "f",
                "t": "Both plans include free coffee and meeting booth bookings."
              }
            ]
          },
          {
            "q": "Why does Clara mute notifications after 7 p.m.?",
            "o": [
              "To save phone battery",
              "To spend uninterrupted time with her family",
              "Because her signal is weak at home"
            ],
            "a": 1,
            "e": "'so I can actually focus on dinner and my kids without checking work messages' → dành thời gian trọn vẹn cho gia đình.",
            "script": [
              {
                "s": "m",
                "t": "Do you turn off work alerts to save battery?"
              },
              {
                "s": "f",
                "t": "No, I set automatic silence at seven so I can actually focus on dinner and my kids without checking work messages.",
                "hl": 1
              }
            ]
          },
          {
            "q": "What file format should presenters submit their slides in?",
            "o": [
              "PDF",
              "PowerPoint",
              "Plain text"
            ],
            "a": 0,
            "e": "'please export your slides as a PDF so the fonts don't shift' → nộp dưới dạng PDF.",
            "script": [
              {
                "s": "m",
                "t": "We've had trouble with custom fonts changing on the conference laptop."
              },
              {
                "s": "m",
                "t": "To avoid surprises, please export your slides as a PDF before emailing them over.",
                "hl": 1
              }
            ]
          },
          {
            "q": "Where will the Friday training session be held?",
            "o": [
              "Online only",
              "In the main auditorium",
              "In the training annex"
            ],
            "a": 0,
            "e": "'we've decided to run Friday's session completely online' → tổ chức hoàn toàn trực tuyến.",
            "script": [
              {
                "s": "f",
                "t": "Because the auditorium air conditioning is being repaired, we've decided to run Friday's session completely online.",
                "hl": 1
              },
              {
                "s": "f",
                "t": "A recording will also be posted for anyone on leave."
              }
            ]
          },
          {
            "q": "What happened to Kevin's laptop?",
            "o": [
              "He spilled tea on the keyboard",
              "The battery stopped charging",
              "The screen cracked in his bag"
            ],
            "a": 1,
            "e": "'the battery refuses to hold a charge unless it stays plugged in' → pin không sạc được nữa.",
            "script": [
              {
                "s": "f",
                "t": "Did you drop your laptop again, Kevin?"
              },
              {
                "s": "m",
                "t": "Thankfully no—the screen is fine, but the battery refuses to hold a charge unless it stays plugged in.",
                "hl": 1
              }
            ]
          },
          {
            "q": "What does the speaker suggest for avoiding eye strain?",
            "o": [
              "Buying blue-light glasses",
              "Looking away from the screen every twenty minutes",
              "Working in a dark room"
            ],
            "a": 1,
            "e": "'every twenty minutes, look at something across the room for twenty seconds' → nhìn ra xa màn hình mỗi 20 phút.",
            "script": [
              {
                "s": "f",
                "t": "Before spending money on special glasses, try a simpler habit."
              },
              {
                "s": "f",
                "t": "Every twenty minutes, look at something across the room for twenty seconds to let your eye muscles relax.",
                "hl": 1
              }
            ]
          }
        ]
      },
      {
        "type": "speakers",
        "title": "Part 2 · Câu 14",
        "instr": "Nghe 4 người (A, B, C, D) nói về cách họ kiểm soát thời gian dùng màn hình ngoài giờ làm. Ghép mỗi người với mô tả đúng (có 2 lựa chọn thừa).",
        "topic": "Managing screen time outside work",
        "options": [
          "Charges the phone outside the bedroom",
          "Deleted social media apps from the phone",
          "Uses a paper notebook for evening reading and notes",
          "Sets a daily app timer on the phone",
          "Takes a full screen-free day every weekend",
          "Switched the phone display to black and white"
        ],
        "speakers": [
          {
            "a": 0,
            "e": "Người A: 'I plug my phone in on the hallway table before bed and use a cheap alarm clock' → sạc điện thoại ngoài phòng ngủ.",
            "script": [
              {
                "s": "m",
                "who": "A",
                "t": "I used to scroll in bed for an hour every night."
              },
              {
                "s": "m",
                "who": "A",
                "t": "Now I plug my phone in on the hallway table before bed and use a cheap alarm clock instead."
              }
            ]
          },
          {
            "a": 5,
            "e": "Người B: 'I switched my screen to greyscale' → chuyển màn hình sang trắng đen.",
            "script": [
              {
                "s": "f",
                "who": "B",
                "t": "A friend told me to switch my screen to greyscale, and it worked immediately."
              },
              {
                "s": "f",
                "who": "B",
                "t": "Without bright colours, shopping and video apps suddenly look much less tempting."
              }
            ]
          },
          {
            "a": 1,
            "e": "Người C: 'I removed all social media apps from my phone and only check them on my laptop' → xóa ứng dụng mạng xã hội khỏi điện thoại.",
            "script": [
              {
                "s": "m",
                "who": "C",
                "t": "I didn't close my accounts, I just removed all social media apps from my phone and only check them on my laptop."
              },
              {
                "s": "m",
                "who": "C",
                "t": "That small barrier cut my usage from two hours a day to fifteen minutes."
              }
            ]
          },
          {
            "a": 4,
            "e": "Người D: 'Every Sunday I turn off my laptop and phone from morning until evening' → dành trọn một ngày cuối tuần không màn hình.",
            "script": [
              {
                "s": "f",
                "who": "D",
                "t": "Every Sunday I turn off my laptop and phone from morning until evening."
              },
              {
                "s": "f",
                "who": "D",
                "t": "I read, garden, or visit friends, and Monday morning feels far less stressful."
              }
            ]
          }
        ]
      },
      {
        "type": "conv",
        "title": "Part 3 · Câu 15",
        "instr": "Nghe hai người thảo luận về việc công ty áp dụng tuần làm việc 4 ngày. Ai bày tỏ ý kiến sau: người đàn ông (Man), người phụ nữ (Woman) hay cả hai (Both)?",
        "topic": "Should companies adopt a four-day working week?",
        "script": [
          {
            "s": "f",
            "t": "In the trials I read about, staff cut unnecessary meetings and finished the same workload in four days."
          },
          {
            "s": "m",
            "t": "That works well for office teams, but in customer support or hospitals someone still has to cover five or seven days."
          },
          {
            "s": "f",
            "t": "You can rotate which day people take off so the service stays open all week."
          },
          {
            "s": "m",
            "t": "Rotating schedules could work, though managers would need careful planning so deadlines don't slip."
          },
          {
            "s": "f",
            "t": "True, it fails if companies just cram five days of stress into four ten-hour shifts."
          },
          {
            "s": "m",
            "t": "Exactly. The point is working smarter, not exhausting people by Thursday night."
          },
          {
            "s": "f",
            "t": "If they keep pay the same and measure real output, staff retention would definitely rise."
          }
        ],
        "statements": [
          {
            "q": "Reducing pointless meetings helps teams finish work in four days.",
            "a": "Woman",
            "e": "Người phụ nữ: 'staff cut unnecessary meetings and finished the same workload in four days'."
          },
          {
            "q": "Customer-facing roles are harder to fit into a four-day model.",
            "a": "Man",
            "e": "Người đàn ông: 'in customer support or hospitals someone still has to cover five or seven days'."
          },
          {
            "q": "Compressing all hours into four exhausting days defeats the purpose.",
            "a": "Both",
            "e": "Người phụ nữ: 'it fails if companies just cram five days of stress into four ten-hour shifts'; người đàn ông: 'Exactly. The point is working smarter, not exhausting people'."
          },
          {
            "q": "Keeping salaries unchanged would help companies keep staff.",
            "a": "Woman",
            "e": "Người phụ nữ: 'If they keep pay the same... staff retention would definitely rise'."
          }
        ]
      },
      {
        "type": "mono",
        "title": "Part 4 · Câu 16–17",
        "instr": "Nghe bài nói và trả lời 2 câu hỏi cho mỗi bài.",
        "talks": [
          {
            "topic": "Designing quiet zones in open offices",
            "script": [
              {
                "s": "m",
                "t": "Open-plan offices were meant to spark spontaneous conversation, yet surveys show noise is employees' number-one complaint."
              },
              {
                "s": "m",
                "t": "When half the team is on video calls at their desks, nobody else can concentrate on writing or analysis."
              },
              {
                "s": "m",
                "t": "Instead of rebuilding walls everywhere, our workplace redesign split the floor into three clear zones."
              },
              {
                "s": "m",
                "t": "Small soundproof booths handle video calls, a central cafe area hosts informal chats, and the north wing is strictly silent."
              },
              {
                "s": "m",
                "t": "Within two months, voluntary office attendance increased because people finally had spaces matched to their tasks."
              }
            ],
            "questions": [
              {
                "q": "What is the main complaint about open-plan offices mentioned by the speaker?",
                "o": [
                  "Lack of natural light",
                  "Background noise from colleagues",
                  "Not enough meeting chairs"
                ],
                "a": 1,
                "e": "'surveys show noise is employees' number-one complaint' → tiếng ồn từ đồng nghiệp."
              },
              {
                "q": "How did the redesign handle video calls?",
                "o": [
                  "Banned them from the office",
                  "Built small soundproof booths",
                  "Moved them to the north wing"
                ],
                "a": 1,
                "e": "'Small soundproof booths handle video calls' → bố trí các buồng cách âm nhỏ cho cuộc gọi video."
              }
            ]
          },
          {
            "topic": "Digital archiving for small museums",
            "script": [
              {
                "s": "f",
                "t": "Local museums often hold thousands of fragile photographs and letters that rarely fit into display cabinets."
              },
              {
                "s": "f",
                "t": "Scanning these collections used to require expensive specialist gear that small towns could not afford."
              },
              {
                "s": "f",
                "t": "A regional library grant now lends portable scanning kits and trains volunteers to record dates, names, and locations."
              },
              {
                "s": "f",
                "t": "Accurate labels matter just as much as sharp images; without context, a scanned photo is almost impossible to search."
              },
              {
                "s": "f",
                "t": "Once uploaded, schools and distant relatives can explore local history from anywhere without handling delicate originals."
              }
            ],
            "questions": [
              {
                "q": "How can small museums now afford to scan their collections?",
                "o": [
                  "By charging visitors an extra fee",
                  "By borrowing portable kits through a regional grant",
                  "By selling duplicate photographs"
                ],
                "a": 1,
                "e": "'A regional library grant now lends portable scanning kits' → mượn bộ máy quét di động từ quỹ thư viện khu vực."
              },
              {
                "q": "Why does the speaker emphasise accurate labels?",
                "o": [
                  "They make images searchable and meaningful",
                  "They reduce file size",
                  "They are required for printing"
                ],
                "a": 0,
                "e": "'without context, a scanned photo is almost impossible to search' → giúp tìm kiếm và hiểu ngữ cảnh ảnh."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "l31",
    "title": "Đề 28 — Architecture, heritage and museums",
    "parts": [
      {
        "type": "mcq",
        "title": "Part 1 · Câu 1–13",
        "instr": "Nghe từng đoạn ngắn (tối đa 2 lần) và chọn đáp án đúng.",
        "items": [
          {
            "q": "Where can visitors pick up an audio guide?",
            "o": [
              "At the east entrance",
              "In the gift shop",
              "Beside the cloakroom"
            ],
            "a": 2,
            "e": "'Audio guides are handed out at the desk beside the cloakroom' → nhận cạnh phòng gửi đồ.",
            "script": [
              {
                "s": "f",
                "t": "Welcome to the City Museum. Tickets are checked at the east entrance."
              },
              {
                "s": "f",
                "t": "Audio guides are handed out free of charge at the desk beside the cloakroom.",
                "hl": 1
              }
            ]
          },
          {
            "q": "What time does the evening gallery tour begin?",
            "o": [
              "17:45",
              "18:15",
              "19:00"
            ],
            "a": 1,
            "e": "'the curator's tour starts promptly at 6:15 p.m.' → bắt đầu lúc 18:15.",
            "script": [
              {
                "s": "m",
                "t": "The gallery stays open late on Fridays until nine."
              },
              {
                "s": "m",
                "t": "Please gather by the marble staircase at 5:45; the curator's tour starts promptly at 6:15 p.m.",
                "hl": 1
              }
            ]
          },
          {
            "q": "Why is the castle tower closed today?",
            "o": [
              "Strong winds",
              "Roof painting",
              "A private wedding"
            ],
            "a": 0,
            "e": "'due to high winds at the top, access to the tower is suspended' → đóng do gió mạnh.",
            "script": [
              {
                "s": "f",
                "t": "The courtyard and great hall are open as usual."
              },
              {
                "s": "f",
                "t": "However, due to high winds at the top, access to the tower is suspended for the rest of the day.",
                "hl": 1
              }
            ]
          },
          {
            "q": "How much does a combined ticket for the house and gardens cost?",
            "o": [
              "£14",
              "£16",
              "£20"
            ],
            "a": 1,
            "e": "'the combined ticket is £16, saving you £4' → vé kết hợp giá £16.",
            "script": [
              {
                "s": "m",
                "t": "Entry to the house alone is £14, or £20 if you buy the house and gardens separately."
              },
              {
                "s": "m",
                "t": "The combined ticket is £16, saving you £4.",
                "hl": 1
              }
            ]
          },
          {
            "q": "What are visitors NOT allowed to use inside the textile room?",
            "o": [
              "Notebooks",
              "Camera flash",
              "Backpacks"
            ],
            "a": 1,
            "e": "'please switch off your camera flash, as bright light fades the old fabrics' → không dùng đèn flash.",
            "script": [
              {
                "s": "f",
                "t": "You are welcome to take photographs for personal use in this gallery."
              },
              {
                "s": "f",
                "t": "Just please switch off your camera flash, as bright light fades the old fabrics.",
                "hl": 1
              }
            ]
          },
          {
            "q": "Which floor is the museum cafe on?",
            "o": [
              "Ground floor",
              "Second floor",
              "Roof terrace"
            ],
            "a": 1,
            "e": "'the main cafe is up on the second floor overlooking the square' → nằm ở tầng 2.",
            "script": [
              {
                "s": "m",
                "t": "The roof terrace is closed for winter, and there's only a vending machine on the ground floor."
              },
              {
                "s": "m",
                "t": "The main cafe is up on the second floor overlooking the square.",
                "hl": 1
              }
            ]
          },
          {
            "q": "What did Owen enjoy most about the architecture walk?",
            "o": [
              "The hidden courtyards",
              "The cathedral spire",
              "The modern glass bridge"
            ],
            "a": 0,
            "e": "'the quiet hidden courtyards behind the main street were the real highlight' → thích nhất những khoảng sân kín yên tĩnh.",
            "script": [
              {
                "s": "f",
                "t": "Was the cathedral spire as impressive as you expected?"
              },
              {
                "s": "m",
                "t": "It was nice, though the quiet hidden courtyards behind the main street were the real highlight for me.",
                "hl": 1
              }
            ]
          },
          {
            "q": "How often does the heritage steam train run on Sundays?",
            "o": [
              "Every hour",
              "Every ninety minutes",
              "Twice a day"
            ],
            "a": 1,
            "e": "'departures run every ninety minutes from ten in the morning' → chạy cách nhau 90 phút.",
            "script": [
              {
                "s": "f",
                "t": "On weekdays we run only twice a day, but on Sundays departures run every ninety minutes from ten in the morning.",
                "hl": 1
              },
              {
                "s": "f",
                "t": "You can buy tickets on the platform."
              }
            ]
          },
          {
            "q": "Why did the restoration team keep the old brick floor?",
            "o": [
              "Replacing it was too expensive",
              "It shows the building's industrial past",
              "It is easier to heat"
            ],
            "a": 1,
            "e": "'we kept the worn brick floor so visitors can still feel the building's history as a printworks' → giữ dấu ấn lịch sử công nghiệp.",
            "script": [
              {
                "s": "m",
                "t": "We had the budget for new tiles, yet we kept the worn brick floor so visitors can still feel the building's history as a printworks.",
                "hl": 1
              },
              {
                "s": "m",
                "t": "We simply cleaned and sealed it."
              }
            ]
          },
          {
            "q": "What should school groups bring with them?",
            "o": [
              "Clipboards and pencils",
              "Packed lunches only",
              "A printed booking letter"
            ],
            "a": 0,
            "e": "'we ask teachers to bring clipboards and pencils for the sketching activity' → mang bìa kẹp giấy và bút chì.",
            "script": [
              {
                "s": "f",
                "t": "You don't need to print the confirmation email—we have your school on our list."
              },
              {
                "s": "f",
                "t": "However, we ask teachers to bring clipboards and pencils for the sketching activity.",
                "hl": 1
              }
            ]
          },
          {
            "q": "When will the ceramics exhibition reopen?",
            "o": [
              "Next Monday",
              "In two weeks",
              "Next month"
            ],
            "a": 1,
            "e": "'reopening in two weeks with thirty newly restored pieces' → mở cửa lại sau hai tuần.",
            "script": [
              {
                "s": "m",
                "t": "Gallery Four is currently closed while new lighting is installed."
              },
              {
                "s": "m",
                "t": "The ceramics exhibition will reopen in two weeks with thirty newly restored pieces.",
                "hl": 1
              }
            ]
          },
          {
            "q": "What discount is available to local residents?",
            "o": [
              "Free entry on Wednesdays",
              "Half-price tickets all week",
              "Free coffee at the cafe"
            ],
            "a": 0,
            "e": "'residents with a local library card enter free every Wednesday' → miễn phí vé vào thứ Tư.",
            "script": [
              {
                "s": "f",
                "t": "Standard tickets are £10, and residents with a local library card enter free every Wednesday.",
                "hl": 1
              },
              {
                "s": "f",
                "t": "Just show your card at the ticket counter."
              }
            ]
          },
          {
            "q": "Where is the coach drop-off point for the palace?",
            "o": [
              "Outside the main gate",
              "At the south car park",
              "Beside the river pier"
            ],
            "a": 1,
            "e": "'all tour coaches must drop passengers at the south car park' → trả khách tại bãi đỗ xe phía nam.",
            "script": [
              {
                "s": "m",
                "t": "Vehicles are no longer permitted outside the main gate."
              },
              {
                "s": "m",
                "t": "All tour coaches must drop passengers at the south car park, a five-minute walk from the ticket office.",
                "hl": 1
              }
            ]
          }
        ]
      },
      {
        "type": "speakers",
        "title": "Part 2 · Câu 14",
        "instr": "Nghe 4 người (A, B, C, D) nói về lý do họ thích tham quan các công trình lịch sử. Ghép mỗi người với mô tả đúng (có 2 lựa chọn thừa).",
        "topic": "Why people visit historic buildings",
        "options": [
          "Draws architectural details in a sketchbook",
          "Enjoys listening to personal stories from volunteer guides",
          "Takes children to hands-on family workshops",
          "Likes exploring peaceful historic gardens",
          "Researches local family history in the archives",
          "Collects guidebooks from every site"
        ],
        "speakers": [
          {
            "a": 0,
            "e": "Người A: 'I bring a small sketchbook and spend half an hour drawing doorways or stone carvings' → vẽ phác họa chi tiết kiến trúc.",
            "script": [
              {
                "s": "f",
                "who": "A",
                "t": "Whenever I visit an old house or abbey, I bring a small sketchbook and spend half an hour drawing doorways or stone carvings."
              },
              {
                "s": "f",
                "who": "A",
                "t": "Slowing down to sketch makes me notice patterns I would otherwise walk right past."
              }
            ]
          },
          {
            "a": 1,
            "e": "Người B: 'the volunteer guides always share little anecdotes about the servants and builders' → thích nghe câu chuyện từ hướng dẫn viên tình nguyện.",
            "script": [
              {
                "s": "m",
                "who": "B",
                "t": "I rarely read long information boards, but I love chatting with the volunteer guides."
              },
              {
                "s": "m",
                "who": "B",
                "t": "They always share little anecdotes about the servants and builders that bring the rooms to life."
              }
            ]
          },
          {
            "a": 3,
            "e": "Người C: 'I go mainly for the walled gardens and old orchards' → thích dạo chơi trong khu vườn lịch sử yên tĩnh.",
            "script": [
              {
                "s": "f",
                "who": "C",
                "t": "Honestly, I go mainly for the walled gardens and old orchards rather than the furniture inside."
              },
              {
                "s": "f",
                "who": "C",
                "t": "Sitting under a two-hundred-year-old oak tree is the calmest way to spend a Saturday."
              }
            ]
          },
          {
            "a": 2,
            "e": "Người D: 'my twins love the weekend craft sessions where they try pottery or weaving' → đưa con đi trải nghiệm hoạt động thực hành.",
            "script": [
              {
                "s": "m",
                "who": "D",
                "t": "Traditional museums used to bore my twins, but they love the weekend craft sessions where they try pottery or weaving."
              },
              {
                "s": "m",
                "who": "D",
                "t": "They learn far more by making something than by staring behind a rope."
              }
            ]
          }
        ]
      },
      {
        "type": "conv",
        "title": "Part 3 · Câu 15",
        "instr": "Nghe hai người thảo luận về việc cải tạo nhà máy cũ thành căn hộ chung cư. Ai bày tỏ ý kiến sau: người đàn ông (Man), người phụ nữ (Woman) hay cả hai (Both)?",
        "topic": "Should historic factories be converted into apartments?",
        "script": [
          {
            "s": "m",
            "t": "Turning empty brick mills into apartments saves landmarks from crumbling and adds housing right near the centre."
          },
          {
            "s": "f",
            "t": "I'd much rather see them reused than knocked down, especially since tearing down sturdy buildings wastes enormous amounts of carbon."
          },
          {
            "s": "m",
            "t": "Yes, keeping the original structure is far greener than starting from scratch."
          },
          {
            "s": "f",
            "t": "My frustration is that developers almost always turn them into luxury flats that local residents can't afford."
          },
          {
            "s": "m",
            "t": "That happens because insulating old walls and tall windows costs a fortune."
          },
          {
            "s": "f",
            "t": "Then councils should require a mix of affordable flats and maybe a ground-floor workshop or cafe open to everyone."
          },
          {
            "s": "m",
            "t": "Keeping the ground floor open to the public is a great idea—it lets the whole neighbourhood enjoy the building."
          }
        ],
        "statements": [
          {
            "q": "Reusing existing structures is better for the environment than demolition.",
            "a": "Both",
            "e": "Người phụ nữ: 'tearing down sturdy buildings wastes enormous amounts of carbon'; người đàn ông: 'Yes, keeping the original structure is far greener'."
          },
          {
            "q": "Converted factories are often priced out of reach for local people.",
            "a": "Woman",
            "e": "Người phụ nữ: 'developers almost always turn them into luxury flats that local residents can't afford'."
          },
          {
            "q": "Upgrading insulation in old buildings is very expensive.",
            "a": "Man",
            "e": "Người đàn ông: 'insulating old walls and tall windows costs a fortune'."
          },
          {
            "q": "Ground-floor spaces should remain accessible to the community.",
            "a": "Both",
            "e": "Người phụ nữ: 'a ground-floor workshop or cafe open to everyone'; người đàn ông: 'Keeping the ground floor open to the public is a great idea'."
          }
        ]
      },
      {
        "type": "mono",
        "title": "Part 4 · Câu 16–17",
        "instr": "Nghe bài nói và trả lời 2 câu hỏi cho mỗi bài.",
        "talks": [
          {
            "topic": "Natural lighting in modern libraries",
            "script": [
              {
                "s": "f",
                "t": "When architects design a public library today, daylight is one of their hardest balancing acts."
              },
              {
                "s": "f",
                "t": "Readers feel more alert and comfortable near sunlit windows, yet direct sunlight can overheat rooms and damage paper books."
              },
              {
                "s": "f",
                "t": "In our new central library, angled roof skylights bounce soft northern light onto the reading tables without letting harsh beams hit the shelves."
              },
              {
                "s": "f",
                "t": "Automated blinds also adjust throughout the afternoon to cut glare on computer screens."
              },
              {
                "s": "f",
                "t": "As a result, electricity use for lighting has fallen by forty percent compared with the old building."
              }
            ],
            "questions": [
              {
                "q": "Why is direct sunlight a problem in libraries?",
                "o": [
                  "It makes rooms too hot and harms books",
                  "It fades painted walls quickly",
                  "It prevents automated blinds from working"
                ],
                "a": 0,
                "e": "'direct sunlight can overheat rooms and damage paper books' → làm phòng nóng và hỏng sách giấy."
              },
              {
                "q": "What benefit did the new lighting design achieve?",
                "o": [
                  "Doubled the number of reading desks",
                  "Cut lighting electricity use by forty percent",
                  "Eliminated the need for roof repairs"
                ],
                "a": 1,
                "e": "'electricity use for lighting has fallen by forty percent' → giảm 40% điện chiếu sáng."
              }
            ]
          },
          {
            "topic": "Preserving wooden bridges in mountain villages",
            "script": [
              {
                "s": "m",
                "t": "Across our mountain valley, seven covered timber bridges still stand after more than a century of heavy snow."
              },
              {
                "s": "m",
                "t": "The wooden roofs were never just decorative; they protected the main beams from rain so the structure would not rot."
              },
              {
                "s": "m",
                "t": "When one bridge needed repairs last winter, engineers discovered that modern steel bolts actually split the dry oak."
              },
              {
                "s": "m",
                "t": "Instead, retired carpenters were invited to train apprentices in carving traditional wooden pegs that expand and contract with the timber."
              },
              {
                "s": "m",
                "t": "The repair took slightly longer, yet it saved both the bridge and a craft that was nearly lost."
              }
            ],
            "questions": [
              {
                "q": "What was the original purpose of the roofs on the wooden bridges?",
                "o": [
                  "To shelter travellers from snow",
                  "To keep rain off the structural beams",
                  "To support heavier vehicles"
                ],
                "a": 1,
                "e": "'protected the main beams from rain so the structure would not rot' → che mưa bảo vệ dầm gỗ khỏi mục."
              },
              {
                "q": "Why did the repair team use wooden pegs instead of steel bolts?",
                "o": [
                  "Steel bolts were out of stock",
                  "Steel bolts damaged the dry oak",
                  "Wooden pegs were much faster to install"
                ],
                "a": 1,
                "e": "'modern steel bolts actually split the dry oak' → bu-lông thép làm nứt gỗ sồi khô."
              }
            ]
          }
        ]
      }
    ]
  },
];
