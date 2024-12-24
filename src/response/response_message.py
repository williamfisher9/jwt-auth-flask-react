from ..models.user import User

class ResponseMessage():
    def __init__(self, response, status):
        self.response = response
        self.status = status

    def create_response(self):
        if isinstance(self.response, User):
            return {
                "response": self.response.to_dict(),
                "status": self.status
            }

        if isinstance(self.response, str):
            return {
                "response": self.response,
                "status": self.status
            }

        if isinstance(self.response, list):
            return {
                "response": [item.to_dict() for item in self.response],
                "status": self.status
            }