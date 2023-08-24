data={
    "title": "hel454lo2",
    "content": "tes45t"

}
import requests
data=requests.put("http://127.0.0.1:5000/note/api/2",data=data)
print(data)