{-# LANGUAGE OverloadedStrings #-}

import Network.Wai
import Network.HTTP.Types (status200)
import Network.Wai.Handler.Warp (run)
import Data.UUID.V4 (nextRandom)
import Data.UUID (toString)
import Data.Text (Text)
import qualified Data.Text.Encoding as TSE
import qualified Data.ByteString.Lazy.Char8 as BSL

main :: IO ()
main = do
    putStrLn "Starting Haskell HTTP server on port 3000..."
    run 3000 app

app :: Application
app _ respond = do
    uuid <- nextRandom
    let uuidString = toString uuid
        uuidText = TSE.decodeUtf8 $ BSL.toStrict $ BSL.pack uuidString
        response = responseLBS status200 [("Content-Type", "text/plain")] (BSL.fromStrict $ TSE.encodeUtf8 uuidText)
    respond response
