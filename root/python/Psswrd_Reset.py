#pip install python-dotenv

import smtplib
import os
from dotenv import dotenv_values
config = dotenv_values(".env")

from email.message import EmailMessage

def main(reciever:str,newPassword:str,username:str):
    print(os.getcwd())
    with open(os.getcwd()+"\python\email-content.txt") as fp:
        # Create a text/plain message
        msg = EmailMessage()
        msg.set_content(f"""
        Hallo {username}!
        Du hast angefragt, dein Passwort zu ändern. 

        Deswegen haben wir dir folgendes Kennwort vergeben:
        {newPassword}
        
        Mit Freundlichen Grüßen, 
        Das CypherNexus Team
         """)
    print("Loaded Content")
    msg['Subject'] = 'CypherNexus Passwort Rest'
    msg['From'] = "CypherNexus@saicode.de"
    msg['To'] = reciever

    # Send the message via our own SMTP server.
    with smtplib.SMTP_SSL(config["EMAIL_ADDR"]) as server:
      print("server set up")
      server.ehlo()
      print("Logging In")
      server.login(config["EMAIL_ADDR"], config["EMAIL_PSSWD"])
      print("Sending Mail")
      server.sendmail(msg['From'], reciever, msg)
      server.quit()
      print("Mail successfully sent")

if __name__ == "__main__":
    main("mail@saicode.de","Password1234","Developer")