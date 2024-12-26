import logging
from datetime import date
import json

def initialize_logger():
    with open('configs//app-configs.json', 'r') as props_file:
        logging.basicConfig(format='%(asctime)s %(levelname)s %(name)s: %(message)s',
                            datefmt='%m/%d/%Y %I:%M:%S %p',
                            filename=f'{json.load(props_file)["LOGS_DIRECTORY"]}\\logs_{date.today().strftime('%m_%d_%Y')}.log',
                            encoding='utf-8',
                            level=logging.DEBUG
                            )

