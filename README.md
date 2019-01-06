# fund$
#### It's not a bug, it's a feature:
1. This react app has no backend but fully capable API design to connect a backend. To emulate that, it uses browser local storage.
2. To handle login avoiding a backend, it uses social media based login. Please allow access and await it's initiation.
3. In Loans table, populated with dummy data yet persistent data, when repay is clicked, it prompts for Transcation Id (bank transfer id). Due to the lack of a backend, it's randomly decided if the entered TxId should be considered valid so that both success and failure cases can be tested. 
