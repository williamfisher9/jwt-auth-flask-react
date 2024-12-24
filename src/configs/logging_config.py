import logging
from datetime import date


def initialize_logger():
    logging.basicConfig(format='%(asctime)s %(levelname)s %(name)s: %(message)s',
                        datefmt='%m/%d/%Y %I:%M:%S %p',
                        filename=f'logs\\logs_{date.today().strftime('%m_%d_%Y')}.log',
                        encoding='utf-8',
                        level=logging.DEBUG
                        )