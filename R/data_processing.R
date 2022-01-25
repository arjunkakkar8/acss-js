library(tidyverse)

test <- acss_data %>% head(100)
acss_data_truncated <- acss_data[nchar(rownames(acss_data)) < 8, ]

rda_to_json <- function(data, name="acss_data") {
  data %>% apply(1, function(row, i) {
    paste0('["', paste(sprintf('%.2f', row), collapse='","'), '"]')
  }) %>%
    Map(paste, paste0('"', names(.), '"'), ., sep=":") %>% 
    paste(collapse = ',') %>% 
    paste0('{', ., '}') %>% 
    write(file = paste0(name, ".json"))
}


rda_to_json(test, "test")
rda_to_json(acss_data_truncated, "acss_data_truncated")
rda_to_json(acss_data, "acss_data")
