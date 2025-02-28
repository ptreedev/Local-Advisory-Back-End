import { app } from "./index";
import { PORT } from "./configs";

const port = PORT || 8080;

app.listen(port, () => {
  console.log(`Server is listeing on ${port}`);
});
