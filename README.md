# BoardGameTimer_App
This is the companion app (iOS) built in React Native for my Arduino Board Game Timer

This board game timer tracks the length of each player's turn. 
As the timer is passed between the players it chnages colors to reflect the current player's turn.

To use the app, select the players and then get ready to start. The timer will receive the play order and begin to flash the
starting player's color. As soon as that player turns the timer over the game will begin. Once they have completed their turn
they simply pass the timer to the next player. The timer will change colors and start timing that player. If needed, the timer
can be paused by simply turning it over. It will begin flashing. To resume, simply flip the timer back over.

As each turn is completed the timer will transmit the all the counts to the phone. This prevents data loss in the event that the
timer or phone loses connection. It uses a BLE connection to preserve battery life.

At the end of the game the times are accumlated.

The timer is housed in a mason jar that has frosted glass to difuse the light. The mounting for the electronics was designed and
3D printed with PLA and takes the place of the lid. There is an on/off switch and photocell embedded in the lid. The Arduino is
actually an ATiny84. Total cost for the project was under $12 (usd).

> Arduino Repo: https://github.com/postazure/BoardGameTimer
