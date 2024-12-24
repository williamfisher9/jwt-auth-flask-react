class ResponseMessage():
    def __init__(self, response, status):
        self.response = response
        self.status = status

    def to_dict(self):
        return {
            "response": "",
            "status": ""
        }