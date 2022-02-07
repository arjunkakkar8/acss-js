setwd("~/../Desktop/web/acss-js/data")

library(tidyverse)
library(pbapply)

test <- acss_data %>% head(100)
acss_data_truncated <- acss_data[nchar(rownames(acss_data)) < 9, ]

rda_to_json <- function(data, name="acss_data") {
  data %>% pbapply(1, function(row) {
    paste0('"score":["', paste(sprintf('%.2f', row), collapse='","'), '"]}')
  }) %>%
    Map(paste, paste0('{"id":"', names(.), '"'), ., sep=",") %>% 
    paste(collapse = ',') %>% 
    paste0('[', ., ']') %>%
    write(file = paste0(name, ".json"))
}


rda_to_json(test, "test")
rda_to_json(acss_data_truncated, "acss_data_truncated")

# The full file conversion does not work due to limitations
# of writing strings in R. Instead, we convert the rda file to
# csv and use a python script to convert from csv to json.
# rda_to_json(acss_data, "acss_data")

write.csv(acss_data, "acss_data.csv")


